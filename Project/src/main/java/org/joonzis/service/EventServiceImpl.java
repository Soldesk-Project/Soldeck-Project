package org.joonzis.service;

import java.sql.Date;
import java.util.List;

import org.joonzis.domain.EventVO;
import org.joonzis.mapper.EventMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EventServiceImpl implements EventService{
	
	@Autowired
	private EventMapper mapper;

	@Override
	public boolean savePoint(int mem_no, int point) {
		return mapper.savePoint(mem_no, point);
	}
	
	@Override
	public EventVO getPoint(int mem_no) {
		return mapper.getPoint(mem_no);
	}
	@Override
	public List<EventVO> getGame1Rank() {
		return mapper.getGame1Rank();
	}
	@Override
	public EventVO getMyGame1Rank(int mem_no) {
		return mapper.getMyGame1Rank(mem_no);
	}
	@Override
	public List<EventVO> getGame2Rank() {
		return mapper.getGame2Rank();
	}
	@Override
	public EventVO getMyGame2Rank(int mem_no) {
		return mapper.getMyGame2Rank(mem_no);
	}
	@Override
	public boolean saveGameScore1(int mem_no, int game_score_1) {
		return mapper.saveGameScore1(mem_no, game_score_1);
	}
	@Override
	public boolean saveGameScore2(int mem_no, int game_score_2) {
		return mapper.saveGameScore2(mem_no, game_score_2);
	}
	@Override
	public boolean checkAttendance(int mem_no, Date attendance_date) {
		return mapper.checkAttendance(mem_no, attendance_date);
	}
	@Override
	public List<Integer> loadAttendance(int mem_no, int year, int month) {
		return mapper.loadAttendance(mem_no, year, month);
	}
	
	
	
	
	
}
