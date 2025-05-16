package org.joonzis.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GroupMemberDTO {
	private int group_no, mem_no, min_age, max_age;
	private String chat_title, group_usermemo, group_bookmark, is_public, lim_gender, group_img;
}
