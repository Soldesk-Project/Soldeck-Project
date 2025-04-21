package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.RestVO;

public interface RestService {
	// 전체 가게 목록
	public List<RestVO> getList();

	// 특정 가게 목록
	public List<RestVO> getFilteredList(String region, String category);
	
	// 특정 가게 검색
//	public List<RestVO> getSearchList(String rest_name);
	public List<RestVO> getSearchList(String keyword, String region, String category);;
	
	// 가게 찾기
	public List<RestVO> get(int rest_no);
}
