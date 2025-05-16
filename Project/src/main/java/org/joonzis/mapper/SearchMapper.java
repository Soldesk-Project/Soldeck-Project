package org.joonzis.mapper;

import java.util.List;

import org.joonzis.domain.PopularKeywordVO;
import org.joonzis.domain.SearchLogVO;

public interface SearchMapper {
	
	void insertSearchLog(SearchLogVO vo);
	
	List<PopularKeywordVO> getPopularKeywords();
	
}
