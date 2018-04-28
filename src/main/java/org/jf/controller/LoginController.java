package org.jf.controller;

import org.jf.entity.*;
import org.jf.service.AdminService;
import org.jf.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 登陆控件
 */
@Controller
@RequestMapping("/login")
public class LoginController {
	@Autowired
	private UserService userService;
	@Autowired
	private AdminService adminService;
	
	
	/**
	 * 登录界面
	 */
	@RequestMapping("/loginUI")
	public ModelAndView loginUI(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("login");
	}
	/**
	/**
	 * 左侧菜单
	 */
	@RequestMapping("/left")
	public ModelAndView left(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("main/left");
	}
	/**
	 * 主要部分
	 */
	@RequestMapping("/main")
	public ModelAndView main(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("main/main");
	}
	/**
	 *头部 
	 */
	@RequestMapping("/head")
	public ModelAndView head(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("main/head");
	}
	/**
	 * @throws IOException 
	 * 
	 */
	@RequestMapping("/login")
	public ModelAndView login(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws IOException {
		List<Menu>  mlist= new ArrayList<Menu>();
		String pwd = request.getParameter("pwd");
		String no = request.getParameter("no");
		String role =request.getParameter("type");
		response.setCharacterEncoding("utf-8"); 
		Login login= (Login) httpSession.getAttribute("login");
		if (login==null) {
			if (role==null) {
				response.setContentType("text/html;charset=utf-8");
				response.getWriter().write("<script>alert('会话过期，请重新登陆！');</script>");  
				response.getWriter().write("<script> window.location='../login/loginUI' ;window.close();</script>");
				response.getWriter().flush();
			}
			if (role.equals("admin")) {
				Admin admin=adminService.checkAdminNo(no, pwd);
				if (admin==null) {
					response.setContentType("text/html;charset=utf-8");
					response.getWriter().write("<script>alert('账号密码错误');</script>");  
					response.getWriter().write("<script> window.location='../login/loginUI' ;window.close();</script>");
					response.getWriter().flush(); 
					return new ModelAndView("login");
				}
				login = new Login(admin.getId(), admin.getName(), "admin",admin.getEmail());
				httpSession.setAttribute("login",login);
			}else{
				User user=userService.checkUserNo(no, pwd);
				if (user==null) {
					response.setContentType("text/html;charset=utf-8");
					response.getWriter().write("<script>alert('账号密码错误');</script>");  
					response.getWriter().write("<script> window.location='../login/loginUI' ;window.close();</script>");
					response.getWriter().flush(); 
					return new ModelAndView("login");
				}
				login = new Login(user.getId(), user.getName(), user.getRole(),user.getEmail());
				httpSession.setAttribute("login",login);
			}
		}
		if (login.getRole().equals("admin")) {
			//系统管理
			List<ChildMenu> clist1 = new ArrayList<ChildMenu>();
			ChildMenu cm11= new ChildMenu("新增管理员", "../admin/addUI");
			ChildMenu cm12= new ChildMenu("管理员列表", "../admin/list");
			ChildMenu cm13= new ChildMenu("新增用户", "../users/addUI");
			ChildMenu cm14= new ChildMenu("用户管理", "../users/list");
			clist1.add(cm11);
			clist1.add(cm12);
			clist1.add(cm13);
			clist1.add(cm14);
			Menu m1= new Menu("系统管理",clist1.size(),clist1);
			//资讯管理
			List<ChildMenu> clist2 = new ArrayList<ChildMenu>();
			ChildMenu cm21= new ChildMenu("添加公告", "../notice/addUI");
			ChildMenu cm22= new ChildMenu("公告管理", "../notice/list");
			ChildMenu cm23= new ChildMenu("新增新闻", "../news/addUI");
			ChildMenu cm24= new ChildMenu("新闻管理", "../news/list");
			ChildMenu cm25= new ChildMenu("帖子新增", "../blog/addUI");
			ChildMenu cm26= new ChildMenu("帖子管理", "../blog/list");
			clist2.add(cm21);
			clist2.add(cm22);
			clist2.add(cm23);
			clist2.add(cm24);
			clist2.add(cm25);
			clist2.add(cm26);
			Menu m2= new Menu("信息管理",clist2.size(),clist2);
			
			List<ChildMenu> clist3 = new ArrayList<ChildMenu>();
			ChildMenu cm31= new ChildMenu("添加场馆", "../changguan/addUI");
			ChildMenu cm32= new ChildMenu("场馆管理", "../changguan/list");
			ChildMenu cm35= new ChildMenu("空场馆", "../changguan/emptylist");
			ChildMenu cm36= new ChildMenu("已用场馆", "../changguan/usedlist");
			ChildMenu cm33= new ChildMenu("场馆预约", "../apply/deallist");
			ChildMenu cm34= new ChildMenu("预约列表", "../apply/list");
			clist3.add(cm31);
			clist3.add(cm32);
			clist3.add(cm35);
			clist3.add(cm36);
			clist3.add(cm33);
			clist3.add(cm34);
			Menu m3= new Menu("场馆管理",clist3.size(),clist3);
			List<ChildMenu> clistn = new ArrayList<ChildMenu>();
			ChildMenu cmn1 = new ChildMenu("个人资料修改", "../basic/changeUI");
			ChildMenu cmn2 = new ChildMenu("密码修改", "../basic/pwdUI");
			clistn.add(cmn1);
			clistn.add(cmn2);
			Menu mn= new Menu("个人中心", clistn.size(),clistn);
			mlist.add(m1);
			mlist.add(m2);
			mlist.add(m3);
			mlist.add(mn);
		}
		request.setAttribute("menulist", mlist);
		return new ModelAndView("main/index");
	}
	@RequestMapping("/logout")
	public ModelAndView logout(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws IOException {
		httpSession.removeAttribute("login");
		return new ModelAndView("login");
	}
}
