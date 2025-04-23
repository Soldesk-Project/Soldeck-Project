package org.joonzis.controller;

import java.util.ArrayList;
import java.util.List;

import org.joonzis.domain.GroupVO;
import org.joonzis.service.GroupService;
import org.joonzis.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/mypage/*")
public class myPageController {

	@Autowired
	private MemberService service;
	
	@Autowired
	private GroupService groupService;
	
	@GetMapping("/myInfo")
	public String myInfo(Model model) {
//	public String myInfo(Model model, @RequestParam("mem_no") int mem_no) {
		int mem_no=102;

		log.info("myInfo...");
		int foodKate[]=service.getFoodKateInfo(mem_no);
		List<String> foodList = new ArrayList<>();
	    for (int f : foodKate) {
	        String foodName = changeFoodNoToName(f); // 변환 로직 구현 필요
	        foodList.add(foodName);
	    }
		
		model.addAttribute("member",service.getMemberInfo(mem_no));
		model.addAttribute("foodList",foodList);
		return "/mypage/myInfo";
	}
	private String changeFoodNoToName(int no) {
	    switch(no) {
	        case 1: return "한식";
	        case 2: return "중식";
	        case 3: return "일식";
	        case 4: return "양식";
	        case 5: return "베트남음식";
	        default: return "";
	    }
	}
	@GetMapping("/modifyInfo")
	public String modifyInfo(Model model, @RequestParam("mem_no") int mem_no) {
		log.info("modifyInfo..."+mem_no);
		model.addAttribute("member",service.getMemberInfo(mem_no));
		return "/mypage/modifyInfo";
	}
	
	
	
	
	
	
	
	
	
	@GetMapping("/bookmark")
	public String bookmark() {
		log.info("bookmark...");
		return "/mypage/bookmark";
	}
	
	@GetMapping("/booking")
	public String booking() {
		log.info("booking...");
		return "/mypage/booking";
	}
	@GetMapping("/review")
	public String review() {
		log.info("review...");
		return "/mypage/review";
	}
	@GetMapping("/club")
	public String club(Model model) {
		log.info("club...");
		List<GroupVO> groups = groupService.getAllGroups();
		model.addAttribute("groupList", groups);
		return "/mypage/club";
	}
	@GetMapping("/event")
	public String event() {
		log.info("event...");
		return "/mypage/event";
	}
}
