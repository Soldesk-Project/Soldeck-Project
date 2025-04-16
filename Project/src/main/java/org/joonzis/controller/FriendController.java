package org.joonzis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/friendlist")
public class FriendController {
	
	@GetMapping("/friendList")
	public void getFriendList() {
		log.info("친구 페이지");
	}
	
	@GetMapping("/test")
	public void test() {
		log.info("테스트");


		log.info("테스트123");

		log.info("테스트12345444");

	}
}
