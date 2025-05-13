package org.joonzis.controller;

import javax.servlet.http.HttpSession;

import org.joonzis.domain.MemberVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/community")
public class CommunityController {
	
	@GetMapping("/communityMain")
    public String communityMain(HttpSession session, Model model) {
        log.info("커뮤니티 메인 페이지 요청");
        MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
        if (loggedInMember == null) {
            // 로그인되지 않은 경우 로그인 페이지로 리다이렉트하고, 로그인 후 원래 페이지로 돌아가기 위한 URL 파라미터 추가
            return "redirect:/login/loginPage?redirectUrl=/community/communityMain";
        }
        model.addAttribute("includePage", "/WEB-INF/views/friendlist/friendList");
        return "community/communityMain";
    }

	@GetMapping("/content")
	public String getCommunityContent(@RequestParam("url") String url) {
	    switch (url) {
	        case "friend":
	            return "friendlist/friendList";
	        case "group":
	            return "grouplist/groupList";
	        case "chat":
	            return "chat/chatRoom";
	        case "event":
	            return "event/main";
	        case "minigame":
	            return "event/minigame";
	        default:
	            return "error/404";
	    }
	}

    // 다른 필요한 공통 기능이 있다면 여기에 추가할 수 있습니다.
}