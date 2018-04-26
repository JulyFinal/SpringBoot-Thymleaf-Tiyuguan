package org.jf.service;



import org.jf.entity.User;

import java.util.List;
import java.util.Map;

public interface UserService {

	List<User> getUser(Map map);
	List<User> getAll();

	User checkUserNo(String no, String pwd);

	List<User> ifExist(String no);

	User getById(String id);

	boolean checkEmaiAndNo(String no, String email);

	void updatePwd(User user); 

	void insertopt(User user);

	void updateopt(User user);

	void deleteopt(int id);

	String conutUser();

}
