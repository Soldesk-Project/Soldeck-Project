package org.joonzis.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CommentDTO {
	private int com_no, mem_no, rest_no, com_rate;
	private String com_con, rest_name, rest_img_name;
	
}
