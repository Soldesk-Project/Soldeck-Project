package org.joonzis.domain;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class GroupDTO {
	private int group_no, mem_no, max_mem, min_age, max_age;
	private String chat_title, lim_gender, is_public, group_memo, group_img;
	private Date reg_date;
	public List<Integer> foodList;
}
