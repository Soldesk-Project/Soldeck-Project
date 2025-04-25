package org.joonzis.mapper;

import java.util.List;

import org.joonzis.domain.CommentVO;

public interface CommentMapper {
	
	// 코멘트 조회
	public List<CommentVO> getCommentsByRestNo(int rest_no);
	
	// 코멘트 추가
    public int addComment(CommentVO vo);
    
    // 코멘트 삭제
    public int deleteComment(int com_no);
    
    // 코멘트 조회(권한 확인)
    public CommentVO getCommentById(int com_no);
    
    // 코멘트  평균 평점
    public double getAvgRate(int rest_no);
    
    
}
