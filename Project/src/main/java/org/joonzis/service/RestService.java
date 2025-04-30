package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.ReserveRestDTO;
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
    
    // 멤버별 예약 리스트 확인
    public List<ReserveRestDTO> getReserveList(int mem_no);
    
    public boolean cancelBooking(int res_no);

    public boolean updateReserveMemo(int res_no, String res_memo);
    
    public List<RestVO> getTest();
    
    // 맵 특정 가게 검색
 	public List<RestVO> getSearch(String searchKeyword);
 	// 테스트
    public List<RestVO> getSearch2(List<String> keywords);
}
