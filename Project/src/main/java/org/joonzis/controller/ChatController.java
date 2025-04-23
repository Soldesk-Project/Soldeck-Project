package org.joonzis.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/chat")
public class ChatController {
	
	@GetMapping("/chat")
	public void goChat() {
		log.info("chat...1");
	}
}
