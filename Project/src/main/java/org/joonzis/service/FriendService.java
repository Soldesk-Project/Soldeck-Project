package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.FriendVO;

public interface FriendService {

	public List<FriendVO> getFriendList(int mem_no);
	
	void removeFriend(int mem_no, int friend_mem_no);
	
	public List<FriendVO> getRandomFriendList(int mem_no);
	
}
