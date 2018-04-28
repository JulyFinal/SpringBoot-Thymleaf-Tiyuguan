package org.jf.config;

import org.jf.entity.Login;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        // 1、拦截请求url
        // 2、从cookie中取token
        // 3、如果没有toke跳转到登录页面。
        // 4、取到token，需要调用sso系统的服务查询用户信息。
        //TbUser user = userService.getUserByToken(request, response);
        HttpSession session = httpServletRequest.getSession();
        Login login= (Login) session.getAttribute("login");
        // 5、如果用户session已经过期，跳转到登录页面
        if (login == null) {
            httpServletResponse.setContentType("text/html;charset=utf-8");
            httpServletResponse.getWriter().write("<script>alert('请登录');</script>");
            httpServletResponse.getWriter().write("<script> window.location='../index/index' ;window.close();</script>");
            httpServletResponse.getWriter().flush();
            httpServletResponse.sendRedirect(httpServletRequest.getContextPath()+ "/index/loginUI");
            return false;
        }
        // 6、如果没有过期，放行。
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
