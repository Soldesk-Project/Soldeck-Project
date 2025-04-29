package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.CommentVO;

public interface CommentService {
	
	// 코멘트 조회
	public List<CommentVO> getCommentsByRestNo(int rest_no);
		
	// 코멘트 추가
    public int addComment(CommentVO vo);
    
    // 코멘트 삭제
    public int deleteComment(int com_no, int mem_no);
    
    // 코멘트 평균 평점 
    public double getAvgRate(int rest_no);
    
    // 내 댓글 조회
    public List<CommentVO> getCommentList(int mem_no);
}
