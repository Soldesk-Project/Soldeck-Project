package org.joonzis.service;


import org.joonzis.domain.MemberVO;

public interface MemberService {

    void signUpProcess(MemberVO member, Integer[] food_no);
    
    String findId(String mem_name, String mem_birth);
    
    String findPw(String mem_id, String mem_birth);
    
    boolean isIdAvailable(String mem_id);

    
    //mypage
    public MemberVO getMemberInfo(int mem_no);
    public int[] getFoodKateInfo(int mem_no);
    public boolean modify(MemberVO vo);
    public int deleteFoodKate(int mem_no);
    public void insertFoodKate(int mem_no, int food_no);
	MemberVO loginProcess(String mem_id, String mem_pw);
}