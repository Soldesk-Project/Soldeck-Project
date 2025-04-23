package org.joonzis.mapper;

import org.apache.ibatis.annotations.Param;
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
	
	public MemberVO getMemberInfo(@Param("mem_no") int mem_no);
	public int[] getFoodKateInfo(@Param("mem_no") int mem_no);

	int countById(String mem_id);
	
}