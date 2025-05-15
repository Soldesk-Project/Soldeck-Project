package org.joonzis.mapper;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.joonzis.domain.EventVO;

public interface EventMapper {
//	public Date checkSpin(int mem_no);
	public boolean savePoint(@Param("mem_no") int mem_no, @Param("point") int point);
	public EventVO getPoint(int mem_no);
	public List<EventVO> getGame1Rank();
	public EventVO getMyGame1Rank(@Param("mem_no") int mem_no);
	public List<EventVO> getGame2Rank();
	public EventVO getMyGame2Rank(@Param("mem_no") int mem_no);
	public boolean saveGameScore1(@Param("mem_no") int mem_no, @Param("game_score_1") int game_score_1);
	public boolean saveGameScore2(@Param("mem_no") int mem_no, @Param("game_score_2") int game_score_1);
	public boolean checkAttendance(@Param("mem_no") int mem_no, @Param("attendance_date") Date attendance_date);
	public List<Integer> loadAttendance(@Param("mem_no") int mem_no, @Param("year") int year, @Param("month") int month);
	
	
	
	
}
