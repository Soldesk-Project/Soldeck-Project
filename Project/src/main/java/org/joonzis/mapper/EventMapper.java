package org.joonzis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.joonzis.domain.EventVO;

public interface EventMapper {
//	public Date checkSpin(int mem_no);
	public boolean savePoint(@Param("mem_no") int mem_no, @Param("point") int point);
	public int getPoint(int mem_no);
	public List<EventVO> getGame1Rank();
	public boolean saveGameScore1(@Param("mem_no") int mem_no, @Param("game_score_1") int game_score_1);
	public int getGameScore1(int mem_no);
}
