package org.joonzis.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.joonzis.domain.BookMarkDTO;
import org.joonzis.domain.BookMarkVO;

public interface BookmarkService {

    public List<BookMarkDTO> getBookmarkWithImages(@Param("mem_no") int mem_no);
    public List<Integer> getBookMarkRestNo(int mem_no);
    public boolean deleteBookmark(int mem_no, int rest_no);
    public boolean addBookmark(BookMarkVO vo);
	public boolean isBookmarked(int mem_no, int rest_no);
	public boolean updateBookmarkPublicStatus(int mem_no, int rest_no, String is_public);
	public List<BookMarkDTO> getFriendBookMark(int friend_mem_no);
}