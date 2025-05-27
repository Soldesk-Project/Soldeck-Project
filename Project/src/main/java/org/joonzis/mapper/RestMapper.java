package org.joonzis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.joonzis.domain.MenuVO;
import org.joonzis.domain.ReserveRestDTO;
import org.joonzis.domain.ReserveVO;
import org.joonzis.domain.RestVO;

public interface RestMapper {
	
	// 전체 가게 목록
	public List<RestVO> findAll();
	
	// 인덱스 취향 추천 픽
	public List<RestVO> likeKateData(List<String> foodList);
	
	// 인덱스 오늘의 추천 픽
	public List<RestVO> todayData();
	
	// 가게 찾기
	public List<RestVO> findByNo(@Param("rest_no") int rest_no);
	
	public int findByName(String rest_name);
	
	public void addRestImg(@Param("rest_no") int rest_no, @Param("img_no") int img_no);
	
	public void updateRestImg(@Param("rest_no") int rest_no, @Param("img_name") String img_name, @Param("img_no") int img_no);
	
	public void addRestMenu(@Param("rest_no") int rest_no, @Param("menu_name") String menu_name, @Param("menu_price") String menu_price);

	// 가게 메뉴 찾기
	public List<MenuVO> getMenu(@Param("rest_no") int rest_no);
	
	public List<RestVO> getRest(int rest_no);

	public List<ReserveRestDTO> getReserve(int mem_no);
	
	public void addReserve(ReserveVO reservation);
	public void addRest(RestVO RestVO);
	
	// 특정 날짜와 음식점에 예약된 시간 목록 조회
	public List<String> getReservedTimes(@Param("rest_no") int rest_no, @Param("res_date") String res_date);
	
	public List<ReserveRestDTO> getReserveList(@Param("mem_no") int mem_no);
	
	public boolean cancelBooking(@Param("res_no") int res_no);
	

	public boolean updateReserveMemo(@Param("res_no") int res_no, @Param("res_memo") String res_memo);
	
	// 맵 특정 가게 검색
	public List<RestVO> getSearch(@Param("keywords") List<String> keywords);
	
	// 썸네일 + 전체 가게
	public List<RestVO> getAllRestWithThumbnail();

	
	public void deleteRestaurnt(@Param("rest_no") int rest_no);
	
}
