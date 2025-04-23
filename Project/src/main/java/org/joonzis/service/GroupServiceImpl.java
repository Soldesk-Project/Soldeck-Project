package org.joonzis.service;

import org.joonzis.domain.ChatRoomVO;
import org.joonzis.domain.GroupVO;
import org.joonzis.mapper.ChatRoomMapper;
import org.joonzis.mapper.GroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class GroupServiceImpl implements GroupService {

	@Autowired
	GroupMapper mapper;
	
	@Autowired 
	ChatRoomMapper chatRoomMapper;
	
	@Override
	public int createGroup(GroupVO vo) {
		int result = mapper.createGroup(vo);
		if(result > 0) {
			ChatRoomVO chatRoom = new ChatRoomVO();
			chatRoom.setGroupNo(vo.getGroupNo());
			chatRoom.setChatTitle(vo.getChatTitle());
			chatRoomMapper.createChatRoom(chatRoom);
		}
		log.info("createGroup..." + vo);
		return result;
	}
	
}
