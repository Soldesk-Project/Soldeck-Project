package org.joonzis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.joonzis.domain.FriendVO;

public interface FriendMapper {

	List<FriendVO> getFriendList(@Param("mem_no") int mem_no);
	
	void removeFriend(@Param("mem_no") int mem_no, @Param("friend_mem_no") int friend_mem_no);
	
	List<FriendVO> getRandomFriendList(@Param("mem_no") int mem_no);
	
	void insertFriend(@Param("mem_no") int mem_no, @Param("friend_mem_no") int friend_mem_no);
	
}
