package org.joonzis.service;

import org.joonzis.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class MemberServiceImpl implements MemberService{

	@Autowired
	private MemberMapper mapper;

    @Transactional
    @Override
    public void signUpProcess(String mem_name, String mem_birth, String mem_id, String mem_pw, String mem_nick, Integer[] food_no) {
        // 회원 기본 정보 저장 (이메일, 전화번호 제외)
        mapper.insertMember(mem_name, mem_birth, mem_id, mem_pw, mem_nick);

        // 관심분야 저장 (회원 ID를 먼저 조회해야 함)
        Integer mem_no = mapper.selectMemNoById(mem_id);
        if (mem_no != null && food_no != null && food_no.length > 0) {
            for (Integer food : food_no) {
                mapper.insertFoodKate(mem_no, food); // 테이블 이름 변경
            }
        }
    }

	@Override
	public String findId(String mem_name, String mem_birth) {
        return mapper.findIdByNameBirth(mem_name, mem_birth);
	}

	@Override
	public String findPw(String mem_id, String mem_birth) {
		return mapper.findPwByIdBirth(mem_id, mem_birth);
	}
    
    
}
