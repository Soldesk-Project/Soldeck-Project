package org.joonzis.domain;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class CommentVO {
	private int com_no, mem_no, rest_no, com_rate;
	private String com_con;
	private Date com_date;
	
	private List<AttachVO> com_attachList;
	private MemberVO com_memberData;
}
