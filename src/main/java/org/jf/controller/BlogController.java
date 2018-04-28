package org.jf.controller;

import com.common.paginate.Page;
import com.common.paginate.StringUitl;
import org.jf.entity.Blog;
import org.jf.service.BlogService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/blog")
public class BlogController {

    @Resource
    private BlogService blogService;


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
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("page", page);
        List list = blogService.getForPage(map);
        //展示的数据
        request.setAttribute("list", list);
        request.setAttribute("paging", page.getPageStr());
        //查询条件显示
        return new ModelAndView("blog/list");
    }

    /**
     * 添加用户
     */
    @RequestMapping("/add")
    public ModelAndView add(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Blog news = new Blog();
        String title = request.getParameter("title");
        String infos = request.getParameter("infos");
        news.setTitle(title);
        news.setInfos(infos);
        Date dt = new Date();
        SimpleDateFormat matter1 = new SimpleDateFormat("yyyy-MM-dd hh:MM:ss");
        String date = matter1.format(dt);
        news.setTime(date);
        blogService.insert(news);
        return new ModelAndView("blog/success");
    }

    /**
     * 添加界面
     */
    @RequestMapping("/addUI")
    public ModelAndView addUI(HttpServletRequest request, HttpServletResponse response) {
        return new ModelAndView("blog/add");
    }

    /**
     * 修改界面
     */
    @RequestMapping("/editUI")
    public ModelAndView editUI(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        Blog news = blogService.getByid(id);
        request.setAttribute("bean", news);
        return new ModelAndView("blog/edit");
    }

    @RequestMapping("/edit")
    public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id = request.getParameter("id");
        Blog news = blogService.getByid(id);
        String title = request.getParameter("title");
        String infos = request.getParameter("infos");
        news.setTitle(title);
        news.setInfos(infos);
        news.setTitle(title);
        news.setInfos(infos);
        Date dt = new Date();
        SimpleDateFormat matter1 = new SimpleDateFormat("yyyy-MM-dd hh:MM:ss");
        String date = matter1.format(dt);
        news.setTime(date);
        blogService.update(news);
        return new ModelAndView("blog/success");
    }


    @RequestMapping("/delete")
    public ModelAndView delete(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        int key = Integer.parseInt(id);
        blogService.delete(key);
        return new ModelAndView("blog/success");
    }
}
