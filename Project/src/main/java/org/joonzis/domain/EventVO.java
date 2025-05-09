package org.joonzis.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class EventVO {
	public int mem_no, point, game_score_1, game_score_2;
	public String mem_nick;
	public Date last_spin; 
}
