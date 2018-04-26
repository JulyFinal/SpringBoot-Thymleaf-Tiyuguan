package org.jf.service.impl;


import org.jf.dao.NoticeDao;
import org.jf.entity.Notice;
import org.jf.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class NoticeServiceImpl implements NoticeService {
	@Autowired
	private NoticeDao noticedao;

	@Override
	public List<Notice> getNotice(Map map) {
		// TODO Auto-generated method stub
		return noticedao.getForPage(map);
	}

	@Override
	public String conutNotice() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Notice getById(String id) {
		// TODO Auto-generated method stub
		return noticedao.getByid(id);
	}

	@Override
	public void insertopt(Notice notice) {
		noticedao.insert(notice);
	}

	@Override
	public void updateopt(Notice notice) {
		noticedao.update(notice);
	}

	@Override
	public void deleteopt(int id) {
		noticedao.delete(id);
	}
	@Override
	public List<Notice> getIndex() {
		// TODO Auto-generated method stub
		return noticedao.getForIndex();
	}
}
