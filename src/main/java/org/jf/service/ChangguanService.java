package org.jf.service;


import org.jf.entity.Changguan;

import java.util.List;
import java.util.Map;


public interface ChangguanService   {
	List<Changguan> getForPage(Map map);
	
	List<Changguan> getAll();

	List<Changguan> getForIndex();

	Changguan getByid(String id);

	List<Changguan> getUsedList();
	
	List<Changguan> getEmptyList();
	
	void insert(Changguan bean);

	void update(Changguan bean);	

	void delete(int id);

	String conutChewei();
}
