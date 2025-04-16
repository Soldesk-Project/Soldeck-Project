package org.joonzis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/search")
public class SearchController {
	
	@GetMapping("/search")
	public String search() {
		log.info("search...");
		return "/search/search";
	}
	
	@GetMapping("/location")
	public String location() {
		log.info("location...");
		return "/search/location";
	}
	
	@GetMapping("/view")
	public String view() {
		log.info("view...");
		return "/search/view";
	}
}
