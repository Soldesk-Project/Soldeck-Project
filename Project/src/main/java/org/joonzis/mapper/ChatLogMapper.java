package org.joonzis.mapper;

import java.util.List;

import org.joonzis.domain.ChatLogVO;

public interface ChatLogMapper {
	//채팅 로그 저장
	public int insertChat(ChatLogVO vo);
	
	//채팅 내역 가져오기
	public List<ChatLogVO> getChatsByGroupNo(int groupNo);
}
