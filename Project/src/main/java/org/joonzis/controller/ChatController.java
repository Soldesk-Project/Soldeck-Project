package org.joonzis.controller;


import java.util.List;

import javax.servlet.http.HttpSession;

import org.joonzis.domain.GroupVO;
import org.joonzis.domain.MemberVO;
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
	public String goChatRoom(@PathVariable("groupNo") int groupNo, HttpSession session, Model model) {
		List<GroupVO> groups = service.getAllGroups();
		
		 // groupNo가 존재하는지 체크
	    boolean exists = groups.stream().anyMatch(g -> g.getGroupNo() == groupNo);

	    if (!exists) {
	        return "redirect:/error/404";  // 존재하지 않으면 404로
	    }
	    // 로그인한 사용자 정보 가져오기
	    MemberVO loginUser = (MemberVO) session.getAttribute("loggedInUser");
	    
	    // 로그인한 사용자가 없으면 로그인 페이지로 리다이렉트
	    if (loginUser == null) {
	        return "redirect:/login/loginPage";
	    }

	    // 로그인한 사용자 ID를 currentUser로 설정
	    String currentNick = loginUser.getMem_nick();
	    model.addAttribute("currentNick", currentNick);
	    
	    // 로그인한 사용자 번호
	    int currentNo = loginUser.getMem_no();
	    model.addAttribute("currentNo", currentNo);

		model.addAttribute("groupNo", groupNo);
		return "chat/chatRoom";
	}
}
