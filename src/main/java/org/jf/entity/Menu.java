package org.jf.entity;

import java.util.List;

public class Menu {
	private String title;
	private List<ChildMenu> mlist;
	private int  mnum;
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public List<ChildMenu> getMlist() {
		return mlist;
	}
	public void setMlist(List<ChildMenu> mlist) {
		this.mlist = mlist;
	}
	
	public int getMnum() {
		return mnum;
	}
	public void setMnum(int mnum) {
		this.mnum = mnum;
	}
	public Menu(String title,int mnum, List<ChildMenu> mlist) {
		super();
		this.title = title;
		this.mlist = mlist;
		this.mnum=mnum;
	}
	
}
