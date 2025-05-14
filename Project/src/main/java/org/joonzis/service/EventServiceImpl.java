package org.joonzis.service;

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
	
	
//	@Override
//	public boolean checkSpin(int mem_no) {
//		log.info("service......");
//	    LocalDate now = LocalDate.now();
//	    log.info("현재 날짜: " + now);
//	    
//	    Date lastSpin = mapper.checkSpin(mem_no);
//	    log.info("DB에서 조회한 lastSpin: " + lastSpin);
//	    
//	    LocalDate lastSpinDate = null;
//	    if (lastSpin != null) {
//	        if (lastSpin instanceof java.sql.Date) {
//	            lastSpinDate = ((java.sql.Date) lastSpin).toLocalDate();
//	        } else {
//	            lastSpinDate = lastSpin.toInstant()
//	                                 .atZone(ZoneId.systemDefault())
//	                                 .toLocalDate();
//	        }
//	    }
//	    log.info("변환된 lastSpinDate: " + lastSpinDate);
//	    
//	    boolean result = lastSpinDate == null || !lastSpinDate.isEqual(now);
//	    log.info("결과: " + result);
//	    return result;
//	}

	@Override
	public boolean savePoint(int mem_no, int point) {
		return mapper.savePoint(mem_no, point);
	}
	
	@Override
	public int getPoint(int mem_no) {
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
	public boolean saveGameScore1(int mem_no, int game_score_1) {
		return mapper.saveGameScore1(mem_no, game_score_1);
	}
	@Override
	public int getGameScore1(int mem_no) {
		return mapper.getGameScore1(mem_no);
	}
	
	
	
	
	
	
	
}
