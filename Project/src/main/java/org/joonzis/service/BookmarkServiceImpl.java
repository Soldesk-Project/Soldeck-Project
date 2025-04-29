package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.BookMarkVO;
import org.joonzis.mapper.BookmarkMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class BookmarkServiceImpl implements BookmarkService{

	@Autowired
	private BookmarkMapper mapper;

	@Override
	public List<BookMarkVO> getBookMark(int mem_no) {
		return mapper.getBookMark(mem_no);
	}
	@Override
	public List<Integer> getBookMarkRestNo(int mem_no) {
		return mapper.getBookMarkRestNo(mem_no);
	}
	@Override
	public boolean deleteBookmark(int mem_no, int rest_no) {
		return mapper.deleteBookmark(mem_no, rest_no);
	}
	@Override
	public boolean addBookmark(BookMarkVO vo) {
		return mapper.addBookmark(vo);
	}
	@Override
	public boolean isBookmarked(int mem_no, int rest_no) {
	       return mapper.check(mem_no, rest_no) > 0;
	}
	
	
	
}
