package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.ChatLogVO;

public interface ChatLogService {
	//채팅 로그 저장
	void saveChat(String message, int groupNo, int memNo);
	
	//채팅 내역 가져오기
	public List<ChatLogVO> getChatsByGroupNo(int groupNo);
}
