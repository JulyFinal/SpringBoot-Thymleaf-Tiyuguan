package org.jf.controller;


import org.jf.entity.Changguan;
import org.jf.service.ChangguanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/changguan")
public class ChangguanController {

	@Autowired
	private ChangguanService service;

	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public ModelAndView Notice(HttpServletRequest request, HttpServletResponse response) {
		List<Changguan> list= service.getAll();
		request.setAttribute("list", list);
		return new ModelAndView("changguan/list");
	}
	
	/**
	 * 列表
	 */
	@RequestMapping("/emptylist")
	public ModelAndView emptylist(HttpServletRequest request, HttpServletResponse response) {
		List<Changguan> list= service.getEmptyList();
		request.setAttribute("list", list);
		System.out.println(list.size());
		return new ModelAndView("changguan/emptylist");
	}
	
	
	/**
	 * 列表
	 */
	@RequestMapping("/usedlist")
	public ModelAndView usedlist(HttpServletRequest request, HttpServletResponse response) {
		List<Changguan> list= service.getUsedList();
		request.setAttribute("list", list);
		return new ModelAndView("changguan/usedlist");
	}
	/**
	 * 添加
	 */
	@RequestMapping("/add")
	public void add(HttpServletRequest request, HttpServletResponse response, MultipartFile file)  throws IOException {
		String url="";
		if(!file.isEmpty()) {
			//上传文件路径
			String path = request.getRealPath("/upload/");
			System.out.println(path);
			//上传文件名
			String filename = file.getOriginalFilename();
			File filepath = new File(path,filename);
			if (!filepath.getParentFile().exists()) { 
				filepath.getParentFile().mkdirs();
			}
			//将上传文件保存到一个目标文件当中
			file.transferTo(new File(path + File.separator + filename));
			url+="upload/"+filename;
		}  
		Changguan bean= new Changguan();
		bean.setType(request.getParameter("type"));
		bean.setTel(request.getParameter("tel"));
		bean.setState("空");
		bean.setName(request.getParameter("name"));
		bean.setUrls(url);
		bean.setAddress(request.getParameter("address"));
		bean.setNo(request.getParameter("no"));
		service.insert(bean);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().write("<script>alert('操作成功');</script>");  
		response.getWriter().write("<script> window.location='../changguan/list' ;window.close();</script>");
		response.getWriter().flush(); 
	}
	
	/**
	 * 添加界面
	 */
	@RequestMapping("/addUI")
	public ModelAndView addUI(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("changguan/add");
	}
	
	/**
	 * 修改界面
	 */
	@RequestMapping("/editUI")
	public ModelAndView editUI(HttpServletRequest request, HttpServletResponse response) {
		String id=request.getParameter("id");
		Changguan bean= service.getByid(id);
		request.setAttribute("bean", bean);
		return new ModelAndView("changguan/edit");
	}

	@RequestMapping("/edit")
	public void edit(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String id=request.getParameter("id");
		Changguan bean= service.getByid(id);
		bean.setState(request.getParameter("state"));
		bean.setTel(request.getParameter("tel"));
		bean.setName(request.getParameter("name"));
		bean.setNo(request.getParameter("no"));
		bean.setAddress(request.getParameter("address"));
		bean.setType(request.getParameter("type"));
		service.update(bean);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().write("<script>alert('操作成功');</script>");  
		response.getWriter().write("<script> window.location='../changguan/list' ;window.close();</script>");
		response.getWriter().flush(); 
	}


	@RequestMapping("/delete")
	public void delete(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String id=request.getParameter("id");
		int key =Integer.parseInt(id);
		service.delete(key);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().write("<script>alert('操作成功');</script>");  
		response.getWriter().write("<script> window.location='../changguan/list' ;window.close();</script>");
		response.getWriter().flush(); 	
	}
}
