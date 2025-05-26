package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.Criteria;
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
	
	@Override
	public List<MemberVO> getAllMemberWithPaging(Criteria cri) {
		return mapper.getAllMemberWithPaging(cri);
	}

	@Override
	public int getTotalMemberRecordCount() {
		return mapper.getTotalMemberRecordCount();
	}

	@Override
	public List<GroupVO> getAllGroupWithPaging(Criteria cri) {
		return mapper.getAllGroupWithPaging(cri);
	}

	@Override
	public int getTotalGroupRecordCount() {
		return mapper.getTotalGroupRecordCount();
	}

	@Override
	public List<RestVO> getRestWithPaging(Criteria cri) {
		return mapper.getRestWithPaging(cri);
	}

	@Override
	public int getTotalRestRecordCount(Criteria cri) {
		return mapper.getTotalRestRecordCount(cri);
	}
	
	
}
