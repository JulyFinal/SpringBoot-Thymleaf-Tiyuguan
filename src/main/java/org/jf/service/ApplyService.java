package org.jf.service;



import org.jf.entity.Apply;

import java.util.List;

public interface ApplyService {

	Apply getByid(String id);

	List<Apply> getList();

	void insertopt(Apply bean);

	void updateopt(Apply bean);

	void deleteopt(int id);

	List<Apply> getMyList(String uid);

	List<Apply> getNeedList();

	List<Apply> getConfirmedList();

	boolean checkExt(Apply bean);

	String conutNotice();
	List<Apply> getByUid(String id);
	List<Apply> getApplyFromCid(long cid);

}
