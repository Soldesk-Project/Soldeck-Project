package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.FriendVO;
import org.joonzis.domain.MemberVO;

public interface FriendService {

	public List<FriendVO> getFriendList(int mem_no);
	
	void removeFriend(int mem_no, int friend_mem_no);
	
	public List<FriendVO> getRandomFriendList(int mem_no);
	
	void insertFriend(int mem_no, int friend_mem_no);
	
	// 친구 요청 보내기
    boolean sendFriendRequest(int senderMemNo, int receiverMemNo);

    // 친구 요청 수락
    boolean acceptFriendRequest(int senderMemNo, int receiverMemNo);
	public List<MemberVO> getSimpleSearch(String keyword);
	
}
