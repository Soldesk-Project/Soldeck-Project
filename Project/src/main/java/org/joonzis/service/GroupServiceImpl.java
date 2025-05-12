package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.ChatRoomVO;
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
    public int createGroupAndChatRoom(GroupVO vo) {
        // 1. 그룹 생성
        int result = mapper.createGroup(vo);
        if(result > 0) {
            log.info("Group created successfully: " + vo);
            
            // 2. 그룹 번호가 생성되면, 해당 그룹 번호로 채팅방 생성
            int groupNo = vo.getGroup_no();  // 그룹 번호를 받아옵니다.

            ChatRoomVO chatRoomVO = new ChatRoomVO();
            chatRoomVO.setGroupNo(groupNo);
            result = mapper.createChatRoom(chatRoomVO);
            
            if(result > 0) {
                log.info("Chat room created successfully for group number: " + groupNo);
            }
        } else {
            log.error("Group creation failed: " + vo);
        }
        
        return result;
    }

	@Override
	public List<GroupMemberDTO> getAllGroups(int mem_no) {
		return mapper.getAllGroups(mem_no);
	}
	
	
	
	
	
	@Override
	public boolean updateGroupMemo(int group_no, int mem_no, String group_usermemo) {
		return mapper.updateGroupMemo(group_no, mem_no, group_usermemo);
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
    public List<GroupVO> getRandomGroupList(int group_no, int mem_no) {
        return mapper.getRandomGroupList(group_no, mem_no);
    }

    @Override
    public List<GroupVO> getRandomGroupListWithoutFilter(int mem_no) {
        return mapper.getRandomGroupListWithoutFilter(mem_no);
    }

	@Override
	public List<GroupVO> getSimpleSearch(String keyword) {
		return mapper.searchGroupBygroupname(keyword);
	}
	
	@Override
	public void insertGroup(int group_no, int mem_no) {
		mapper.insertGroup(group_no, mem_no);
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

	@Override
	public void getGroupOwnerMemNo(int group_no) {
		mapper.getGroupOwnerMemNo(group_no);
	}
}
