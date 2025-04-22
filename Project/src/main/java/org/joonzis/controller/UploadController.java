package org.joonzis.controller;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.joonzis.domain.AttachVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
public class UploadController {
	
	@Autowired
    private ResourceLoader resourceLoader;
	
	@ResponseBody //비동기
	@PostMapping(value = "/uploadAsyncAction", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<List<AttachVO>> uploadAsyncPost(MultipartFile[] uploadFile) {
		log.info("upload async post ...");
		
		List<AttachVO> list = new ArrayList<AttachVO>();
		String uploadFolderPath = getUploadFolderPath();
        log.info("Upload Folder Path: " + uploadFolderPath);
		
		for(MultipartFile multipartFile : uploadFile) {
			if (multipartFile.isEmpty()) {
                log.warn("Skipping empty file");
                continue;
            }
			// 파일 정보를 담을 AttachFileDTO 객체 생성
			AttachVO attachDTO = new AttachVO();
			
			log.info("--------------------");
			log.info("Upload File Name : " + multipartFile.getOriginalFilename());
			log.info("Upload File Size : " + multipartFile.getSize());
			
			Path filePath = Paths.get(multipartFile.getOriginalFilename());
            String uploadFileName = filePath.getFileName().toString();
            
			log.info("only file name : " + uploadFileName);
			
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
				log.error(e.getMessage());
			}
		}
		if (list.isEmpty()) {
            log.warn("No valid files were uploaded");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
		return new ResponseEntity<List<AttachVO>>(list, HttpStatus.OK);
	}
	
	// 파일 삭제
		@PostMapping("/deleteFile")
		@ResponseBody
		public ResponseEntity<String> deleteFile(@RequestBody String att_name){
			log.info("deleteFile : " + att_name);
			
			File file;
			
			try {
				file = new File("/resources/upload" + URLDecoder.decode(att_name, "utf-8"));
				file.delete();
			} catch (Exception e) {
				e.printStackTrace();
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<String>("deleted", HttpStatus.OK);
		}
		
		// 업로드 폴더 경로를 가져오는 메서드
	    private String getUploadFolderPath() {
	        try {
	            Resource resource = resourceLoader.getResource("classpath:upload/");
	            File file = resource.getFile();
	            return file.getAbsolutePath();
	        } catch (IOException e) {
	            log.error("Failed to get upload folder path", e);
	            throw new RuntimeException("Cannot access upload folder", e);
	        }
	    }
}
