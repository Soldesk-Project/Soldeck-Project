package org.joonzis.mapper;

import java.util.List;
import java.util.Map;

import org.joonzis.domain.RestVO;

public interface RestMapper {
	
	// 전체 가게 목록
	public List<RestVO> findAll();
	
	// 특정 가게 목록
	public List<RestVO> filteredAll(Map<String, Object> params);
	
	// 가게 찾기
	public RestVO findByNo(int rest_no);
}
