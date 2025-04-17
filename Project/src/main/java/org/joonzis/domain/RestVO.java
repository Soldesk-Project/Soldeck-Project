package org.joonzis.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class RestVO {
	private int rest_no;
	private String rest_name, rest_phone, rest_adr, rest_bh, rest_loc, rest_cate;
}
