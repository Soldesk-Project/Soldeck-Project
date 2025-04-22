package org.joonzis.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AttachVO {
	private int com_no;
	private String att_uuid, att_path, att_name;
}
