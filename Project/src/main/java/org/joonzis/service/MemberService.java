package org.joonzis.service;

public interface MemberService {

	void signUpProcess(String mem_name, String mem_birth, String mem_id, String mem_pw, String mem_nickname,
			String mem_email, String mem_phone, Integer[] food_no);

}
