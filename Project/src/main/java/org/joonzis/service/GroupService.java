package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.GroupDTO;
import org.joonzis.domain.GroupMemberDTO;
import org.joonzis.domain.GroupReqVO;
import org.joonzis.domain.GroupVO;


public interface GroupService {
	
	// 그룹 생성
	public int createGroupAndChatRoom(GroupDTO dto);
	public void insertFoodKate(int group_no, int food_no);
	// 그럽 정보 가져오기
	public List<GroupMemberDTO> getAllGroups(int mem_no);
	
	public List<Integer> getGroupFoodKate(int group_no);
	

	public boolean updateGroupMemo(int mem_no, int group_no, String group_usermemo);
	
	public boolean addGroupBookmark(int group_no, int mem_no);
	
	public boolean cancelGroupBookmark(int group_no, int mem_no);
	
	//채팅 목록 불러오기
	public List<GroupVO> getGroupList(int mem_no);
	//채팅 탈퇴하기
	void removeGroup(int group_no, int mem_no);
	//랜덤추천채팅 목록 불러오기
	Integer getGroupNoByMember(int mem_no);
	
    public List<GroupDTO> getRandomGroupList(int group_no, int mem_no);
    //내가 속한 모임 필터링
    public List<GroupDTO> getRandomGroupListWithoutFilter(int mem_no);
	//채팅 가입하기
	void joinGroup(int group_no, int mem_no);
	//검색어가 포함된 채팅 목록 불러오기
	public List<GroupVO> getSimpleSearch(String keyword);
	
	// 그룹 가입 요청 (group_req 테이블에 삽입)
	boolean insertGroupRequset(int group_no, int mem_no);
	
	// 그룹 가입 요청 수락
    boolean acceptGroupRequest(int group_no, int mem_no);
    
    // 친구 요청 거절
 	public boolean declineGroupRequest(int group_no, int mem_no);
 	
 	// 오프라인 친구 요청 조회
 	List<GroupReqVO> getPendingRequest(int mem_no);
	
	int getGroupOwnerMemNo(int group_no);
	
	public List<GroupVO> getGroupListByMember(int mem_no);
	
	public String getGroupName(int group_no);

}