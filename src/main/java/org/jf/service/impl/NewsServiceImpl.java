package org.jf.service.impl;


import org.jf.dao.NewsDao;
import org.jf.entity.News;
import org.jf.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class NewsServiceImpl implements NewsService {
	@Autowired
	private NewsDao newsdao;

	@Override
	public List<News> getNews(Map map) {
		// TODO Auto-generated method stub
		return newsdao.getForPage(map);
	}

	@Override
	public String conutNews() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public News getById(String id) {
		// TODO Auto-generated method stub
		return newsdao.getByid(id);
	}

	@Override
	public void insertopt(News news) {
		newsdao.insert(news);
	}

	@Override
	public void updateopt(News news) {
		newsdao.update(news);
	}

	@Override
	public void deleteopt(int id) {
		newsdao.delete(id);
	}
	
	@Override
	public List<News> getIndex() {
		// TODO Auto-generated method stub
		return newsdao.getForIndex();
	}
}
