package org.jf.service;



import org.jf.entity.News;

import java.util.List;
import java.util.Map;

public interface NewsService {

	List<News> getNews(Map map);

	News getById(String id);


	void insertopt(News news);

	void updateopt(News news);

	void deleteopt(int id);

	String conutNews();
	
	
	List<News> getIndex();

}
