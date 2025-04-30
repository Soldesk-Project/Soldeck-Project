package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.FriendVO;
import org.joonzis.mapper.FriendMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class FriendServiceImpl implements FriendService {
	
	@Autowired
	private FriendMapper mapper;
	
	@Override
	public List<FriendVO> getFriendList(int mem_no) {
		return mapper.getFriendList(mem_no);
	}
	
	@Override
	public void removeFriend(int mem_no, int friend_mem_no) {
		mapper.removeFriend(mem_no, friend_mem_no);
		
	}
	
	@Override
	public List<FriendVO> getRandomFriendList(int mem_no) {
		return mapper.getRandomFriendList(mem_no);
	}
}
