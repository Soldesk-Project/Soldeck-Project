package org.joonzis.service;

public interface ChatLogService {
	//채팅 로그 저장
	void saveChat(String message, int groupNo, int memNo);
}
