package org.jf.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Changguan {
	private long id;
	private String no;
	private String state;
	private String name;
	private String address;
	private String urls;
	private String infos;
	private String tel;
	private String type;
}
