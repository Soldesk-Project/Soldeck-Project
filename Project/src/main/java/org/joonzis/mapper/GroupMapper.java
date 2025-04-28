package org.joonzis.mapper;

import java.util.List;

import org.joonzis.domain.ChatRoomVO;
import org.joonzis.domain.GroupMemberDTO;
import org.joonzis.domain.GroupVO;

public interface GroupMapper {
	
	// 그룹 생성
	public int createGroup(GroupVO vo);
	
	// 채팅방 생성
	public int createChatRoom(ChatRoomVO vo);
	
	// 그룹 정보 가져오기
	public List<GroupMemberDTO> getAllGroups(int mem_no);
}
