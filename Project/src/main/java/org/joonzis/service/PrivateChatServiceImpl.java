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
		int roomNo = mapper.createPrivateChatRoom(user1No, user2No);
		return  roomNo;
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
