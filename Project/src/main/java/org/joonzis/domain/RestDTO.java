package org.joonzis.domain;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class RestDTO {
	private RestVO rest;
	private List<MenuVO> menuList = new ArrayList<MenuVO>();
}
