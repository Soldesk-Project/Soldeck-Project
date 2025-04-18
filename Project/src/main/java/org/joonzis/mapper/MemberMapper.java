package org.joonzis.mapper;

public interface MemberMapper {

	void insertMember(String mem_name, String mem_birth, String mem_id, String mem_pw, String mem_nickname,
			String mem_email, String mem_phone);

	Integer selectMemNoById(String mem_id);

	void insertMemberKate(Integer mem_no, Integer food);

}
