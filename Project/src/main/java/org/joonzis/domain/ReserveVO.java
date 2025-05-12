package org.joonzis.domain;

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
public class ReserveVO {
	private int res_no, mem_no, rest_no;
	private String res_date, res_time, res_memo, res_personnel; 
}
