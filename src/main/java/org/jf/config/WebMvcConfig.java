package org.jf.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.jf.config.LoginInterceptor;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {
    //配置拦截器
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/index/mycenter", "/index/addcomment", "/index/addccomment",  "/index/addBlog","/index/apply","/index/apply").excludePathPatterns("/index/loginUI", "/index/index", "/index/registerUI","/index/register");
        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/admin/*","/apply/*","/basic/*","/blog/*","/changguan/*","/news/*","/notice/*","/users/*").excludePathPatterns( "/login/loginUI","login/loginUI", "/login/login");
        super.addInterceptors(registry);
    }
    //配置首页
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("redirect:/index/index");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
        super.addViewControllers(registry);
    }
}
