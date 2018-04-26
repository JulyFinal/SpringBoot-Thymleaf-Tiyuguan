package org.jf.service;



import org.jf.entity.Admin;

import java.util.List;
import java.util.Map;

public interface AdminService {

	List<Admin> getAdmin(Map map);
	
	List<Admin> ifExist(String no);
	
	Admin getById(String id);

	Admin checkAdminNo(String no, String pwd);

	boolean checkEmaiAndNo(String no, String email);
	
	void updatePwd(Admin admin); 
	
	void insertAdmin(Admin admin);
	
	void updateAdmin(Admin admin);

	void deleteAdmin(int id);
	
	String conutAdmin();

}
