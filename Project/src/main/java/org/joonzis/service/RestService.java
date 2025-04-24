package org.joonzis.service;

import java.util.List;
import java.util.Map;

import org.joonzis.domain.ReserveVO;
import org.joonzis.domain.RestVO;

public interface RestService {
	// 전체 가게 목록
	public List<RestVO> getList();

	// 특정 가게 목록
	public List<RestVO> getFilteredList(String region, String category);
	
	// 특정 가게 검색
	public List<RestVO> getSearchList(String keyword, String region, String category);;
	
	// 가게 찾기
	public List<RestVO> get(int rest_no);

	public RestVO getRest(int rest_no);

	public void addReserve(ReserveVO reservation);
	
	// 예약된 시간 목록 조회
    public List<String> getReservedTimes(int rest_no, String res_date);
}
