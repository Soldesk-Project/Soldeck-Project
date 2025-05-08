package org.joonzis.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class GroupVO {
	private int group_no, mem_no, max_mem, min_age, max_age;
	private String chat_title, lim_gender, is_public, group_memo, group_img;
	private Date reg_date;
}
