package org.joonzis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
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
	
	
	
	public boolean updateGroupMemo(@Param("group_no") int group_no, 
								   @Param("mem_no")	int mem_no, 
								   @Param("group_usermemo") String group_usermemo);
	
	public boolean addGroupBookmark(@Param("group_no") int group_no, 
			   						@Param("mem_no") int mem_no);
	
	public boolean cancelGroupBookmark(@Param("group_no") int group_no, 
									   @Param("mem_no")	int mem_no);
	
	//유저가 속한 채팅 목록 불러오기
	List<GroupVO> getgroupList(@Param("group_no") int mem_no);
	//속한 모임 중 탈퇴하기
	void removeGroup(@Param("group_no") int group_no, @Param("mem_no") int mem_no);
	//랜덤으로 추천되는 채팅 목록 불러오기
	Integer getGroupNoByMember(int mem_no);

    List<GroupVO> getRandomGroupList(@Param("group_no") int group_no, @Param("mem_no") int mem_no);

    List<GroupVO> getRandomGroupListWithoutFilter(@Param("mem_no") int mem_no);
	
	//채팅 가입하기 버튼
	void insertGroup(@Param("group_no") int group_no, @Param("mem_no") int mem_no);
	//검색 시 채팅목록 불러오기
	List<GroupVO> searchGroupBygroupname(@Param("keyword") String keyword);
	
}
