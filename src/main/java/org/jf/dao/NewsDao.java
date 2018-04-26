package org.jf.dao;


import org.apache.ibatis.annotations.Mapper;
import org.jf.entity.News;

import java.util.List;
import java.util.Map;

@Mapper
public interface NewsDao {
	List<News> getForPage(Map map);
	
	List<News> getForIndex();
	
	News getByid(String id);
	
	
	void insert(News bean);
	
	void update(News bean);	
	
	void delete(int id);
	
	String conutNews();
	
}
