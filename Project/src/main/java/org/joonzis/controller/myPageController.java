package org.joonzis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/mypage/*")
public class myPageController {

	@GetMapping("/myInfo")
	public String myInfo() {
		log.info("myInfo...");
		return "/mypage/myInfo";
	}
	@GetMapping("/bookmark")
	public String bookmark() {
		log.info("bookmark...");
		return "/mypage/bookmark";
	}
	
	@GetMapping("/booking")
	public String booking() {
		log.info("booking...");
		return "/mypage/booking";
	}
	@GetMapping("/review")
	public String review() {
		log.info("review...");
		return "/mypage/review";
	}
}
