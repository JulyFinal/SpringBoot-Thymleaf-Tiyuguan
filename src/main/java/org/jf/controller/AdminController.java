package org.jf.controller;

import com.common.paginate.Page;
import com.common.paginate.StringUitl;
import org.jf.entity.Admin;
import org.jf.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	/**
	 */
	@RequestMapping("/list")
	public ModelAndView user(HttpServletRequest request, HttpServletResponse response) {
		Page page = new Page("filter_form");
		String currentPage = request.getParameter("page.currentPage");
		if (StringUitl.IsNotNull(currentPage)) {
			page.setCurrentPage(Integer.parseInt(currentPage));
		}
		//拼装map进行查询
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("page", page);
		List list = adminService.getAdmin(map);
		//展示的数据
		request.setAttribute("list", list);
		request.setAttribute("paging", page.getPageStr());
		//查询条件显示
		return new ModelAndView("admin/list");
	}

	@RequestMapping("/editUI")
	public ModelAndView editUI(HttpServletRequest request, HttpServletResponse response) {
		String id=request.getParameter("id");
		System.out.println(id);
		Admin admin=adminService.getById(id);
		System.out.println(admin.getNo());
		request.setAttribute("bean", admin);
		return new ModelAndView("admin/edit");
	}

	@RequestMapping("/edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) {
		String id=request.getParameter("id");
		Admin admin=adminService.getById(id);
		String pwd = request.getParameter("pwd");
		String tel = request.getParameter("tel");
		String email = request.getParameter("email");
		String name = request.getParameter("name");
		admin.setEmail(email);
		admin.setPwd(pwd);
		admin.setTel(tel);
		admin.setName(name);
		adminService.updateAdmin(admin);
		return new ModelAndView("admin/success");
	}

	@RequestMapping("/add")
	public ModelAndView add(HttpServletRequest request, HttpServletResponse response) throws IOException {
		Admin admin = new Admin();
		String no=request.getParameter("no");
		List<Admin> n=adminService.ifExist(no);
		if (n.size()>0) {
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write("<script>alert('账户已存在');</script>");  
			response.getWriter().write("<script> window.location='../admin/addUI' ;window.close();</script>");
			response.getWriter().flush(); 
			return new ModelAndView("admin/add");
		}
		String name = request.getParameter("name");
		String pwd = request.getParameter("pwd");
		String tel = request.getParameter("tel");
		String email = request.getParameter("email");
		admin.setEmail(email);
		admin.setPwd(pwd);
		admin.setTel(tel);
		admin.setName(name);
		admin.setNo(no);
		adminService.insertAdmin(admin);
		return new ModelAndView("admin/success");
	}
	
	@RequestMapping("/addUI")
	public ModelAndView addUI(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("admin/add");
	}
	
		@RequestMapping("/delete")
	public ModelAndView delete(HttpServletRequest request, HttpServletResponse response) {
		String id=request.getParameter("id");
		int key =Integer.parseInt(id);
		adminService.deleteAdmin(key);
		return new ModelAndView("admin/success");
	}
}
