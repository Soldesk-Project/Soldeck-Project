package org.joonzis.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CommentVO {
	private int com_no, mem_no, rest_no, com_rate;
	private String com_con;
	private Date com_date;
}
