package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.CommentVO;
import org.joonzis.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	private CommentMapper mapper;
	
	// 코멘트 조회
	@Override
	public List<CommentVO> getCommentsByRestNo(int rest_no) {
		log.info("getCommentsByRestNo... " + rest_no);
		return mapper.getCommentsByRestNo(rest_no);
	}
	
	// 코멘트 추가
	@Override
	public int addComment(CommentVO vo) {
		log.info("addComment... " + vo);
		return mapper.addComment(vo);
	}
}
