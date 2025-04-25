package org.joonzis.domain;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatLogVO {
	private int chatNo, groupNo, memNo;
	private String chatLog, chatType, chatRead;
	private Timestamp chatTime;
	
	private String sender;
	private String msg;
}