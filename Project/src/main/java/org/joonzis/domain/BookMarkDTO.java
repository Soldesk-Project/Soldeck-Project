package org.joonzis.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookMarkDTO {
	private int mem_no, rest_no;
	private String is_public, rest_name, rest_loc, rest_cate;
	private List<RestVO> rest;
	}
