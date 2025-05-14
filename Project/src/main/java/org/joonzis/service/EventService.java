package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.EventVO;

public interface EventService {
	
//	public boolean checkSpin(int mem_no);
	public boolean savePoint(int mem_no, int point);
	public int getPoint(int mem_no);
	public List<EventVO> getGame1Rank();
	public EventVO getMyGame1Rank(int mem_no);
	public boolean saveGameScore1(int mem_no, int game_score_1);
	public int getGameScore1(int mem_no);
	
	
	
	
	
	
}
