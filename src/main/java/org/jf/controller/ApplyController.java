package org.jf.controller;


import org.jf.entity.Apply;
import org.jf.entity.Changguan;
import org.jf.entity.Login;
import org.jf.service.ApplyService;
import org.jf.service.ChangguanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/apply")
public class ApplyController {

	@Autowired
	private ApplyService service;
	@Autowired
	private ChangguanService cheweiService;

	/************************************************************************************************************************************************
	个人申请
	 ************************************************************************************************************************************************/
	// 申请
	@RequestMapping("/add")
	public void add(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws IOException {
		String starttime=request.getParameter("starttime");
		String endtime=request.getParameter("endtime");
		String cid= request.getParameter("cid");
		Apply bean = new Apply();
		Login login= (Login) httpSession.getAttribute("login");
		if (login==null) {
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write("<script>alert('会话过期，请重新登录');</script>");  
			response.getWriter().write("<script> top.location='../login/loginUI' ;window.close();</script>");
			response.getWriter().flush(); 
		}
		Date dt=new Date();
		SimpleDateFormat matter1=new SimpleDateFormat("yyyy-MM-dd hh:MM:ss");
		String date = matter1.format(dt);

		Changguan cw=cheweiService.getByid(cid);
		bean.setTime(date);
		bean.setUid(login.getId());
		bean.setName(login.getName());
		bean.setState("申请中");
		bean.setChewei(cw.getNo());
		bean.setCid(Integer.parseInt(cid));
		bean.setStarttime(starttime);
		bean.setEndtime(endtime);
		service.insertopt(bean);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().write("<script>alert('操作成功');</script>");  
		response.getWriter().write("<script> window.location='../apply/mylist' ;window.close();</script>");
		response.getWriter().flush(); 
	}
	// 申请界面
	@RequestMapping("/addUI")
	public ModelAndView addUI(HttpServletRequest request, HttpServletResponse response) {
		List<Changguan> list = cheweiService.getAll();
		request.setAttribute("list", list);
		return new ModelAndView("apply/add");
	}
	// 申请界面
	@RequestMapping("/mylist")
	public ModelAndView mylist(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws IOException {
		Login login= (Login) httpSession.getAttribute("login");
		if (login==null) {
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write("<script>alert('会话过期，请重新登录');</script>");  
			response.getWriter().write("<script> top.location='../login/loginUI' ;window.close();</script>");
			response.getWriter().flush(); 
			return new ModelAndView("login");
		}
		List<Apply> list = service.getMyList(login.getId()+"");
		request.setAttribute("list", list);
		return new ModelAndView("apply/mylist");
	} 
	/************************************************************************************************************************************************
				申请审核
	 ************************************************************************************************************************************************/
	// 待审核
	@RequestMapping("/deallist")
	public ModelAndView deallist(HttpServletRequest request, HttpServletResponse response) {
		List<Apply> list=service.getNeedList();
		request.setAttribute("list", list);
		return new ModelAndView("apply/deallist");
	}

	@RequestMapping("/confirmlist")
	public ModelAndView clist(HttpServletRequest request, HttpServletResponse response) {
		List<Apply> list = service.getConfirmedList();
		request.setAttribute("list", list);
		return new ModelAndView("apply/clist");
	} 
	//打开审核页面
	@RequestMapping("/editUI")
	public ModelAndView editUI(HttpServletRequest request, HttpServletResponse response) {
		String id=request.getParameter("id");
		Apply bean =service.getByid(id);
		System.out.println(bean.getId());
		request.setAttribute("bean", bean);
		return new ModelAndView("apply/edit");
	}
	@RequestMapping("/edit")
	public void edit(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String id=request.getParameter("id");
		Apply bean =service.getByid(id);
		System.out.println(bean.getId());
		String state=request.getParameter("state");
		if (state.equals("确认")) {
			Changguan cw=cheweiService.getByid(bean.getCid()+"");
			cw.setState("确认");
			cheweiService.update(cw);
		}
		bean.setState(state);
		service.updateopt(bean);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().write("<script>alert('操作成功');</script>");  
		response.getWriter().write("<script> window.location='../apply/confirmlist' ;window.close();</script>");
		response.getWriter().flush(); 
	}

	/************************************************************************************************************************************************
				审核管理
	 ************************************************************************************************************************************************/


	//列表
	@RequestMapping("/list")
	public ModelAndView list(HttpServletRequest request, HttpServletResponse response) {
		List<Apply> list = service.getList();
		request.setAttribute("list", list);
		return new ModelAndView("apply/list");
	} 
	@RequestMapping("/delete")
	public void delete(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String id=request.getParameter("id");
		int key =Integer.parseInt(id);
		service.deleteopt(key);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().write("<script>alert('操作成功');</script>");  
		response.getWriter().write("<script> window.location='../apply/list' ;window.close();</script>");
		response.getWriter().flush(); 
	}
}
