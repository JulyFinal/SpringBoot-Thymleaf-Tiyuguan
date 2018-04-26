package org.jf.service;



import org.jf.entity.Blog;

import java.util.List;
import java.util.Map;


public interface BlogService   {
	List<Blog> getForPage(Map map);
	
	List<Blog> getAll();

	List<Blog> getForIndex();

	Blog getByid(String id);

	List<Blog>  getByUid(String id);

	void insert(Blog bean);

	void update(Blog bean);	

	void delete(int id);

	String conutBlog();
}
