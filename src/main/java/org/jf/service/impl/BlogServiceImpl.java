package org.jf.service.impl;


import org.jf.dao.BlogDao;
import org.jf.entity.Blog;
import org.jf.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class BlogServiceImpl implements BlogService {
	@Autowired
	private BlogDao dao;

	@Override
	public List<Blog> getForPage(Map map) {
		// TODO Auto-generated method stub
		return dao.getForPage(map);
	}

	@Override
	public List<Blog> getAll() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}

	@Override
	public List<Blog> getForIndex() {
		// TODO Auto-generated method stub
		return dao.getForIndex();
	}

	@Override
	public Blog getByid(String id) {
		// TODO Auto-generated method stub
		return dao.getByid(id);
	}

	@Override
	public void insert(Blog bean) {
		// TODO Auto-generated method stub
		dao.insert(bean);
	}

	@Override
	public void update(Blog bean) {
		// TODO Auto-generated method stub
		dao.update(bean);
	}

	@Override
	public void delete(int id) {
		// TODO Auto-generated method stub
		dao.delete(id);
	}

	@Override
	public String conutBlog() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public 	List<Blog> getByUid(String id) {
		// TODO Auto-generated method stub
		return dao.getByUid(id);
	}
	
	
}
