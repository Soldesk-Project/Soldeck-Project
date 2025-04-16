package org.joonzis.controller;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/login")
public class LoginController {
	
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

	
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		return "login/index";
	}
	
	@RequestMapping(value = "/loginPage", method = RequestMethod.GET)
	public String loginPage() {
		return "login/loginPage";
	}
	
    @RequestMapping("/findId")
    public String findId() {
        return "login/findId"; // findId.jsp 파일 이름 반환
    }
    
    @RequestMapping("/findPw")
    public String findPw() {
        return "/login/findPw";
    }
    
    @RequestMapping("/signUpPage")
    public String signUpPage() {
        return "login/signUpPage";
    }
    
    @RequestMapping("/termsOfService")
    public String termsOfService() {
        return "login/termsOfService";
    }
    
    @RequestMapping("/privacyPolicy")
    public String privacyPolicy() {
        return "login/privacyPolicy";
    }
}
