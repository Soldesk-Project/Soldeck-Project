package org.joonzis.service;

import java.sql.Date;
import java.util.List;

import org.joonzis.domain.EventVO;

public interface EventService {
	
//	public boolean checkSpin(int mem_no);
	public boolean savePoint(int mem_no, int point);
	public EventVO getPoint(int mem_no);
	public List<EventVO> getGame1Rank();
	public EventVO getMyGame1Rank(int mem_no);
	public List<EventVO> getGame2Rank();
	public EventVO getMyGame2Rank(int mem_no);
	public boolean saveGameScore1(int mem_no, int game_score_1);
	public boolean saveGameScore2(int mem_no, int game_score_2);
	
	public boolean checkAttendance(int mem_no, Date attendance_date);
	public List<Integer> loadAttendance(int mem_no, int year, int month);
	
	
	
	
	
}
