package org.jf.service;


import org.jf.entity.Notice;

import java.util.List;
import java.util.Map;

public interface NoticeService {

	List<Notice> getNotice(Map map);

	Notice getById(String id);

	List<Notice> getIndex();
	
	void insertopt(Notice notice);

	void updateopt(Notice notice);

	void deleteopt(int id);

	String conutNotice();

}
