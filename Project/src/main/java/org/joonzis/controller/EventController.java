package org.joonzis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/event/*")
public class EventController {

	@GetMapping("/main")
	public String main() {
		log.info("main...");
		return "/event/main";
	}
	
	@GetMapping("/list/*")
	public void eventTab() {
		log.info("eventTab...");
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}