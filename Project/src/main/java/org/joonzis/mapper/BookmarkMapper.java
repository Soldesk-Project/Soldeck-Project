package org.joonzis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.joonzis.domain.BookMarkVO;

public interface BookmarkMapper {

	public List<BookMarkVO> getBookMark(@Param("mem_no") int mem_no);
	public List<Integer> getBookMarkRestNo(@Param("mem_no") int mem_no);
	public boolean deleteBookmark(@Param("mem_no") int mem_no, @Param("rest_no") int rest_no);
	public boolean addBookmark(BookMarkVO vo);
	public int check(@Param("mem_no") int mem_no, @Param("rest_no") int rest_no);
	public int updateIsPublic(@Param("mem_no")int mem_no, @Param("rest_no")int rest_no, @Param("is_public")String is_public);
	
}