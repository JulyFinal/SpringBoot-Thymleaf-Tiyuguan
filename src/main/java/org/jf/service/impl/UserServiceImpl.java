package org.jf.service.impl;


import org.jf.dao.UserDao;
import org.jf.entity.User;
import org.jf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userdao;

	@Override
	public List<User> getUser(Map map) {
		// TODO Auto-generated method stub
		return userdao.getUserForPage(map);
	}

	@Override
	public List<User> ifExist(String no) {
		// TODO Auto-generated method stub
		return userdao.checkExist(no);
	}

	@Override
	public User checkUserNo(String no, String pwd) {
		return userdao.checkUser(no, pwd);
	}

	@Override
	public String conutUser() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public User getById(String id) {
		// TODO Auto-generated method stub
		return userdao.getByid(id);
	}

	@Override
	public void insertopt(User user) {
		userdao.insert(user);
	}

	@Override
	public void updateopt(User user) {
		userdao.update(user);
	}

	@Override
	public void deleteopt(int id) {
		userdao.delete(id);
	}
	
	@Override
	public boolean checkEmaiAndNo(String no,String email) {
		// TODO Auto-generated method stub
		List<User> list= userdao.checkUserEmail(no,email);
		if (list.size()!=0) {
			return true;
		}else{
			return false;
		}
	}
	@Override
	public void updatePwd(User user) {
		// TODO Auto-generated method stub
		userdao.changeUserPwd(user);
	}

	@Override
	public List<User> getAll() {
		// TODO Auto-generated method stub
		return userdao.getAll();
	}
}
