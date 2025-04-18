package org.joonzis.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.joonzis.service.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Controller
@RequestMapping("/login")
public class LoginController {
	
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	@Autowired
	private MemberService memberservice;
	
	@Bean
	public InternalResourceViewResolver viewResolver() {
		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
		resolver.setPrefix("/WEB-INF/views/");
		resolver.setSuffix(".jsp");
		return resolver;
	}
	
	@RequestMapping(value = "/loginPage", method = RequestMethod.GET)
	public String loginPage() {
		return "login/loginPage";
	}
	
	@RequestMapping("/findId")
	public String findId() {
		return "login/findId";
	}
    
	@RequestMapping("/findPw")
	public String findPw() {
		return "login/findPw";
	}
    
	@RequestMapping("/signUpPage")
	public String signUpPage() {
		return "login/signUpPage";
	}
	
	@PostMapping("/signUpProcess")
    public String signUpProcess(
            @RequestParam("name") String mem_name,
            @RequestParam("yyyy") String yyyy,
            @RequestParam("mm") String mm,
            @RequestParam("dd") String dd,
            @RequestParam("gender") String gender,
            @RequestParam("id") String mem_id,
            @RequestParam("password") String mem_pw,
            @RequestParam("nickname") String mem_nickname,
            @RequestParam("email") String mem_email,
            @RequestParam("phone") String mem_phone,
            @RequestParam(value = "interest", required = false) String[] interests) {

        // 생년월일과 성별 조합
        String mem_birth = yyyy + mm + dd;
        if (gender.equals("male")) {
            mem_birth += "1";
        } else if (gender.equals("female")) {
            mem_birth += "2";
        }

        // 관심분야 처리 (food_no로 변환)
        Integer[] food_no = null;
        if (interests != null && interests.length > 0) {
            food_no = Arrays.stream(interests)
                    .map(this::convertToFoodNo)
                    .filter(num -> num != null)
                    .toArray(Integer[]::new);
        }

        // 회원 정보와 관심분야를 서비스로 전달하여 DB에 저장
        memberservice.signUpProcess(mem_name, mem_birth, mem_id, mem_pw, mem_nickname, mem_email, mem_phone, food_no);

        // 회원가입 완료 후 이동할 페이지 (예: 로그인 페이지)
        return "redirect:/login/loginPage";
    }

    // 관심분야 문자열을 food_no로 변환하는 Helper 메서드
    private Integer convertToFoodNo(String interest) {
        switch (interest) {
            case "korean":
                return 1;
            case "japanese":
                return 2;
            case "chinese":
                return 3;
            case "western":
                return 4;
            case "vietnamese":
                return 5;
            default:
                return null; // 매칭되는 값이 없으면 null 반환
        }
    }
}
