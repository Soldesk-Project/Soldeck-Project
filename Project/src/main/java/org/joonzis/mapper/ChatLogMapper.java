package org.joonzis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.joonzis.domain.ChatLogVO;
import org.joonzis.domain.MemberVO;
import org.joonzis.domain.PrivateChatLogVO;

public interface ChatLogMapper {
	//채팅 로그 저장
	public int insertChat(ChatLogVO vo);
	
	//채팅 내역 가져오기
	public List<ChatLogVO> getChatsByGroupNo(int groupNo);
	
	// 1:1 채팅방 존재 여부 확인
	public Integer checkExistingRoom(@Param("user1No") int user1No, @Param("user2No") int user2No);
    
    // 1:1 채팅방 생성
    public int createPrivateChatRoom(@Param("user1No") int user1No, @Param("user2No") int user2No);
    
    // 채팅 내역 저장
    public void insertPrivateChatLog(int roomNo, int senderNo, String chatLog);
    
    // 1:1 채팅 내역 조회
    public List<PrivateChatLogVO> getChatLogsByRoomNo(int roomNo);
    
    // 1:1 대화 시 친구 정보 조회
    public MemberVO getMemberByNo(@Param("friendNo") int friendNo);
}
