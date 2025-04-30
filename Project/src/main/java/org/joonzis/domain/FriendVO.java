package org.joonzis.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FriendVO {
	private int mem_no, friend_mem_no;
	private String fre_memo;
	
	private MemberVO friendMember;
}
