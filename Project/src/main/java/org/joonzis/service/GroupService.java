package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.GroupMemberDTO;
import org.joonzis.domain.GroupVO;


public interface GroupService {
	
	// 그룹 생성
	public int createGroupAndChatRoom(GroupVO vo);
	
	// 그럽 정보 가져오기
	public List<GroupMemberDTO> getAllGroups(int mem_no);
}
