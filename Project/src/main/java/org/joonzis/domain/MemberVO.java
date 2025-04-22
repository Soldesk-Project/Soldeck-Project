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
	private int mem_no, mem_phone;
	private String mem_id, mem_pw, mem_name, mem_nick, mem_birth, mem_img, mem_email;
	private Date mem_date;
}
