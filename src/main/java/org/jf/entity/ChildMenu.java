package org.jf.entity;

public class ChildMenu {
	private String title;
	private String urls;
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUrls() {
		return urls;
	}
	public void setUrls(String urls) {
		this.urls = urls;
	}
	public ChildMenu(String title, String urls) {
		super();
		this.title = title;
		this.urls = urls;
	}
	
}
