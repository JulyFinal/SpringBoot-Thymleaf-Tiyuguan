package org.jf.controller;

import com.common.paginate.Page;
import com.common.paginate.StringUitl;
import com.common.util.isEffectiveDate;
import org.jf.entity.*;
import org.jf.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/index")
public class IndexController {
    @Autowired
    private UserService userService;
    @Autowired
    private ChangguanService changguanService;
    @Autowired
    private BlogService blogService;
    @Autowired
    private ApplyService applyService;
    @Autowired
    private ReplyService rservice;

    @RequestMapping("/register")
    public void register(HttpServletRequest request, HttpServletResponse response) throws IOException {
        User user = new User();
        String no = request.getParameter("no");
        List<User> n = userService.ifExist(no);
        if (n.size() > 0) {
            response.setContentType("text/html;charset=utf-8");
            response.getWriter().write("<script>alert('账户已存在');</script>");
            response.getWriter().write("<script> window.location='../index/registerUI' ;window.close();</script>");
            response.getWriter().flush();
        }

        String pwd = request.getParameter("pwd");
        String name = request.getParameter("name");
        user.setPwd(pwd);
        user.setNo(no);
        user.setName(name);
        userService.insertopt(user);
        response.setContentType("text/html;charset=utf-8");
        response.getWriter().write("<script>alert('注册成功，请登陆');</script>");
        response.getWriter().write("<script> window.location='../index/index' ;window.close();</script>");
        response.getWriter().flush();
    }

    @RequestMapping("/login")
    public void login(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws IOException {
        String pwd = request.getParameter("pwd");
        String no = request.getParameter("no");
        response.setCharacterEncoding("utf-8");
        Login login = (Login) httpSession.getAttribute("login");
        if (login == null) {
            User user = userService.checkUserNo(no, pwd);
            if (user == null) {
                response.setContentType("text/html;charset=utf-8");
                response.getWriter().write("<script>alert('账号密码错误');</script>");
                response.getWriter().write("<script> window.location='../index/index' ;window.close();</script>");
                response.getWriter().flush();
            }
            login = new Login(user.getId(), user.getName(), "user", "");
            httpSession.setAttribute("login", login);
        }
        response.setContentType("text/html;charset=utf-8");
        response.getWriter().write("<script>alert('登录成功');</script>");
        response.getWriter().write("<script> window.location='../index/index' ;window.close();</script>");
        response.getWriter().flush();
    }

    @RequestMapping("/logout")
    public void ulogout(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws IOException {
        httpSession.removeAttribute("login");
        response.setContentType("text/html;charset=utf-8");
        response.getWriter().write("<script>alert('退出登录');</script>");
        response.getWriter().write("<script> window.location='../index/index' ;window.close();</script>");
        response.getWriter().flush();
    }

    /**************************************************************************************************************************************************************
     * 展示模块
     ************************************************************************************************************************************************************/
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {
        Page page = new Page("filter_form");
        page.setPageSize(8);
        String currentPage = request.getParameter("page.currentPage");
        if (StringUitl.IsNotNull(currentPage)) {
            page.setCurrentPage(Integer.parseInt(currentPage));
        }
        //拼装map进行查询
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("page", page);
        List list = changguanService.getForPage(map);
        //展示的数据
        request.setAttribute("list", list);
        request.setAttribute("paging", page.getPageStr());
        System.out.println(page.getPageStr());
        return new ModelAndView("index/index");
    }

    @RequestMapping("/info")
    public ModelAndView info(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        Changguan b = changguanService.getByid(id);
        request.setAttribute("bean", b);
        return new ModelAndView("index/info");
    }

    @RequestMapping("/applyUI")
    public ModelAndView applyUI(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        Changguan b = changguanService.getByid(id);
        request.setAttribute("bean", b);
        return new ModelAndView("index/applyUI");
    }

    @RequestMapping("/apply")
    public void apply(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws IOException {
        Login login = (Login) httpSession.getAttribute("login");
//        if (login == null) {
//            response.setContentType("text/html;charset=utf-8");
//            response.getWriter().write("<script>alert('请登录');</script>");
//            response.getWriter().write("<script> window.location='../index/index' ;window.close();</script>");
//            response.getWriter().flush();
//        }
        Date dt = new Date();
        SimpleDateFormat matter1 = new SimpleDateFormat("yyyy-MM-dd");
        String date = matter1.format(dt);
        List<Apply> list = applyService.getList();
        for (Apply apply : list) {
            String oldtime = apply.getTime();
            long oldchangguan=apply.getCid();
            if (oldtime.equals(date)&&request.getParameter("id").equals(oldchangguan)) {
                String starttime = request.getParameter("starttime");
                try {
                    Date starttimeFormat = new SimpleDateFormat("HH:mm").parse(starttime);
                    Date oldstarttimeFormat = new SimpleDateFormat("HH:mm").parse(apply.getStarttime());
                    Date oldendtimeFormat = new SimpleDateFormat("HH:mm").parse(apply.getEndtime());
                    if (isEffectiveDate.isEffectiveDate(starttimeFormat, oldstarttimeFormat, oldendtimeFormat)) {
                        response.setContentType("text/html;charset=utf-8");
                        response.getWriter().write("<script>alert('已被预约，请重新选定');</script>");
                        response.getWriter().write("<script> window.location='../index/index' ;window.close();</script>");
                        response.getWriter().flush();
                    }
                } catch (ParseException e) {
                    e.printStackTrace();
                }
//                if(apply.getStarttime().equals(starttime)){
//                response.setContentType("text/html;charset=utf-8");
//                response.getWriter().write("<script>alert('已被预约，请重新选定');</script>");
//                response.getWriter().write("<script> window.location='../index/index' ;window.close();</script>");
//                response.getWriter().flush();
//                }
            }
        }
        String id = request.getParameter("id");
        Changguan bl = changguanService.getByid(id);
        Apply ap = new Apply();
        ap.setCname(bl.getName());
        ap.setCid(Integer.parseInt(id));
        ap.setEndtime(request.getParameter("endtime"));
        ap.setName(login.getName());
        ap.setStarttime(request.getParameter("starttime"));
        ap.setState("申请中");
        ap.setTel(request.getParameter("tel"));
        ap.setTime(date);
        ap.setUid(login.getId());
        applyService.insertopt(ap);

        response.setContentType("text/html;charset=utf-8");
        response.getWriter().write("<script>alert('操作成功！');</script>");
        response.getWriter().write("<script> window.location='../index/mycenter' ;window.close();</script>");
        response.getWriter().flush();
    }

    @RequestMapping("/chuangguanlist")
    public ModelAndView chuangguanlist(HttpServletRequest request, HttpServletResponse response) {
        Page page = new Page("filter_form");
        page.setPageSize(8);
        String currentPage = request.getParameter("page.currentPage");
        if (StringUitl.IsNotNull(currentPage)) {
            page.setCurrentPage(Integer.parseInt(currentPage));
        }
        //拼装map进行查询
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("page", page);
        List list = changguanService.getForPage(map);
        //展示的数据
        request.setAttribute("list", list);
        request.setAttribute("paging", page.getPageStr());
        return new ModelAndView("index/chuangguanlist");
    }


    @RequestMapping("/bloglist")
    public ModelAndView bloglist(HttpServletRequest request, HttpServletResponse response) {
        Page page = new Page("filter_form");
        page.setPageSize(8);
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
        return new ModelAndView("index/bloglist");
    }

    @RequestMapping("/addBlog")
    public ModelAndView addBlog(HttpServletRequest request, HttpServletResponse response) {
        return new ModelAndView("index/addBlog");
    }

    @RequestMapping("/bloginfo")
    public ModelAndView bloginfo(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        Blog b = blogService.getByid(id);
        request.setAttribute("bean", b);
        List<Reply> list = rservice.getByRootd(id);
        for (int i = 0; i < list.size(); i++) {
            List<Reply> clist = rservice.getByparentid(list.get(i).getId() + "");
            list.get(i).setClist(clist);
        }
        request.setAttribute("list", list);
        return new ModelAndView("index/bloginfo");
    }

    @RequestMapping("/loginUI")
    public ModelAndView loginUI(HttpServletRequest request, HttpServletResponse response) {
        return new ModelAndView("index/loginUI");
    }

    @RequestMapping("/registerUI")
    public ModelAndView registerUI(HttpServletRequest request, HttpServletResponse response) {
        return new ModelAndView("index/registerUI");
    }

    @RequestMapping("/addcomment")
    public void comments(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws IOException {
        Login login = (Login) httpSession.getAttribute("login");
        if (login == null) {
            response.setContentType("text/html;charset=utf-8");
            response.getWriter().write("<script>alert('会话过期，请重新登陆！');</script>");
            response.getWriter().write("<script> window.location='../index/loginUI' ;window.close();</script>");
            response.getWriter().flush();
        }
        int uid = login.getId();
        String name = login.getName();
        String message = request.getParameter("infos");
        Reply b = new Reply();
        Date dt = new Date();
        SimpleDateFormat matter1 = new SimpleDateFormat("yyyy-MM-dd hh:MM:ss");
        String id = request.getParameter("id");
        String date = matter1.format(dt);
        b.setTime(date);
        b.setUid(uid);
        b.setName(name);
        b.setRoot(Integer.parseInt(id));
        b.setMessage(message);
        b.setParentid(0);
        rservice.insert(b);
        response.setContentType("text/html;charset=utf-8");
        response.getWriter().write("<script>alert('操作成功！');</script>");
        response.getWriter().write("<script> window.location='../index/bloginfo?id=" + id + "' ;window.close();</script>");
        response.getWriter().flush();
    }

    @RequestMapping("/addccomment")
    public void ccomments(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws IOException {
        Login login = (Login) httpSession.getAttribute("login");
        if (login == null) {
            response.setContentType("text/html;charset=utf-8");
            response.getWriter().write("<script>alert('会话过期，请重新登陆！');</script>");
            response.getWriter().write("<script> window.location='../index/loginUI' ;window.close();</script>");
            response.getWriter().flush();
        }
        int uid = login.getId();
        String name = login.getName();
        String message = request.getParameter("infos");
        Reply b = new Reply();
        Date dt = new Date();
        SimpleDateFormat matter1 = new SimpleDateFormat("yyyy-MM-dd hh:MM:ss");
        String id = request.getParameter("id");
        String rid = request.getParameter("root");
        String date = matter1.format(dt);
        b.setTime(date);
        b.setUid(uid);
        b.setName(name);
        b.setRoot(0);
        b.setMessage(message);
        b.setParentid(Integer.parseInt(id));
        rservice.insert(b);
        response.setContentType("text/html;charset=utf-8");
        response.getWriter().write("<script>alert('操作成功！');</script>");
        response.getWriter().write("<script> window.location='../index/bloginfo?id=" + rid + "' ;window.close();</script>");
        response.getWriter().flush();
    }

    @RequestMapping("/add")
    public void add(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws IOException {
        Login login = (Login) httpSession.getAttribute("login");
        if (login == null) {
            response.setContentType("text/html;charset=utf-8");
            response.getWriter().write("<script>alert('退出登录');</script>");
            response.getWriter().write("<script> window.location='../index/index' ;window.close();</script>");
            response.getWriter().flush();
        }
        Blog bean = new Blog();
        bean.setTitle(request.getParameter("title"));
        bean.setInfos(request.getParameter("infos"));
        bean.setUid(login.getId());
        Date dt = new Date();
        SimpleDateFormat matter1 = new SimpleDateFormat("yyyy-MM-dd hh:MM:ss");
        String date = matter1.format(dt);
        bean.setTime(date);
        blogService.insert(bean);
        response.setContentType("text/html;charset=utf-8");
        response.getWriter().write("<script>alert('操作成功！');</script>");
        response.getWriter().write("<script> window.location='../index/bloglist' ;window.close();</script>");
        response.getWriter().flush();
    }

    @RequestMapping("/list")
    public ModelAndView list(HttpServletRequest request, HttpServletResponse response) {
        Page page = new Page("filter_form");
        page.setPageSize(6);
        String currentPage = request.getParameter("page.currentPage");
        if (StringUitl.IsNotNull(currentPage)) {
            page.setCurrentPage(Integer.parseInt(currentPage));
        }
        //拼装map进行查询
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("page", page);
        List list = changguanService.getForPage(map);
        //展示的数据
        request.setAttribute("list", list);
        request.setAttribute("paging", page.getPageStr());
        System.out.println(page.getPageStr());
        return new ModelAndView("index/list");
    }

    @RequestMapping("/mycenter")
    public ModelAndView myorder(HttpServletRequest request, HttpServletResponse response, HttpSession httpSession) throws IOException {
        Login login = (Login) httpSession.getAttribute("login");
        if (login == null) {
            response.setContentType("text/html;charset=utf-8");
            response.getWriter().write("<script>alert('退出登录');</script>");
            response.getWriter().write("<script> window.location='../index/loginUI' ;window.close();</script>");
            response.getWriter().flush();
        }
        List<Blog> blist = blogService.getByUid(login.getId() + "");
        List<Apply> alist = applyService.getByUid(login.getId() + "");
        request.setAttribute("blist", blist);
        request.setAttribute("alist", alist);
        return new ModelAndView("index/mycenter");
    }
}
