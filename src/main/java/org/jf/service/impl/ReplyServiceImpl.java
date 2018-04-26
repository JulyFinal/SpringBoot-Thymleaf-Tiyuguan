package org.jf.service.impl;


import org.jf.dao.ReplyDao;
import org.jf.entity.Reply;
import org.jf.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class ReplyServiceImpl implements ReplyService {
	@Autowired
	private ReplyDao dao;


	@Override
	public void insert(Reply b) {
		dao.insert(b);
	}

	@Override
	public void update(Reply b) {
		dao.update(b);
	}

	@Override
	public void delete(int id) {
		dao.delete(id);
	}
	

	@Override
	public List<Reply> getByparentid(String id) {
		// TODO Auto-generated method stub
		return dao.getByparentid(id);
	}

	@Override
	public List<Reply> getForPage(Map map) {
		// TODO Auto-generated method stub
		return dao.getForPage(map);
	}

	@Override
	public List<Reply> getForIndex() {
		// TODO Auto-generated method stub
		return dao.getForIndex();
	}

	@Override
	public Reply getByid(String id) {
		// TODO Auto-generated method stub
		return dao.getByid(id);
	}

	@Override
	public List<Reply> getByRootd(String id) {
		// TODO Auto-generated method stub
		return dao.getByRootd(id);
	}

	@Override
	public List<Reply> getAll() {
		// TODO Auto-generated method stub
		return dao.getAll();
	}
}
