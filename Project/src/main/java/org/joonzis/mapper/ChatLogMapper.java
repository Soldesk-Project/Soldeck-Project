package org.joonzis.mapper;

import org.joonzis.domain.ChatLogVO;

public interface ChatLogMapper {
	//채팅 로그 저장
	public int insertChat(ChatLogVO vo);
}
