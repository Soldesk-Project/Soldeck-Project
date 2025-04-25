package org.joonzis.controller;


import java.util.List;

import javax.servlet.http.HttpSession;

import org.joonzis.domain.ChatLogVO;
import org.joonzis.domain.GroupVO;
import org.joonzis.domain.MemberVO;
import org.joonzis.service.ChatLogService;
import org.joonzis.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/chat")
public class ChatController {
	
	@Autowired
	GroupService service;
	
	@Autowired
	ChatLogService chatService;
	
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
		
		// 기존 채팅 로그 가져오기
		List<ChatLogVO> chatLogs = chatService.getChatsByGroupNo(groupNo);
		
		// 채팅 로그의 chatLog를 분리하여 sender와 msg로 나누기
	    chatLogs.forEach(chatLog -> {
	        String[] parts = chatLog.getChatLog().split(":", 2);
	        if (parts.length == 2) {
	            chatLog.setSender(parts[0]); // sender 설정
	            chatLog.setMsg(parts[1]);     // msg 설정
	        }
	    });
		
		// Jackson을 이용해 List<ChatLogVO>를 JSON으로 변환
	    ObjectMapper objectMapper = new ObjectMapper();
	    String chatLogsJson = "";
	    try {
	        chatLogsJson = objectMapper.writeValueAsString(chatLogs);  // List<ChatLogVO> -> JSON String
	    } catch (JsonProcessingException e) {
	        e.printStackTrace();
	        // 예외 처리: 예외가 발생하면 빈 배열로 설정하거나 로그를 남길 수 있음
	        chatLogsJson = "[]";
	    }
	    
	    model.addAttribute("chatLogs", chatLogsJson);
        
        log.info("model..." + model );
	
		return "chat/chatRoom";
	}
}
