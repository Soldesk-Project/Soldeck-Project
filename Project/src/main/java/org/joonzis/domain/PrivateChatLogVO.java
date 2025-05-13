package org.joonzis.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class PrivateChatLogVO {
	private int chatNo, roomNo, senderNo;
	private String chatLog;
	private Date chatTime;
	
	private String sender;
	private String msg;
}
