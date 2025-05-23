package org.joonzis.controller;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;

import org.joonzis.domain.AttachVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
public class UploadController {

	@Value("${file.upload-dir}")
    private String uploadFolderPath;
	
	@Autowired
    private ServletContext servletContext;

    @PostConstruct
    public void init() {
        try {
            // URL 디코딩 적용
            uploadFolderPath = URLDecoder.decode(uploadFolderPath, StandardCharsets.UTF_8.name());
            servletContext.setAttribute("uploadFolderPath", uploadFolderPath);
        } catch (Exception e) {
            log.error("Failed to decode uploadFolderPath", e);
        }
    }

    @ResponseBody
    @PostMapping(value = "/uploadAsyncAction", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<AttachVO>> uploadAsyncPost(MultipartFile[] uploadFile) {

        if (uploadFolderPath == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        List<AttachVO> list = new ArrayList<>();

        // 업로드 폴더가 존재하지 않으면 생성
        File uploadDir = new File(uploadFolderPath);
        if (!uploadDir.exists()) {
            try {
                Files.createDirectories(uploadDir.toPath());
            } catch (IOException e) {
                log.error("Failed to create upload directory", e);
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        for (MultipartFile multipartFile : uploadFile) {
            if (multipartFile.isEmpty()) {
                continue;
            }

            AttachVO attachDTO = new AttachVO();
            String uploadFileName = multipartFile.getOriginalFilename();

            // UUID를 추가하여 파일명 중복 방지
            UUID uuid = UUID.randomUUID();
            uploadFileName = uuid.toString() + "_" + uploadFileName;

            try {
                File saveFile = new File(uploadFolderPath, uploadFileName);
                multipartFile.transferTo(saveFile);

                attachDTO.setAtt_uuid(uuid.toString());
                attachDTO.setAtt_name(multipartFile.getOriginalFilename());
                attachDTO.setAtt_path("/resources/upload");

                list.add(attachDTO);
            } catch (Exception e) {
                log.error("File upload failed: " + uploadFileName, e);
            }
        }

        if (list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/deleteFile")
    @ResponseBody
    public ResponseEntity<String> deleteFile(@RequestBody String att_name) {

        try {
            if (uploadFolderPath == null) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }

            // att_name에서 /resources/upload/ 접두어 제거
            String decodedFileName = URLDecoder.decode(att_name, "UTF-8");
            String fileName = decodedFileName.replace("/resources/upload/", "");

            // 파일 경로 구성
            File file = new File(uploadFolderPath, fileName);

            if (file.exists()) {
                if (file.delete()) {
                    return new ResponseEntity<>("deleted", HttpStatus.OK);
                } else {
                    log.error("Failed to delete file: " + fileName);
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                log.warn("File not found: " + fileName);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("Delete file error", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/resources/upload/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable("filename") String filename) {
        try {
            if (uploadFolderPath == null) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (filename == null || filename.trim().isEmpty()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            Path filePath = Paths.get(uploadFolderPath, filename);
            File file = filePath.toFile();
            if (!file.exists()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(filePath));
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getName() + "\"")
                    .body(resource);
        } catch (IOException e) {
            log.error("Error serving file: " + filename, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}