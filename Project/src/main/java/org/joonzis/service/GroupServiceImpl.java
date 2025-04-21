package org.joonzis.service;

import org.joonzis.domain.GroupVO;
import org.joonzis.mapper.GroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class GroupServiceImpl implements GroupService {

	@Autowired
	GroupMapper mapper;
	
	@Override
	public int createGroup(GroupVO vo) {
		log.info("createGroup..." + vo);
		
		mapper.createGroup(vo);
		return 0;
	}
	
}
