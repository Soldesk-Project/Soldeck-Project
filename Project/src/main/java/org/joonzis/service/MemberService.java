package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.MemberVO;

public interface MemberService {

    void signUpProcess(MemberVO member, Integer[] food_no);
    
    List<String> findId(String mem_name, String mem_birth, Long mem_phone);
    
    String findPw(String mem_id, String mem_birth, Long mem_phone);
    
    boolean isIdAvailable(String mem_id);

    
    //mypage
    public MemberVO getMemberInfo(int mem_no);
    public int[] getFoodKateInfo(int mem_no);
    public boolean modify(MemberVO vo);
    public int deleteFoodKate(int mem_no);
    public void insertFoodKate(int mem_no, int food_no);
	MemberVO loginProcess(String mem_id, String mem_pw);
	public boolean removeMember(int mem_no);
	public boolean insertApply(int mem_no, String product); 
	
	public List<String> getFriendFoodKate(int friend_mem_no);
	
	
}