package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.FriendVO;
import org.joonzis.domain.MemberVO;
import org.joonzis.mapper.FriendMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class FriendServiceImpl implements FriendService {
	
	@Autowired
	private FriendMapper mapper;
	
	@Override
	public List<FriendVO> getFriendList(int mem_no) {
		return mapper.getFriendList(mem_no);
	}
	
	@Override
	public void removeFriend(int mem_no, int friend_mem_no) {
		mapper.removeFriend(mem_no, friend_mem_no);
		
	}
	
	@Override
	public List<FriendVO> getRandomFriendList(int mem_no) {
		return mapper.getRandomFriendList(mem_no);
	}
	
	@Override
	@Transactional
	public void insertFriend(int mem_no, int friend_mem_no) {
		mapper.insertFriend(mem_no, friend_mem_no);
		
	}
	
	@Override
<<<<<<< Updated upstream
    public boolean sendFriendRequest(int senderMemNo, int receiverMemNo) {
        // 중복 요청 방지
        if (mapper.checkRequestExist(senderMemNo, receiverMemNo) == 0) {
            mapper.insertFriendRequest(senderMemNo, receiverMemNo);
            return true;
        }
        return false;  // 이미 요청된 상태
    }

    @Override
    @Transactional
    public boolean acceptFriendRequest(int senderMemNo, int receiverMemNo) {
        // 요청 상태 업데이트 (예: 'ACCEPTED')
        mapper.updateRequestStatus(senderMemNo, receiverMemNo, "ACCEPTED");

        // 친구 테이블에 삽입 (양방향이면 두 번 삽입)
        mapper.insertFriendAfterRequestAccepted(senderMemNo, receiverMemNo);
        mapper.insertFriendAfterRequestAccepted(receiverMemNo, senderMemNo);

        return true;
    }
=======
	public List<MemberVO> getSimpleSearch(String keyword) {
		return mapper.searchFriendByNickname("%" + keyword + "%");
	}
>>>>>>> Stashed changes
}
