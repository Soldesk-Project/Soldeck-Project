package org.joonzis.controller;


import java.util.List;

import javax.servlet.http.HttpSession;

import org.joonzis.domain.ChatLogVO;
import org.joonzis.domain.GroupMemberDTO;
import org.joonzis.domain.MemberVO;
import org.joonzis.domain.PrivateChatLogVO;
import org.joonzis.service.ChatLogService;
import org.joonzis.service.GroupService;
import org.joonzis.service.PrivateChatService;
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
	
	@Autowired
	PrivateChatService privateChatService;
	
	@GetMapping("/main") // 채팅 메인 페이지 요청 처리
	public String chatMain(HttpSession session, Model model) {
	    log.info("채팅 메인 페이지 요청");
	    MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
	    if (member == null) {
	        return "redirect:/login/loginPage"; // 로그인 안 되어 있으면 로그인 페이지로 리다이렉트
	    }
	
	    int mem_no = member.getMem_no();
	    List<GroupMemberDTO> groups = service.getAllGroups(mem_no);
	    model.addAttribute("groupList", groups); // 참여하고 있는 그룹 목록을 모델에 추가
	    return "chat/chatRoom";
	}
	
	// 그룹채팅방
	@GetMapping("/chatRoom/{groupNo}")
	public String goChatRoom(@PathVariable("groupNo") int groupNo, HttpSession session, Model model) {
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		if (loggedInMember == null) {
			return "redirect:/login/loginPage";
		}
		int mem_no = loggedInMember.getMem_no();
		
		
		
		List<GroupMemberDTO> groups = service.getAllGroups(mem_no);
	    
	    // groupNo에 해당하는 그룹을 찾기
		GroupMemberDTO selectedGroup = groups.stream()
	                                  .filter(group -> group.getGroup_no() == groupNo)
	                                  .findFirst()
	                                  .orElse(null);

	    if (selectedGroup == null) {
	        return "redirect:/error/404";  // 존재하지 않으면 404로
	    }

	    // 그룹의 chatTitle을 model에 추가
	    model.addAttribute("chatTitle", selectedGroup.getChat_title());

	    // 로그인한 사용자 정보 가져오기
	    MemberVO loginUser = (MemberVO) session.getAttribute("loggedInUser");
	    
	    if (loginUser == null) {
	        return "redirect:/login/loginPage";
	    }

	    String currentNick = loginUser.getMem_nick();
	    model.addAttribute("currentNick", currentNick);

	    int currentNo = loginUser.getMem_no();
	    model.addAttribute("currentNo", currentNo);

	    model.addAttribute("groupNo", groupNo);
	    
	    // 기존 채팅 로그 가져오기
	    List<ChatLogVO> chatLogs = chatService.getChatsByGroupNo(groupNo);
	    
	    chatLogs.forEach(chatLog -> {
	        String[] parts = chatLog.getChatLog().split(":", 2);
	        if (parts.length == 2) {
	            chatLog.setSender(parts[0]);
	            chatLog.setMsg(parts[1]);
	        }
	    });

	    // List<ChatLogVO>를 JSON으로 변환
	    ObjectMapper objectMapper = new ObjectMapper();
	    String chatLogsJson = "";
	    try {
	        chatLogsJson = objectMapper.writeValueAsString(chatLogs);
	    } catch (JsonProcessingException e) {
	        e.printStackTrace();
	        chatLogsJson = "[]"; // 예외 발생 시 빈 배열로 설정
	    }

	    model.addAttribute("chatLogsJson", chatLogsJson);
	    model.addAttribute("groupList", groups);

	    return "chat/chatRoom";
	}
	
	// 개인 채팅방
	@GetMapping("/privateRoom/{roomNo}")
	public String goPrivateChatRoom(@PathVariable("roomNo") String roomNo, HttpSession session, Model model) {
	    MemberVO loginUser = (MemberVO) session.getAttribute("loggedInUser");
	    if (loginUser == null) {
	        return "redirect:/login/loginPage";
	    }

	    int myNo = loginUser.getMem_no();
	    String myNick = loginUser.getMem_nick();

	    // friendNo를 roomNo에서 추출
	    String myNoStr = String.valueOf(myNo);
	    String friendNoStr;

	    if (roomNo.startsWith(myNoStr)) {
	        friendNoStr = roomNo.substring(myNoStr.length());
	    } else if (roomNo.endsWith(myNoStr)) {
	        friendNoStr = roomNo.substring(0, roomNo.length() - myNoStr.length());
	    } else {
	        // 내가 포함되지 않은 roomNo면 잘못된 요청
	        return "redirect:/error/404";
	    }

	    int friendNo = Integer.parseInt(friendNoStr);

	    // 나머지 로직 동일
	    MemberVO friend = privateChatService.getMemberByNo(friendNo);
	    if (friend == null) return "redirect:/error/404";

	    Integer existingRoom = privateChatService.checkExistingRoom(
	        Math.min(myNo, friendNo),
	        Math.max(myNo, friendNo)
	    );

	    int room = (existingRoom == null || existingRoom == 0)
	        ? privateChatService.createPrivateChatRoom(myNo, friendNo)
	        : existingRoom;

	    List<PrivateChatLogVO> chatLogs = privateChatService.getChatLogsByRoomNo(room);
	    
	    if (chatLogs == null) {
	        System.out.println("chatLogs가 null입니다.");
	    } else {
	        System.out.println("chatLogs 크기: " + chatLogs.size());
	    }
	    
	    chatLogs.forEach(chatLog -> {
	        if (chatLog == null) {
	            System.out.println("chatLog가 null입니다."); // 디버깅용
	            return;
	        }

	        String log = chatLog.getChatLog();
	        if (log != null && log.contains(":")) {
	            String[] parts = log.split(":", 2);
	            if (parts.length == 2) {
	                chatLog.setSender(parts[0]);
	                chatLog.setMsg(parts[1]);
	            }
	        } else {
	            System.out.println("유효하지 않은 chatLog 포맷: " + log);
	            chatLog.setSender("알 수 없음");
	            chatLog.setMsg(log != null ? log : "");
	        }
	    });
	    
	    // List<ChatLogVO>를 JSON으로 변환
	    ObjectMapper objectMapper = new ObjectMapper();
	    String chatLogsJson = "";
	    try {
	        chatLogsJson = objectMapper.writeValueAsString(chatLogs);
	    } catch (JsonProcessingException e) {
	        e.printStackTrace();
	        chatLogsJson = "[]"; // 예외 발생 시 빈 배열로 설정
	    }
	    
	    model.addAttribute("chatLogsJson", chatLogsJson);

	    model.addAttribute("chatLogs", chatLogs);
	    model.addAttribute("currentNick", myNick);
	    model.addAttribute("currentNo", myNo);
	    model.addAttribute("friendNick", friend.getMem_nick());
	    model.addAttribute("friendNo", friendNo);
	    model.addAttribute("roomNo", room);

	    return "chat/privateChatRoom";
	}

}
