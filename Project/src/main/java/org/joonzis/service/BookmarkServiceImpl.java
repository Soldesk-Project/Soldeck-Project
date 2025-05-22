package org.joonzis.service;

import java.util.List;

import org.joonzis.domain.BookMarkDTO;
import org.joonzis.domain.BookMarkVO;
import org.joonzis.domain.RestVO;
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
	public List<BookMarkDTO> getBookmarkWithImages(int mem_no) {
		return mapper.getBookmarkWithImages(mem_no);
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
	@Override
	public boolean updateBookmarkPublicStatus(int mem_no, int rest_no, String is_public) {
		return mapper.updateIsPublic(mem_no, rest_no, is_public) > 0;
	}
	@Override
	public List<BookMarkDTO> getFriendBookMark(int friend_mem_no) {
		return mapper.getFriendBookMark(friend_mem_no);
	}
	
	
	
	
	
	
	
}
