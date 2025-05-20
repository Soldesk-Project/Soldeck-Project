package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.PopularKeywordVO;

public interface SearchService {
	
	void saveSearch(String keyword, String ip, Integer memNo);
	
	List<PopularKeywordVO> getPopularKeyword();
	
}
