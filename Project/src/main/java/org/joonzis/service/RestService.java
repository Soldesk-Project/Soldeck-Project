package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.MenuVO;
import org.joonzis.domain.ReserveRestDTO;
import org.joonzis.domain.ReserveVO;
import org.joonzis.domain.RestVO;

public interface RestService {
	// 전체 가게 목록
	public List<RestVO> getList();

	// 인덱스 취향 추천 픽
	public List<RestVO> likeKateData(List<String> foodList);
	
	// 인덱스 오늘의 추천 픽
	public List<RestVO> todayData();
	
	// 가게 찾기
	public List<RestVO> get(int rest_no);

	// 가게 메뉴 찾기
	public List<MenuVO> getMenu(int rest_no);

	public List<RestVO> getRest(int rest_no);

	public void addReserve(ReserveVO reservation);
	
	// 예약된 시간 목록 조회
    public List<String> getReservedTimes(int rest_no, String res_date);
    
    // 멤버별 예약 리스트 확인
    public List<ReserveRestDTO> getReserveList(int mem_no);
    
    public boolean cancelBooking(int res_no);

    public boolean updateReserveMemo(int res_no, String res_memo);
    
    // 맵 특정 가게 검색
    public List<RestVO> getSearch(List<String> keywords);
    
    //썸네일 + 전체 가게
    public List<RestVO> getAllRestWithThumbnail();
}
