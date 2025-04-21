package org.joonzis.mapper;

import java.util.List;

import org.joonzis.domain.CommentVO;

public interface CommentMapper {
	
	// 코멘트 조회
	public List<CommentVO> getCommentsByRestNo(int rest_no);
	
	// 코멘트 추가
    public int addComment(CommentVO vo);
}
