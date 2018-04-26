package org.jf.dao;

import org.apache.ibatis.annotations.Mapper;
import org.jf.entity.Blog;

import java.util.List;
import java.util.Map;

@Mapper
public interface BlogDao {
	List<Blog> getForPage(Map map);

	List<Blog> getAll();
	
	List<Blog> getForIndex();

	Blog getByid(String id);

	List<Blog> getByUid(String id);
	List<Blog> getByPid(String id);

	void insert(Blog bean);

	void update(Blog bean);	

	void delete(int id);

	String conutBlog();

}
