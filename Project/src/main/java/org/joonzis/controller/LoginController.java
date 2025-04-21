package org.joonzis.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import org.joonzis.service.MemberService;
import org.joonzis.domain.MemberVO; 

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
    @ResponseBody
    public String signUpProcess(@RequestBody Map<String, Object> requestMap) {
        String mem_name = (String) requestMap.get("name");
        String yyyy = (String) requestMap.get("yyyy");
        String mm = (String) requestMap.get("mm");
        String dd = (String) requestMap.get("dd");
        String gender = (String) requestMap.get("gender");
        String mem_id = (String) requestMap.get("id");
        String mem_pw = (String) requestMap.get("password");
        String mem_nick = (String) requestMap.get("nickname");
        String mem_email = (String) requestMap.get("email");
        String mem_phone = (String) requestMap.get("phone");
        List<String> interests = (List<String>) requestMap.get("interest"); // JavaScript에서 배열로 보내므로 List로 받음

    	System.out.println("MemberService.signUpProcess - mem_id: " + mem_id);
        
        // 생년월일과 성별 조합
        String mem_birth = yyyy + mm + dd;
        if (gender.equals("male")) {
            mem_birth += "1";
        } else if (gender.equals("female")) {
            mem_birth += "2";
        }

        // 관심분야 처리 (food_no로 변환)
        Integer[] food_no = null;
        if (interests != null && !interests.isEmpty()) {
            food_no = interests.stream()
                    .map(this::convertToFoodNo)
                    .filter(num -> num != null)
                    .toArray(Integer[]::new);
        }

        memberservice.signUpProcess(mem_name, mem_birth, mem_id, mem_pw, mem_nick, food_no);

        return "회원가입 성공";
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