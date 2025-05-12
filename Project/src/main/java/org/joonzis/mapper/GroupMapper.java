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
	
	// 그룹 가입 요청 (group_req 테이블에 삽입)
	boolean insertGroupRequset(@Param("group_no") int group_no, @Param("mem_no") int mem_no);
	
	// 그룹 생성자 회원번호 가져오기
	int getGroupOwnerMemNo(@Param("group_no") int group_no);
	
	// 그룹 요청 중복 확인 (그룹 요청이 이미 존재하는지 확인)
    int checkRequestExist(@Param("group_no") int group_no, @Param("mem_no") int mem_no);
    
    // 그룹 요청 상태 변경 (친구 요청을 수락했을 때 상태 업데이트)
    void updateRequestStatus(@Param("group_no") int group_no, @Param("mem_no") int mem_no, @Param("status") String status);
    
    // 그룹 요청 응답 후 테이블 비우기
    void deleteGroupRequest(@Param("group_no") int group_no, @Param("mem_no") int mem_no);
    
	public List<GroupVO> getGroupListByMember(int mem_no);
}
