package org.jf.controller;

import com.common.paginate.Page;
import com.common.paginate.StringUitl;
import org.jf.entity.User;
import org.jf.service.UserService;
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
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;
	/**
	 * 列表
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
		List list = userService.getUser(map);
		//展示的数据
		request.setAttribute("list", list);
		request.setAttribute("paging", page.getPageStr());
		//查询条件显示
		return new ModelAndView("user/list");
	}
	/**
	 * 添加用户
	 */
	@RequestMapping("/add")
	public ModelAndView add(HttpServletRequest request, HttpServletResponse response) throws IOException {
		User user = new User();
		String no=request.getParameter("no");
		List<User> n=userService.ifExist(no);
		if (n.size()>0) {
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write("<script>alert('账户已存在');</script>");  
			response.getWriter().write("<script> window.location='../users/addUI' ;window.close();</script>");
			response.getWriter().flush(); 
			return new ModelAndView("user/add");
		}

		String pwd = request.getParameter("pwd");
		String tel = request.getParameter("tel");
		String email = request.getParameter("email");
		String name =request.getParameter("name");
		String age=request.getParameter("age");
		String birth=request.getParameter("date");
		String role = request.getParameter("role");
		user.setAge(age);
		user.setRole(role);
		user.setEmail(email);
		user.setPwd(pwd);
		user.setTel(tel);
		user.setNo(no);
		user.setBirth(birth);
		user.setName(name);
		userService.insertopt(user);
		return new ModelAndView("user/success");
	}
	/**
	 * 添加界面
	 */
	@RequestMapping("/addUI")
	public ModelAndView addUI(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("user/add");
	}
	/**
	 * 修改界面
	 */
	@RequestMapping("/editUI")
	public ModelAndView editUI(HttpServletRequest request, HttpServletResponse response) {
		String id=request.getParameter("id");
		System.out.println(id);
		User user=userService.getById(id);
		request.setAttribute("bean", user);
		return new ModelAndView("user/edit");
	}

	@RequestMapping("/edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) {
		String id=request.getParameter("id");
		System.out.println(id);
		User user=userService.getById(id);
		String tel = request.getParameter("tel");
		String email = request.getParameter("email");
		String name =request.getParameter("name");
		String age=request.getParameter("age");
		String birth=request.getParameter("date");
		String role = request.getParameter("role");
		user.setAge(age);
		user.setRole(role);
		user.setEmail(email);
		user.setTel(tel);
		user.setBirth(birth);
		user.setName(name);
		userService.updateopt(user);
		return new ModelAndView("user/success");
	}

	@RequestMapping("/delete")
	public ModelAndView delete(HttpServletRequest request, HttpServletResponse response) {
		String id=request.getParameter("id");
		int key =Integer.parseInt(id);
		userService.deleteopt(key);
		return new ModelAndView("user/success");
	}
}
