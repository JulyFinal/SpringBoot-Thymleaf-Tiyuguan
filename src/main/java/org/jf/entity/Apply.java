package org.jf.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Apply {
	private long id;
	private String name;
	private long uid;
	private String cname;
	private long cid;
	private String time;
	private String tel;
	private String starttime;
	private String endtime;
	private String state;
}
