package org.joonzis.domain;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReserveRestDTO {
	private int res_no, mem_no, rest_no;
	private String res_time, res_memo, res_personnel, rest_name, rest_adr, rest_bh, rest_cate, rest_img_name, is_public;
	private Date res_date;
}
