package org.joonzis.controller;

import javax.servlet.http.HttpSession;

import org.joonzis.domain.MemberVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/event/*")
public class EventController {

	@GetMapping("/main")
	public String main(Model model, HttpSession session) {
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		if (loggedInMember == null) {
			// 로그인되지 않은 경우 처리 (예: 로그인 페이지로 리다이렉트)
			return "redirect:/login/loginPage";
		}
		log.info("main...");
		return "/event/main";
	}
	
	@GetMapping("/list/*")
	public void eventTab() {
		log.info("eventTab...");
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}