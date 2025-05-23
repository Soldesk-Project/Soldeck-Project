package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.GroupVO;
import org.joonzis.domain.MemberVO;
import org.joonzis.domain.RestVO;
import org.joonzis.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	AdminMapper mapper;

	// 모든 회원 정보 가져오기
	@Override
	public List<MemberVO> getAllMember() {
		return mapper.getAllMember();
	}
	
	// 모든 그룹 정보 가져오기
	@Override
	public List<GroupVO> getAllGroup() {
		return mapper.getAllGroup();
	}

	// 모든 가게 정보 가져오기
	@Override
	public List<RestVO> getAllRestaurant() {
		return mapper.getAllRestaurant();
	}
}
