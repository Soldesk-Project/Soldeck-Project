package org.joonzis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/friendlist")
public class FriendController {
	
	@GetMapping("/friendList")
	public void getFriendList() {
		log.info("친구 페이지");
	}
	
	@PostMapping("/friend/memoUpdate")
	public String updateMemo(@RequestParam("mem_id") String memId,
	                         @RequestParam("friendMemo") String memo) {
	    log.info("메모 저장 - ID: " + memId + ", Memo: " + memo);
	    //service.updateFriendMemo(memId, memo);
	    return "redirect:/friend/list"; // 저장 후 리다이렉트
	}
	
	@GetMapping("/test")
	public void test() {
		log.info("테스트");

	}
}
