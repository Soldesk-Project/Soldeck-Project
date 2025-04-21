package org.joonzis.service;

public interface MemberService {

    void signUpProcess(String mem_name, String mem_birth, String mem_id, String mem_pw, String mem_nick, Integer[] food_no);
    
    String findId(String mem_name, String mem_birth);
    
    String findPw(String mem_id, String mem_birth);
}