package org.joonzis.mapper;

import java.util.List;

import org.joonzis.domain.GroupVO;
import org.joonzis.domain.MemberVO;
import org.joonzis.domain.RestVO;

public interface AdminMapper {
	
	// 모든 회원 정보 가져오기
	public List<MemberVO> getAllMember();
	
	// 모든 그룹 정보 가져오기
	public List<GroupVO> getAllGroup();
	
	// 모든 가게 정보 가져옥이
	public List<RestVO> getAllRestaurant();
}	

