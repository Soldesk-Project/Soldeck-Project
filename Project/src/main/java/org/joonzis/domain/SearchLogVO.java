package org.joonzis.domain;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class SearchLogVO {
	private Long id;
	private String keyword, ipAddress;
	private int mem_no;
	private Timestamp searchTime;
}
