package org.joonzis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.joonzis.domain.BookMarkVO;
import org.joonzis.domain.MemberVO;

public interface MemberMapper {

	void insertMember(MemberVO member);

    Integer selectMemNoById(@Param("mem_id") String mem_id);

    void insertFoodKate(@Param("mem_no") Integer mem_no, @Param("food_no") Integer food);

    
    String findIdByNameBirth(
            @Param("mem_name") String mem_name,
            @Param("mem_birth") String mem_birth
    );

	String findPwByIdBirth(
			@Param("mem_id") String mem_id,
			@Param("mem_birth") String mem_birth
		);
	
	int countById(String mem_id);
	
	public MemberVO getMemberInfo(@Param("mem_no") int mem_no);
	public int[] getFoodKateInfo(@Param("mem_no") int mem_no);
	public boolean modify(MemberVO vo);
	public int deleteFoodKate(@Param("mem_no") int mem_no);
	public List<BookMarkVO> getBookMark(@Param("mem_no") int mem_no);
	public List<Integer> getBookMarkRestNo(@Param("mem_no") int mem_no);
	
	MemberVO loginProcess(@Param("mem_id") String mem_id);
}