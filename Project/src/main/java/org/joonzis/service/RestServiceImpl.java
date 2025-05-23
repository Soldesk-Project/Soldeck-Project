package org.joonzis.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.joonzis.domain.MenuVO;
import org.joonzis.domain.ReserveRestDTO;
import org.joonzis.domain.ReserveVO;
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
	
	// 전체 가게 목록
	@Override
	public List<RestVO> getList() {
		return mapper.findAll();
	}
	
	// 특정 가게 목록
	@Override
	public List<RestVO> likeKateData(List<String> foodList) {
		return mapper.likeKateData(foodList);
	}
	
	// 특정 가게 검색
	@Override
    public List<RestVO> todayData() {
        return mapper.todayData();
    }
	
	// 가게 찾기
	@Override
	public List<RestVO> get(int rest_no) {
		return mapper.findByNo(rest_no);
	}
	
	// 가게 메뉴 찾기
	@Override
	public List<MenuVO> getMenu(int rest_no) {
		return mapper.getMenu(rest_no);
	}
	
	@Override
	public List<RestVO> getRest(int rest_no) {
		return mapper.getRest(rest_no);
	}
	
	@Override
    public void addReserve(ReserveVO reservation) {
        
        // 필수 데이터 검증
        if (reservation.getRes_date() == null) {
            throw new IllegalArgumentException("예약 날짜(res_date)는 필수입니다.");
        }
        if (reservation.getRes_time() == null) {
            throw new IllegalArgumentException("예약 시간(res_time)은 필수입니다.");
        }
        if (reservation.getRes_personnel() == null) {
        	throw new IllegalArgumentException("예약 인원(res_personnel)은 필수입니다.");
        }
        
        // res_date 형식 검증
        String resDate = reservation.getRes_date();
        if (!resDate.matches("\\d{4}-\\d{1,2}-\\d{1,2}")) {
            throw new IllegalArgumentException("예약 날짜(res_date)는 'YYYY-MM-DD' 형식이어야 합니다.");
        }
        
        // res_time 형식 검증
        String resTime = reservation.getRes_time();
        if (!resTime.matches("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")) {
            throw new IllegalArgumentException("예약 시간(res_time)은 'HH:MM' 형식이어야 합니다.");
        }
        
        mapper.addReserve(reservation);
    }
	
	@Override
    public List<String> getReservedTimes(int rest_no, String res_date) {
        return mapper.getReservedTimes(rest_no, res_date);
    }
	
	
	@Override
	public List<ReserveRestDTO> getReserveList(int mem_no) {
		return mapper.getReserveList(mem_no);
	}
	@Override
	public boolean cancelBooking(int res_no) {
		return mapper.cancelBooking(res_no);
	}

	@Override
	public boolean updateReserveMemo(int res_no, String res_memo) {
		return mapper.updateReserveMemo(res_no, res_memo);
	}

	@Override
	public List<RestVO> getSearch(List<String> keywords) {
		return mapper.getSearch(keywords);
	}

	@Override
	public List<RestVO> getAllRestWithThumbnail() {
		return mapper.getAllRestWithThumbnail();
	}
	
	@Override
	public List<ReserveRestDTO> getReserve(int mem_no) {
		return mapper.getReserve(mem_no);
	}
}
