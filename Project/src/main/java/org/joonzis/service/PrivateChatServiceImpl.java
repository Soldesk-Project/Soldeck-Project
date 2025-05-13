package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.MemberVO;
import org.joonzis.domain.PrivateChatLogVO;
import org.joonzis.mapper.ChatLogMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrivateChatServiceImpl implements PrivateChatService {
	
	@Autowired
	private ChatLogMapper mapper;
	
	@Override
	public Integer checkExistingRoom(int user1No, int user2No) {
		return mapper.checkExistingRoom(user1No, user2No);
	}

	@Override
    public int createPrivateChatRoom(int user1No, int user2No) {
        // 두 사용자의 번호를 합쳐서 고유한 roomNo 생성
        int roomNo = (user1No < user2No) ? Integer.parseInt(user1No + "" + user2No) : Integer.parseInt(user2No + "" + user1No);

        // MyBatis mapper를 통해 채팅방 생성 쿼리 실행
        mapper.createPrivateChatRoom(roomNo, user1No, user2No); // mapper로 쿼리 실행

        return roomNo; // 생성된 roomNo 반환
    }
	
	@Override
	public void savePrivateChatLog(int roomNo, int senderNo, String chatLog) {
		mapper.insertPrivateChatLog(roomNo, senderNo, chatLog);
		
	}

	@Override
	public List<PrivateChatLogVO> getChatLogsByRoomNo(int roomNo) {
		return mapper.getChatLogsByRoomNo(roomNo);
	}

	@Override
	public MemberVO getMemberByNo(int friendNo) {
		return mapper.getMemberByNo(friendNo);
	}
}
