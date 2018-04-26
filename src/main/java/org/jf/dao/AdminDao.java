package org.jf.dao;



import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.jf.entity.Admin;

import java.util.List;
import java.util.Map;

@Mapper
public interface AdminDao {
	List<Admin> getForPage(Map map);
	
	List<Admin> checkExist(String no);
	
	Admin getByid(String id);

	Admin checkAdmin(@Param("no") String no, @Param("pwd") String pwd);

	List<Admin>  checkAdminEmail(@Param("no") String no, @Param("email") String email);
	
	void changeAdminPwd(Admin admin);
	
	void insert(Admin admin);
	
	void update(Admin admin);
	
	void delete(int id);
	
	String conutAdmin();
	
}
