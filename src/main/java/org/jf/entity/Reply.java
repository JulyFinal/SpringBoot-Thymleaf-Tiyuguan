package org.jf.entity;

import java.util.List;

public class Reply {
	private int id;
	private String name;
	private int uid;
	private String time;
	private String message;
	private int root;
	private int parentid;
	private List<Reply> clist;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public int getRoot() {
		return root;
	}
	public void setRoot(int root) {
		this.root = root;
	}
	public int getParentid() {
		return parentid;
	}
	public void setParentid(int parentid) {
		this.parentid = parentid;
	}
	public List<Reply> getClist() {
		return clist;
	}
	public void setClist(List<Reply> clist) {
		this.clist = clist;
	}
	
}
