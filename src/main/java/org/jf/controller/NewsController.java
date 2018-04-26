package org.jf.controller;

import com.common.paginate.Page;
import com.common.paginate.StringUitl;
import org.jf.entity.News;
import org.jf.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/news")
public class NewsController {

	@Autowired
	private NewsService newsService;
	
	
	@RequestMapping("/newslist")
	public ModelAndView newslist(HttpServletRequest request, HttpServletResponse response) {
		Page page = new Page("filter_form");
		String currentPage = request.getParameter("page.currentPage");
		if (StringUitl.IsNotNull(currentPage)) {
			page.setCurrentPage(Integer.parseInt(currentPage));
		}
		//拼装map进行查询
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("page", page);
		List list = newsService.getNews(map);
		//展示的数据
		request.setAttribute("list", list);
		request.setAttribute("paging", page.getPageStr());
		//查询条件显示
		return new ModelAndView("news/newslist");
	}
	
	@RequestMapping("/view")
	public ModelAndView view(HttpServletRequest request, HttpServletResponse response) {
		String id=request.getParameter("id");
		System.out.println(id);
		News news=newsService.getById(id);
		request.setAttribute("bean", news);
		return new ModelAndView("news/info");
	}
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	public ModelAndView News(HttpServletRequest request, HttpServletResponse response) {
		Page page = new Page("filter_form");
		String currentPage = request.getParameter("page.currentPage");
		if (StringUitl.IsNotNull(currentPage)) {
			page.setCurrentPage(Integer.parseInt(currentPage));
		}
		//拼装map进行查询
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("page", page);
		List list = newsService.getNews(map);
		//展示的数据
		request.setAttribute("list", list);
		request.setAttribute("paging", page.getPageStr());
		//查询条件显示
		return new ModelAndView("news/list");
	}
	/**
	 * 添加用户
	 */
	@RequestMapping("/add")
	public ModelAndView add(HttpServletRequest request, HttpServletResponse response) throws IOException {
		News news = new News();
		String title=request.getParameter("title");
		String infos=request.getParameter("infos");
		news.setTitle(title);
		news.setInfos(infos);
		Date dt=new Date();
	    SimpleDateFormat matter1=new SimpleDateFormat("yyyy-MM-dd hh:MM:ss");
	    String date = matter1.format(dt);
	    news.setTime(date);
		newsService.insertopt(news);
		return new ModelAndView("news/success");
	}
	/**
	 * 添加界面
	 */
	@RequestMapping("/addUI")
	public ModelAndView addUI(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("news/add");
	}
	/**
	 * 修改界面
	 */
	@RequestMapping("/editUI")
	public ModelAndView editUI(HttpServletRequest request, HttpServletResponse response) {
		String id=request.getParameter("id");
		System.out.println(id);
		News news=newsService.getById(id);
		request.setAttribute("bean", news);
		return new ModelAndView("news/edit");
	}

	@RequestMapping("/edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) {
		String id=request.getParameter("id");
		System.out.println(id);
		News news=newsService.getById(id);
		String title = request.getParameter("title");
		String infos = request.getParameter("infos");
		news.setTitle(title);
		news.setInfos(infos);
		Date dt=new Date();
	    SimpleDateFormat matter1=new SimpleDateFormat("yyyy-MM-dd hh:MM:ss");
	    String date = matter1.format(dt);
	    news.setTime(date);
		newsService.updateopt(news);
		return new ModelAndView("news/success");
	}


	@RequestMapping("/delete")
	public ModelAndView delete(HttpServletRequest request, HttpServletResponse response) {
		String id=request.getParameter("id");
		int key =Integer.parseInt(id);
		newsService.deleteopt(key);
		return new ModelAndView("news/success");
	}
}
