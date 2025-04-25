package org.joonzis.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.joonzis.domain.AttachVO;
import org.joonzis.domain.CommentVO;
import org.joonzis.mapper.AttachMapper;
import org.joonzis.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class CommentServiceImpl implements CommentService {
	
	private String uploadFolderPath;
	
	@Autowired
    private ServletContext servletContext;
    
    @Autowired
    private CommentMapper mapper;
    
    @Autowired
    private AttachMapper attachMapper;
	
	@Override
	public List<CommentVO> getCommentsByRestNo(int rest_no) {
	    List<CommentVO> comments = mapper.getCommentsByRestNo(rest_no);
	    for (CommentVO comment : comments) {
	        if (comment.getCom_attachList() == null) {
	            comment.setCom_attachList(new ArrayList<>());
	        }
	    }
	    return comments;
	}
	
	// 코멘트 추가
	@Transactional
		@Override
		public int addComment(CommentVO vo) {
			log.info("addComment... " + vo);
			log.info("com_attachList: " + vo.getCom_attachList()); // 디버깅 로그
			
			int addCount = mapper.addComment(vo);
			log.info("addCount: " + addCount); // 삽입 결과 확인
			int currentCom_no = vo.getCom_no();
			log.info("currentCom_no: " + currentCom_no); // 삽입 후 com_no 확인
			
			if (vo.getCom_attachList() != null && !vo.getCom_attachList().isEmpty()) {
				log.info("Processing attachments for com_no: " + vo.getCom_no());
				vo.getCom_attachList().forEach(attach -> {
					attach.setCom_no(currentCom_no);
					log.info("Inserting attach: " + attach); // 각 attach 로그
					attachMapper.insert(attach);
				});
			} else {
				log.info("No attachments to process.");
			}
			return addCount;
		}
	
	 // 코멘트 삭제
	@Transactional
	@Override
	public int deleteComment(int com_no, int mem_no) {
	    CommentVO comment = mapper.getCommentById(com_no);
	    if (comment == null || comment.getMem_no() != mem_no) {
	        return 0; // 권한 없음
	    }
	    
	    // uploadFolderPath가 null이면 ServletContext에서 다시 로드
	    if (uploadFolderPath == null || uploadFolderPath.isEmpty()) {
	        uploadFolderPath = (String) servletContext.getAttribute("uploadFolderPath");
	    }
	    
	    // 첨부 파일 삭제
	    List<AttachVO> attachList = attachMapper.findByCom_no(com_no);
	    if (attachList != null && !attachList.isEmpty()) {
	        for (AttachVO attach : attachList) {
	            // 물리적 파일 삭제
	            String fileName = attach.getAtt_uuid() + "_" + attach.getAtt_name();
	            File file = new File(uploadFolderPath, fileName);
	            log.info("Attempting to delete physical file: " + file.getAbsolutePath());
	            if (file.exists()) {
	                if (file.delete()) {
	                    log.info("Deleted physical file: " + fileName);
	                } else {
	                    log.error("Failed to delete physical file: " + fileName + ", path: " + file.getAbsolutePath());
	                }
	            } else {
	                log.warn("Physical file not found: " + fileName + ", path: " + file.getAbsolutePath());
	            }
	            // DB에서 첨부 파일 삭제
	            attachMapper.delete(attach.getAtt_uuid());
	            log.info("Deleted attachment from DB: " + attach.getAtt_uuid());
	        }
	    }
	    
	    int result = mapper.deleteComment(com_no);
	    log.info("Comment deleted, com_no: " + com_no + ", result: " + result);
	    return result;
	}
	
	// 코멘트 평균 평점
	@Override
	public double getAvgRate(int rest_no) {
		log.info("getAvgRate... " + rest_no);
		return mapper.getAvgRate(rest_no);
	}
}
