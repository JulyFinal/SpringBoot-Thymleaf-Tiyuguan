package org.jf.controller;


import org.jf.entity.*;
import org.jf.service.AdminService;
import org.jf.service.NewsService;
import org.jf.service.NoticeService;
import org.jf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/basic")
public class BasicController {
	@Autowired
	private UserService userService;
	@Autowired
	private AdminService adminService;
	@Autowired
	private NoticeService noticeService;
	@Autowired
	private NewsService newsService;
	/**
	 * index
	 */
	@RequestMapping("/templates/index")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {
		List<Notice> nlist= noticeService.getIndex();
		List<News> mlist= newsService.getIndex();
		request.setAttribute("nlist", nlist);
		request.setAttribute("mlist", mlist);
		return new ModelAndView("basic/main");
	}
	
	/**
	 * 资料修改UI
	 * @throws IOException 
	 */
	@RequestMapping("/changeUI")
	public ModelAndView left(HttpServletRequest request, HttpServletResponse response , HttpSession httpSession) throws IOException {
		Login login= (Login) httpSession.getAttribute("login");
		if (login==null) {
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write("<script>alert('会话过期，请重新登录');</script>");  
			response.getWriter().write("<script> top.location='../login/loginUI' ;window.close();</script>");
			response.getWriter().flush(); 
			return new ModelAndView("login");
		}
		System.out.println(login.getId());
		if (login.getRole().equals("admin")) {
			Admin admin=adminService.getById(login.getId()+"");
			System.out.println(admin.getNo());
			request.setAttribute("bean", admin);
			return new ModelAndView("basic/adminchange");
		}else{
			User user=userService.getById(login.getId()+"");
			System.out.println(user.getNo());
			request.setAttribute("bean", user);
			return new ModelAndView("basic/userchange");
		}
	}
	/**
	 *	管理员权限资料修改 
	 * @return
	 */
	@RequestMapping("/achange")
	public ModelAndView achange(HttpServletRequest request, HttpServletResponse response) {
		String id=request.getParameter("id");
		Admin admin=adminService.getById(id);
		String tel = request.getParameter("tel");
		String email = request.getParameter("email");
		String name = request.getParameter("name");
		admin.setEmail(email);
		admin.setTel(tel);
		admin.setName(name);
		adminService.updateAdmin(admin);
		return new ModelAndView("basic/success");
	}
	/**
	 *	用户权限资料修改 
	 * @return
	 */
	@RequestMapping("/uchange")
	public ModelAndView uchange(HttpServletRequest request, HttpServletResponse response) {
		String id=request.getParameter("id");
		User user=userService.getById(id);
		String pwd = request.getParameter("pwd");
		String tel = request.getParameter("tel");
		String email = request.getParameter("email");
		String age = request.getParameter("age");
		String birth =request.getParameter("birth");
		String name = request.getParameter("name");
		user.setEmail(email);
		user.setPwd(pwd);
		user.setTel(tel);
		user.setAge(age);
		user.setBirth(birth);
		user.setName(name);
		user.setTel(tel);
		userService.updateopt(user);
		return new ModelAndView("basic/success");
	}
	
	/**
	 * 密码修改UI
	 */
	@RequestMapping("/pwdUI")
	public ModelAndView main(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("basic/pwd");
	}
	/**
	 * 密码修改
	 */
	@RequestMapping("/changepwd")
	public ModelAndView changepwd(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws IOException {
		String pwd= request.getParameter("password");
		String email =request.getParameter("email");
		Login login= (Login) httpSession.getAttribute("login");
		System.out.println(login.getEmail()+" ");
		if (login==null) {
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write("<script>alert('会话过期，请重新登录');</script>");  
			response.getWriter().write("<script> top.location='../login/loginUI' ;window.close();</script>");
			response.getWriter().flush(); 
			return new ModelAndView("login");
		}
		System.out.println(login.getId());
		if (login.getRole().equals("admin")) {
			Admin admin = adminService.getById(login.getId()+"");
			System.out.println(admin.getNo()+" "+admin.getEmail());
			boolean  flag = adminService.checkEmaiAndNo(admin.getNo(),email);
			if (flag) {
				admin.setPwd(pwd);
				adminService.updatePwd(admin);
			}else{
				response.setContentType("text/html;charset=utf-8");
				response.getWriter().write("<script>alert('输入信息不符，请重新输入');</script>");  
				response.getWriter().write("<script> window.location='../basic/pwdUI' ;window.close();</script>");
				response.getWriter().flush(); 
			}
		}else{
			User user = userService.getById(""+login.getId());
			boolean flag = userService.checkEmaiAndNo(user.getNo(),email);
			if (flag) {
				user.setPwd(pwd);
				userService.updatePwd(user);
			}else{
				response.setContentType("text/html;charset=utf-8");
				response.getWriter().write("<script>alert('输入信息不符，请重新输入');</script>");  
				response.getWriter().write("<script> window.location='../basic/pwdUI' ;window.close();</script>");
				response.getWriter().flush(); 
			}
		}

		return new ModelAndView("basic/success");
	}
}
