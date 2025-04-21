package org.joonzis.mapper;

import org.apache.ibatis.annotations.Param;

public interface MemberMapper {

    void insertMember(
        @Param("mem_name") String mem_name,
        @Param("mem_birth") String mem_birth,
        @Param("mem_id") String mem_id,
        @Param("mem_pw") String mem_pw,
        @Param("mem_nick") String mem_nick
    );

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
}