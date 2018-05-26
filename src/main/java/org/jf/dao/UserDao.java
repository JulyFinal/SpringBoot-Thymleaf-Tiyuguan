package org.jf.dao;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.jf.entity.User;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserDao {
    List<User> getUserForPage(Map map);

    List<User> checkExist(String no);

    User checkUser(@Param("no") String no, @Param("pwd") String pwd);

    User getByid(String id);

    List<User> checkUserEmail(String no, String email);

    void changeUserPwd(User user);

    void insert(User user);

    void update(User user);

    void delete(int id);

    String conutUser();

    List<User> getAll();
}
