package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.ChatLogVO;
import org.joonzis.mapper.ChatLogMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatLogServiceImpl implements ChatLogService {
	@Autowired
	private ChatLogMapper chatLogMapper;

	@Override
	public void saveChat(String message, int groupNo, int memNo) {
		
		ChatLogVO chat = new ChatLogVO();
		chat.setGroupNo(groupNo);
		chat.setMemNo(memNo);
		chat.setChatLog(message);
		chat.setChatType("text");  // 기본은 텍스트로 가정
		
		chatLogMapper.insertChat(chat);
	}

	@Override
	public List<ChatLogVO> getChatsByGroupNo(int groupNo) {
		return chatLogMapper.getChatsByGroupNo(groupNo);
	}
	
	
}
