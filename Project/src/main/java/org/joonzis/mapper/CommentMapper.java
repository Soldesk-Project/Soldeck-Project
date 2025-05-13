package org.joonzis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.joonzis.domain.CommentDTO;
import org.joonzis.domain.CommentVO;
import org.joonzis.domain.RestVO;

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
    
    public List<CommentDTO> getCommentList(@Param("mem_no") int mem_no); 
    
    // 코멘트 연령별 평균 평점
    public List<CommentVO> getAgeAvgRate(int rest_no);
    
    // 가게별 평점 평균
    public List<RestVO> getRestAvgRate();
    
    // 가게별 리뷰카운트 상위
    public List<RestVO> getRestReviewCount();
}
