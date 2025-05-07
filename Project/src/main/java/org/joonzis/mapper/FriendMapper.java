package org.joonzis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.joonzis.domain.FriendVO;

public interface FriendMapper {

	List<FriendVO> getFriendList(@Param("mem_no") int mem_no);
	
	void removeFriend(@Param("mem_no") int mem_no, @Param("friend_mem_no") int friend_mem_no);
	
	List<FriendVO> getRandomFriendList(@Param("mem_no") int mem_no);
	
	void insertFriend(@Param("mem_no") int mem_no, @Param("friend_mem_no") int friend_mem_no);
	
	 // 친구 요청 보내기 (friend_request 테이블에 삽입)
    void insertFriendRequest(@Param("senderMemNo") int senderMemNo, @Param("receiverMemNo") int receiverMemNo);
    
    // 친구 요청 중복 확인 (친구 요청이 이미 존재하는지 확인)
    int checkRequestExist(@Param("senderMemNo") int senderMemNo, @Param("receiverMemNo") int receiverMemNo);
    
    // 친구 요청 상태 변경 (친구 요청을 수락했을 때 상태 업데이트)
    void updateRequestStatus(@Param("senderMemNo") int senderMemNo, @Param("receiverMemNo") int receiverMemNo, @Param("status") String status);
    
    // 친구 요청 수락 후 친구 관계 추가 (friend 테이블에 삽입)
    void insertFriendAfterRequestAccepted(@Param("senderMemNo") int senderMemNo, @Param("receiverMemNo") int receiverMemNo);
}
