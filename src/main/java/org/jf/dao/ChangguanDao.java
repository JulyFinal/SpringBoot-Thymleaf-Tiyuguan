package org.jf.dao;


import org.apache.ibatis.annotations.Mapper;
import org.jf.entity.Changguan;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChangguanDao  {
	List<Changguan> getForPage(Map map);
	
	List<Changguan> getForIndex();
	
	List<Changguan> getAll();
	
	List<Changguan> getUsedList();
	
	List<Changguan> getEmptyList();
	
	Changguan getByid(String id);

	void insert(Changguan bean);
	
	void update(Changguan bean);
	
	void delete(int id);
	
	String conutCname();
}
