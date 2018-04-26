package org.jf.dao;


import org.apache.ibatis.annotations.Mapper;
import org.jf.entity.Notice;

import java.util.List;
import java.util.Map;

@Mapper
public interface NoticeDao {
	List<Notice> getForPage(Map map);
	
	List<Notice> getForIndex();
	
	Notice getByid(String id);
	
	
	void insert(Notice Notice);
	
	void update(Notice Notice);	
	
	void delete(int id);
	
	String conutNotice();
	
}
