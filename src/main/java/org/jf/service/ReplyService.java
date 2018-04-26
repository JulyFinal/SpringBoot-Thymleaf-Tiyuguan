package org.jf.service;


import org.jf.entity.Reply;

import java.util.List;
import java.util.Map;

public interface ReplyService {
	
	List<Reply> getForPage(Map map);
	
	List<Reply> getForIndex();
	
	Reply getByid(String id);

	List<Reply> getAll();

	List<Reply> getByparentid(String id);

	List<Reply> getByRootd(String id);
	
	void insert(Reply b);
	
	void update(Reply b);	
	
	void delete(int id);
}
