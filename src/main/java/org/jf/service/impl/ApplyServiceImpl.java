package org.jf.service.impl;


import org.jf.dao.ApplyDao;
import org.jf.entity.Apply;
import org.jf.service.ApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ApplyServiceImpl implements ApplyService {
	@Autowired
	private ApplyDao dao;

	@Override
	public List<Apply> getList() {
		// TODO Auto-generated method stub
		return dao.getList();
	}

	@Override
	public void insertopt(Apply bean) {
		// TODO Auto-generated method stub
		dao.insert(bean);
	}

	@Override
	public void updateopt(Apply bean) {
		// TODO Auto-generated method stub
		dao.update(bean);
	}

	@Override
	public void deleteopt(int id) {
		// TODO Auto-generated method stub
		dao.delete(id);
	}

	@Override
	public String conutNotice() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Apply getByid(String id) {
		// TODO Auto-generated method stub
		return dao.getByid(id);
	}

	@Override
	public List<Apply> getMyList(String uid) {
		// TODO Auto-generated method stub
		return dao.getMyList(uid);
	}

	@Override
	public List<Apply> getNeedList() {
		// TODO Auto-generated method stub
		return dao.getNeedList();
	}

	@Override
	public List<Apply> getConfirmedList() {
		// TODO Auto-generated method stub
		return dao.getConfirmedList();
	}

	@Override
	public boolean checkExt(Apply bean) {
		// TODO Auto-generated method stub
		List<Apply> list= dao.checkExist();
		if (list.size()==0) {
			return true;
		}else{
			return false;
		}
	}

	@Override
	public List<Apply> getByUid(String id) {
		// TODO Auto-generated method stub
		return dao.getByUid(id);
	}

	@Override
	public List<Apply> getApplyFromCid(long cid) {
		List<Apply> list=dao.getApplyFromCid(cid);
		return list;
	}
}
