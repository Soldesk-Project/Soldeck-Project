package org.joonzis.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.joonzis.domain.AttachVO;
import org.joonzis.domain.CommentVO;
import org.joonzis.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/comment")
public class CommentController {
	
	@Autowired
	private CommentService service;
	
	// 코멘트 목록 조회
    @GetMapping(value = "/pages/{rest_no}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CommentVO>> getComments(@PathVariable("rest_no") int rest_no) {
    	log.info("getComments..." + rest_no);
    	return new ResponseEntity<List<CommentVO>>(service.getCommentsByRestNo(rest_no), HttpStatus.OK);
    }
    
    // 코멘트 등록
    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, String>> addComment(@RequestBody CommentVO vo) {
    	log.info("addComment request received: " + vo);
    	log.info("com_attachList: " + vo.getCom_attachList()); // 디버깅 로그
    	
    	try {
    		int addCount = service.addComment(vo);
    		log.info("Reply Insert Count: " + addCount);
    		Map<String, String> response = new HashMap<>();
    		response.put("status", addCount == 1 ? "success" : "failure");
    		return new ResponseEntity<>(response, HttpStatus.OK);
    	} catch (Exception e) {
    		log.error("Error adding comment: ", e);
    		Map<String, String> response = new HashMap<>();
    		response.put("status", "error");
    		response.put("message", e.getMessage());
    		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
}
