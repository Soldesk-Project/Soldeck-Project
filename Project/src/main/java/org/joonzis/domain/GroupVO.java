package org.joonzis.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class GroupVO {
	private int groupNo, memNo, maxMem, minAge, maxAge;
	private String chatTitle, limGender, isPublic, groupMemo;
	private Date regDate;
}
