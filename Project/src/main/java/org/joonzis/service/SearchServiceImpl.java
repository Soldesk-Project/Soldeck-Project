package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.PopularKeywordVO;
import org.joonzis.domain.SearchLogVO;
import org.joonzis.mapper.SearchMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchServiceImpl implements SearchService{

	@Autowired
	private SearchMapper smapper;
	
	@Override
	public void saveSearch(String keyword, String ip, Integer memNo) {
	    SearchLogVO vo = new SearchLogVO();
	    vo.setKeyword(keyword);
	    vo.setIpAddress(ip);
	    if (memNo!=null) {
	    	vo.setMem_no(memNo);
		}
	    smapper.insertSearchLog(vo);
	}
		
	@Override
	public List<PopularKeywordVO> getPopularKeyword() {
		return smapper.getPopularKeywords();
	}
}
