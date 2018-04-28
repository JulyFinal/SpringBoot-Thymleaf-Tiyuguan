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
        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/index/mycenter", "/index/addcomment", "/index/addBlog","/index/apply").excludePathPatterns("/index/login","/login/login");
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
