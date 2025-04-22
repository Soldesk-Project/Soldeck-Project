package org.joonzis.controller;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
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
    
    @PostMapping("/findIdProcess")
    @ResponseBody
    public String findIdProcess(@RequestParam("name") String mem_name, @RequestParam("birthDate") String mem_birth) {
        String foundId = memberservice.findId(mem_name, mem_birth);
        if (foundId != null) {
            return foundId;
        } else {
            return "아이디를 찾을 수 없습니다.";
        }
    }
    
    @RequestMapping("/findPw")
    public String findPw() {
        return "login/findPw";
    }
    
    @PostMapping("/findPwProcess")
    @ResponseBody
    public String findPwProcess(@RequestParam("Id") String mem_id, @RequestParam("birthDate") String mem_birth) {
    	String foundPw = memberservice.findPw(mem_id, mem_birth);
    	if (foundPw != null) {
    		return foundPw;
    	} else {
    		return "비밀번호를 찾을 수 없습니다";
    	}
    }
    
    @RequestMapping("/signUpPage")
    public String signUpPage() {
        return "login/signUpPage";
    }

    @PostMapping("/signUpProcess")
    @ResponseBody
    public String signUpProcess(
            @ModelAttribute MemberVO member,
            @RequestParam("id") String mem_id,
            @RequestParam("password") String mem_pw,
            @RequestParam("name") String mem_name,
            @RequestParam("nickname") String mem_nick,
            @RequestParam("yyyy") String birthYear,
            @RequestParam("mm") String birthMonth,
            @RequestParam("dd") String birthDay,
            @RequestParam("gender") String gender,
            @RequestParam("email") String mem_email,
            @RequestParam("phone") int mem_phone,
            @RequestParam(value = "interest", required = false) List<String> interests,
            @RequestParam("profileImage") MultipartFile profileImage) {

        logger.info("signUpProcess 호출 - ID: {}", mem_id);

        // MemberVO에 각 필드 값 명시적으로 설정
        member.setMem_id(mem_id);
        member.setMem_pw(mem_pw);
        member.setMem_name(mem_name);
        member.setMem_nick(mem_nick);
        member.setMem_email(mem_email);
        member.setMem_phone(mem_phone);

        // 생년월일 조합 (MemberVO에 직접 설정)
        String mem_birth = birthYear + birthMonth + birthDay;
        member.setMem_birth(mem_birth);

        // 성별 설정 (MemberVO에 직접 설정)
        if (gender.equals("male")) {
            member.setMem_birth(member.getMem_birth() + "1");
        } else if (gender.equals("female")) {
            member.setMem_birth(member.getMem_birth() + "2");
        }

        String mem_img = null;
        if (!profileImage.isEmpty()) {
            try {
                // 이미지 저장 경로 설정
                String uploadDir = "C:/upload";
                File uploadPath = new File(uploadDir);
                if (!uploadPath.exists()) {
                    uploadPath.mkdirs();
                }
                String originalFilename = profileImage.getOriginalFilename();
                String storedFilename = member.getMem_id() + "_" + System.currentTimeMillis() + "_" + originalFilename;
                File destFile = new File(uploadPath + "/" + storedFilename);
                profileImage.transferTo(destFile);
                mem_img = storedFilename;
                member.setMem_img(mem_img); // MemberVO에 이미지 파일명 설정
                logger.info("이미지 저장 성공: {}", destFile.getAbsolutePath());
            } catch (Exception e) {
                logger.error("이미지 저장 실패: {}", e.getMessage());
                return "회원가입 실패 - 이미지 저장 오류";
            }
        }

        Integer[] food_no = null;
        if (interests != null && !interests.isEmpty()) {
            food_no = interests.stream()
                    .map(this::convertToFoodNo)
                    .filter(num -> num != null)
                    .toArray(Integer[]::new);
        }

        memberservice.signUpProcess(member, food_no);

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