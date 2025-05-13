package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.MemberVO;
import org.joonzis.domain.PrivateChatLogVO;

public interface PrivateChatService {
	// 채팅방 존재 여부 확인
	public Integer checkExistingRoom(int user1No, int user2No);
	
	// 1:1 채팅방 생성
    public int createPrivateChatRoom(int user1No, int user2No);
    
    // 채팅 내역 저장
    public void savePrivateChatLog(int roomNo, int senderNo, String chatLog);
    
    // 1:1 채팅 내역 조회
    public List<PrivateChatLogVO> getChatLogsByRoomNo(int roomNo);
    
    // 1:1 대화 시 친구 정보 조회
    public MemberVO getMemberByNo(int friendNo);
}
