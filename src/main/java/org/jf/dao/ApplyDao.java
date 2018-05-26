package org.jf.dao;



import org.apache.ibatis.annotations.Mapper;
import org.jf.entity.Apply;

import java.util.List;

@Mapper
public interface ApplyDao {

	List<Apply> getList();

	List<Apply> getMyList(String uid);

	List<Apply> getNeedList();

	List<Apply> getConfirmedList();

	List<Apply> checkExist();

	Apply getByid(String id);

	void insert(Apply bean);

	void update(Apply bean);

	void delete(int id);

	String conutNotice();

	List<Apply> getByUid(String id);

	List<Apply> getApplyFromCid(long id);

}
