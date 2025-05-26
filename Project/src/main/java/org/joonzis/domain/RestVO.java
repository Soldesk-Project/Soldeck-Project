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
public class RestVO {
	private int rest_no, com_count;
	private String rest_name, rest_phone, rest_adr, rest_bh, rest_loc, rest_cate, rest_info;
	private String rest_img_name;
	private double latitude, longitude, avg_rate;
}
