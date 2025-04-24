package org.joonzis.mapper;

import java.util.List;

import org.joonzis.domain.AttachVO;

public interface AttachMapper {
	// 파일 업로드
	public void insert(AttachVO vo);
	// 파일 삭제
	public void delete(String uuid);
	// 파일 목록
	public List<AttachVO> findByCom_no(int com_no);
}
