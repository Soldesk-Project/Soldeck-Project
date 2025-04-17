package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.RestVO;
import org.joonzis.mapper.RestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class RestServiceImpl implements RestService{
	
	@Autowired
	private RestMapper mapper;
	
	@Override
	public List<RestVO> getList() {
		log.info("getList...");
		return mapper.findAll();
	}
	
	@Override
	public List<RestVO> getFindList(String region, String category) {
		log.info("getFindList..." + region + category);
		return mapper.getFindAll(region, category);
	}
	
	@Override
	public RestVO get(int rest_no) {
		log.info("get...");
		return mapper.findByNo(rest_no);
	}
}
