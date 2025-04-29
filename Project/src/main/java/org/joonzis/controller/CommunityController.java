package org.joonzis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/community")
public class CommunityController {
	
	@GetMapping("/communityMain")
	public String communityMain() {
		log.info("커뮤니티 메인 페이지 요청");
		return "community/communityMain";
	}
}
