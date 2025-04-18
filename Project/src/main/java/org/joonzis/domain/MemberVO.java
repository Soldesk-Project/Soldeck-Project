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
public class MemberVO {
	private int mem_no;
	private String mem_id, mem_pw, mem_name, mem_nick, mem_birth, mem_img;
	private Date mem_date;
}
