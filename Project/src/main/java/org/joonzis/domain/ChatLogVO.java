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
	private int chatNo;
    private int lineNo;
    private int memNo;
    private String chatLog;
    private String chatType;
    private Timestamp chatTime;
    private String chatRead;
}
