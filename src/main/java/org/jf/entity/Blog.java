package org.jf.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Blog {
	private int id;
	private String title;
	private String infos;
	private String time;
	private int uid;

	
}
