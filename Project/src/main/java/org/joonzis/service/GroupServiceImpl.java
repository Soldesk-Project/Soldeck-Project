package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.ChatRoomVO;
import org.joonzis.domain.GroupDTO;
import org.joonzis.domain.GroupMemberDTO;
import org.joonzis.domain.GroupVO;
import org.joonzis.mapper.GroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    private GroupMapper mapper;

    @Override
    public int createGroupAndChatRoom(GroupDTO dto) {
        // 1. 그룹 생성
        int result = mapper.createGroup(dto);
        if(result > 0) {
            log.info("Group created successfully: " + dto);
            
            // 2. 그룹 번호가 생성되면, 해당 그룹 번호로 채팅방 생성
            int groupNo = dto.getGroup_no();  // 그룹 번호를 받아옵니다.

            ChatRoomVO chatRoomVO = new ChatRoomVO();
            chatRoomVO.setGroupNo(groupNo);
            result = mapper.createChatRoom(chatRoomVO);
            mapper.joinGroup(dto.getMem_no(), groupNo);
            if(result > 0) {
                log.info("Chat room created successfully for group number: " + groupNo);
            }
        } else {
            log.error("Group creation failed: " + dto);
        }
        
        return result;
    }
    @Override
    public void insertFoodKate(int group_no, int food_no) {
    	mapper.insertFoodKate(group_no, food_no);
    }
    
    
    
    
	@Override
	public List<GroupMemberDTO> getAllGroups(int mem_no) {
		return mapper.getAllGroups(mem_no);
	}
	@Override
	public List<Integer> getGroupFoodKate(int group_no) {
		return mapper.getGroupFoodKate(group_no);
	}
	
	
	
	
	@Override
	public boolean updateGroupMemo(int mem_no, int group_no, String group_usermemo) {
		return mapper.updateGroupMemo(mem_no, group_no, group_usermemo);
	}
	@Override
	public boolean addGroupBookmark(int group_no, int mem_no) {
		return mapper.addGroupBookmark(group_no, mem_no);
	}
	@Override
	public boolean cancelGroupBookmark(int group_no, int mem_no) {
		return mapper.cancelGroupBookmark(group_no, mem_no);
	}
	
	
	@Override
	public List<GroupVO> getGroupList(int mem_no) {
		return mapper.getgroupList(mem_no);
	}
	
	@Override
    public Integer getGroupNoByMember(int mem_no) {
        return mapper.getGroupNoByMember(mem_no);
    }

    @Override
    public List<GroupDTO> getRandomGroupList(int group_no, int mem_no) {
        return mapper.getRandomGroupList(group_no, mem_no);
    }

    @Override
    public List<GroupDTO> getRandomGroupListWithoutFilter(int mem_no) {
        return mapper.getRandomGroupListWithoutFilter(mem_no);
    }

	@Override
	public List<GroupVO> getSimpleSearch(String keyword) {
		return mapper.searchGroupBygroupname(keyword);
	}
	
	@Override
	public void joinGroup(int group_no, int mem_no) {
		mapper.joinGroup(group_no, mem_no);
	}
	
	@Override
	public void removeGroup(int group_no, int mem_no) {
		mapper.removeGroup(group_no, mem_no);
	}
	
	// 그룹 가입 요청 전송
	@Override
	public boolean insertGroupRequset(int group_no, int mem_no) {
		if(mapper.checkRequestExist(group_no, mem_no) == 0) {
			mapper.insertGroupRequset(group_no, mem_no);
			return true;
		}
		return false;
	}
	
	
	// 그룹 가입 요청 수락
	@Override
	public boolean acceptGroupRequest(int group_no, int mem_no) {
		
		System.out.println(("Accept group request: group_no=" + group_no + ", mem_no=" + mem_no));
		// 요청 상태 업데이트
		mapper.updateRequestStatus(group_no, mem_no, "ACCEPTED");
		
		// group_mem 테이블에 삽입
		mapper.joinGroup(group_no, mem_no);
		
		// 수락 후 요청 테이블 비우기
		mapper.deleteGroupRequest(group_no, mem_no);
		return false;
	}
	
	// 그룹 가입 요청 거절
	@Override
	public boolean declineGroupRequest(int group_no, int mem_no) {
		mapper.deleteGroupRequest(group_no, mem_no);
		return false;
	}
	@Override
	public int getGroupOwnerMemNo(int group_no) {
		return mapper.getGroupOwnerMemNo(group_no);
	}
	
	@Override
	public List<GroupVO> getGroupListByMember(int mem_no) {
		return mapper.getGroupListByMember(mem_no);
	}
}
