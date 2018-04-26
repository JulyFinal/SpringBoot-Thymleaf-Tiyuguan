package org.jf.service.impl;


import org.jf.dao.ChangguanDao;
import org.jf.entity.Changguan;
import org.jf.service.ChangguanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class ChangguanServiceImpl implements ChangguanService {
	@Autowired
	private ChangguanDao dao;

	@Override
	public List<Changguan> getForPage(Map map) {
		// TODO Auto-generated method stub
		return dao.getForPage(map);
	}

	@Override
	public List<Changguan> getAll() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}

	@Override
	public List<Changguan> getForIndex() {
		// TODO Auto-generated method stub
		return dao.getForIndex();
	}

	@Override
	public Changguan getByid(String id) {
		// TODO Auto-generated method stub
		return dao.getByid(id);
	}

	@Override
	public void insert(Changguan bean) {
		// TODO Auto-generated method stub
		dao.insert(bean);
	}

	@Override
	public void update(Changguan bean) {
		// TODO Auto-generated method stub
		dao.update(bean);
	}

	@Override
	public void delete(int id) {
		// TODO Auto-generated method stub
		dao.delete(id);
	}

	@Override
	public String conutChewei() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Changguan> getUsedList() {
		// TODO Auto-generated method stub
		return dao.getUsedList();
	}

	@Override
	public List<Changguan> getEmptyList() {
		// TODO Auto-generated method stub
		return dao.getEmptyList();
	}
	
	
}
