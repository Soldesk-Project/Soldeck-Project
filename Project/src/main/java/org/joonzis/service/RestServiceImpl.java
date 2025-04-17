package org.joonzis.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	public List<RestVO> getFilteredList(String region, String category) {
		log.info("getFilteredList... region: " + region + ", category: " + category);
		Map<String, Object> params = new HashMap<>();
	    if (region != null && !region.isEmpty()) {
	        params.put("region", "%" + region + "%");
	    }
	    if (category != null && !category.isEmpty()) {
	        params.put("category", category);
	    }
		return mapper.filteredAll(params);
	}
	@Override
	public RestVO get(int rest_no) {
		log.info("get...");
		return mapper.findByNo(rest_no);
	}
}
