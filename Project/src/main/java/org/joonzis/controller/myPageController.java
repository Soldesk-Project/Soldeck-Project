package org.joonzis.controller;

import java.util.ArrayList;
import java.util.List;

import org.joonzis.domain.BookMarkVO;
import org.joonzis.domain.GroupVO;
import org.joonzis.service.GroupService;
import org.joonzis.domain.MemberVO;
import org.joonzis.domain.RestVO;
import org.joonzis.service.MemberService;
import org.joonzis.service.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/mypage/*")
public class myPageController {

	@Autowired
	private MemberService service;
	@Autowired
	private RestService rservice;
	
	@Autowired
	private GroupService groupService;
	
	@GetMapping("/myInfo")
	public String myInfo(Model model) {
//	public String myInfo(Model model, @RequestParam("mem_no") int mem_no) {
		int mem_no=118;

		log.info("myInfo..."+mem_no);
		int foodKate[]=service.getFoodKateInfo(mem_no);
		List<String> foodList = new ArrayList<>();
	    for (int f : foodKate) {
	        String foodName = changeFoodNoToName(f);
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
	public String modifyInfo(Model model) {
//	public String modifyInfo(Model model, @RequestParam("mem_no") int mem_no) {
		int mem_no=118;
		
		log.info("modifyInfo..."+mem_no);
		int foodKate[]=service.getFoodKateInfo(mem_no);
		List<String> foodList = new ArrayList<>();
	    for (int f : foodKate) {
	        String foodName = changeFoodNoToName(f);
	        foodList.add(foodName);
	    }
	    model.addAttribute("member",service.getMemberInfo(mem_no));
	    model.addAttribute("foodList",foodList);	    
		return "/mypage/modifyInfo";
	}
	@Transactional
	@PostMapping("modifyInfo")
	public String modifyInfo(MemberVO vo,RedirectAttributes rttr, 
							 @RequestParam(value = "profileImageInput", required = false) MultipartFile profileImage,
							 @RequestParam(value = "food", required = false) List<Integer> interests
							) {
		log.info(vo);
		
		// food_kate 테이블 데이터 삭제
		service.deleteFoodKate(vo.getMem_no());
		// 데이터 삽입
		for (Integer food_no : interests) {
			service.insertFoodKate(vo.getMem_no(), food_no);
		}
		if (service.modify(vo)) {
			rttr.addFlashAttribute("result","success");
		}
		return "redirect:/mypage/myInfo";
	}
	
	
	@GetMapping("/bookmark")
	public String bookmark(Model model) {
//	public String bookmark(Model model, @RequestParam("mem_no") int mem_no) {
		int mem_no=118;
		
		log.info("bookmark..."+mem_no);
		
		
//		List<Integer> rest_no=service.getBookMarkRestNo(mem_no);

		List<BookMarkVO> bookmarkList = service.getBookMark(mem_no);
		for (BookMarkVO bm : bookmarkList) {
//		    bm.setRest(rservice.getRestList(bm.getRest_no()));
		    RestVO rest = rservice.getRest(bm.getRest_no());
	        bm.setRest(rest);
		}
		model.addAttribute("bookmarkList", bookmarkList);

		
		
//		List<RestVO> restList=new ArrayList<RestVO>();
//		for (int i : rest_no) {
//			restList.add(rservice.getRestList(i));
//		}
//		model.addAttribute("rest", restList);
//		model.addAttribute("bookmarkList",service.getBookMark(mem_no));
		log.info("is_public"+service.getBookMark(mem_no));
		
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
