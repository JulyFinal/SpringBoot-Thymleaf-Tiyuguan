package org.jf.service.impl;



import org.jf.dao.AdminDao;
import org.jf.entity.Admin;
import org.jf.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminDao admindao;

	@Override
	public List<Admin> getAdmin(Map map) {
		// TODO Auto-generated method stub
		return admindao.getForPage(map);
	}

	@Override
	public List<Admin> ifExist(String no) {
		// TODO Auto-generated method stub
		return admindao.checkExist(no);
	}

	@Override
	public Admin checkAdminNo(String no, String pwd) {
		return admindao.checkAdmin(no, pwd);
	}

	@Override
	public String conutAdmin() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Admin getById(String id) {
		// TODO Auto-generated method stub
		return admindao.getByid(id);
	}


	public void insertAdmin(Admin admin) {
		admindao.insert(admin);
	}


	public void updateAdmin(Admin admin) {
		admindao.update(admin);
	}

	@Override
	public void deleteAdmin(int id) {
		admindao.delete(id);
	}
	
	@Override
	public boolean checkEmaiAndNo(String no,String email) {
		// TODO Auto-generated method stub
		List<Admin> list=admindao.checkAdminEmail(no,email);
		if (list.size()!=0) {
			return true;
		}else{
			return false;
		}
	}

	public void updatePwd(Admin admin) {
		// TODO Auto-generated method stub
		admindao.changeAdminPwd(admin);
	}
}
