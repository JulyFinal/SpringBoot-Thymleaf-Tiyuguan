package org.jf.dao;


import org.apache.ibatis.annotations.Mapper;
import org.jf.entity.Reply;

import java.util.List;
import java.util.Map;

@Mapper
public interface ReplyDao {

	List<Reply> getForPage(Map map);

	List<Reply> getForIndex();

	List<Reply> getAll();

	Reply getByid(String id);

	List<Reply> getByparentid(String id);

	List<Reply> getByRootd(String id);

	void insert(Reply b);

	void update(Reply b);

	void delete(int id);

}
