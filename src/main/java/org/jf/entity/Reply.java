package org.jf.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reply {
	private int id;
	private String name;
	private int uid;
	private String time;
	private String message;
	private int root;
	private int parentid;
	private List<Reply> clist;
}
