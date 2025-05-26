package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.Criteria;
import org.joonzis.domain.GroupVO;
import org.joonzis.domain.MemberVO;
import org.joonzis.domain.RestVO;

public interface AdminService {
	// 모든 회원 정보 가져오기
	public List<MemberVO> getAllMemberWithPaging(Criteria cri);
	public int getTotalMemberRecordCount();
	
	// 모든 그룹 정보 가져오기
	public List<GroupVO> getAllGroupWithPaging(Criteria cri);
	public int getTotalGroupRecordCount();
	
	// 모든 가게 정보 가져오기
	// 페이징 기능 추가
	public List<RestVO> getRestWithPaging(Criteria cri);
	public int getTotalRestRecordCount(Criteria cri);
}
