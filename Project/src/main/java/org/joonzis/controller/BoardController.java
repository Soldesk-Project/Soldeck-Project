package org.joonzis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/board")
public class BoardController {

	@RequestMapping("/termsOfService")
	public String termsOfService() {
		log.info("termsOfService...");
		return "board/termsOfService";
	}
    
	@RequestMapping("/privacyPolicy")
	public String privacyPolicy() {
		log.info("privacyPolicy...");
		return "board/privacyPolicy";
	}
    
	@RequestMapping("/faq")
	public String faq() {
		log.info("faq...");
		return "board/faq";
	}
    
	@RequestMapping("/announcement")
	public String announcement() {
		log.info("announcement...");
		return "board/announcement";
	}
}
//