package org.joonzis.service;


import java.util.List;

import org.joonzis.domain.MemberVO;
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
    public void signUpProcess(MemberVO member, Integer[] food_no) {
        // 회원 기본 정보 저장 (MemberVO 객체 사용)
        mapper.insertMember(member); // Mapper 메서드도 MemberVO를 받도록 수정해야 함

        // 관심분야 저장 (회원 ID를 먼저 조회해야 함)
        Integer mem_no = mapper.selectMemNoById(member.getMem_id());
        if (mem_no != null && food_no != null && food_no.length > 0) {
            for (Integer food : food_no) {
                mapper.insertFoodKate(mem_no, food); // 테이블 이름 변경 확인
            }
        }
    }

	@Override
	public List<String> findId(String mem_name, String mem_birth, String mem_phone) {
        return mapper.findIdByNameBirthContact(mem_name, mem_birth, mem_phone);
	}

	@Override
	public String findPw(String mem_id, String mem_birth) {
		return mapper.findPwByIdBirth(mem_id, mem_birth);
	}
    
	
	@Override
	public boolean isIdAvailable(String mem_id) {
		return mapper.countById(mem_id) == 0;
	}

	
	
	//mypage
	@Override
	public MemberVO getMemberInfo(int mem_no) {
		return mapper.getMemberInfo(mem_no);
	}
	@Override
	public int[] getFoodKateInfo(int mem_no) {
		return mapper.getFoodKateInfo(mem_no);
	}
	@Override
	public boolean modify(MemberVO vo) {
		return mapper.modify(vo);
	}
	@Override
	public int deleteFoodKate(int mem_no) {
		return mapper.deleteFoodKate(mem_no);
	}
	@Override
	public void insertFoodKate(int mem_no, int food_no) {
		mapper.insertFoodKate(mem_no, food_no);
	}
	@Override
	public MemberVO loginProcess(String mem_id, String mem_pw) {
		MemberVO member = mapper.loginProcess(mem_id);

		if (member != null && member.getMem_pw().equals(mem_pw)) {
			return member;
		}

		return null;
	}
	
	
}
