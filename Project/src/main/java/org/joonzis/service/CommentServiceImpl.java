package org.joonzis.service;

import java.util.List;

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
	
	@Autowired
	private CommentMapper mapper;
	
	@Autowired
	private AttachMapper attachMapper;
	
	// 코멘트 조회
	@Override
	public List<CommentVO> getCommentsByRestNo(int rest_no) {
		log.info("getCommentsByRestNo... " + rest_no);
		return mapper.getCommentsByRestNo(rest_no);
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
//	@Transactional
//	@Override
//	public int addComment(CommentVO vo) {
//		log.info("addComment... " + vo);
//		int addCount = mapper.addComment(vo);
//		int currentCom_no = vo.getCom_no();
//		if(vo.getCom_attachList() != null && vo.getCom_attachList().size() > 0) {
//			vo.getCom_attachList().forEach(attach -> {
//				attach.setCom_no(currentCom_no);
//				attachMapper.insert(attach);
//			});
//		}
//		return addCount;
//	}
}
