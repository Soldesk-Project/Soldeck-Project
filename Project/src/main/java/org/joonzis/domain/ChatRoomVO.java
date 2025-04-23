package org.joonzis.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomVO {
	private int groupNo;      // 그룹 번호 (GROUP_NO)
    private Date regDate;     // 등록일 (REG_DATE)
}