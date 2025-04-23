package org.joonzis.controller;


import java.util.List;

import org.joonzis.domain.GroupVO;
import org.joonzis.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/chat")
public class ChatController {
	
	@Autowired
	GroupService service;
	
	@GetMapping("/chatRoom/{groupNo}")
	public String goChatRoom(@PathVariable("groupNo") int groupNo, Model model) {
		List<GroupVO> groups = service.getAllGroups();
		
		 // groupNo가 존재하는지 체크
	    boolean exists = groups.stream().anyMatch(g -> g.getGroupNo() == groupNo);

	    if (!exists) {
	        return "redirect:/error/404";  // 존재하지 않으면 404로
	    }
	    // 임시로 사용자 ID 설정
	    String currentUser = "testUser"; // 로그인 후 사용자 정보로 대체
	    model.addAttribute("currentUser", currentUser);

		model.addAttribute("groupNo", groupNo);
		return "chat/chatRoom";
	}
}
