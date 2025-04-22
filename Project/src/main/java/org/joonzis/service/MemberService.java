package org.joonzis.service;

import org.joonzis.domain.MemberVO;

public interface MemberService {

    void signUpProcess(MemberVO member, Integer[] food_no);
    
    String findId(String mem_name, String mem_birth);
    
    String findPw(String mem_id, String mem_birth);
}