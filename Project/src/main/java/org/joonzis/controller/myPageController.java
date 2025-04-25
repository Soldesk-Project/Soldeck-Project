package org.joonzis.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.joonzis.domain.BookMarkVO;
import org.joonzis.domain.GroupVO;
import org.joonzis.domain.MemberVO;
import org.joonzis.domain.ReserveRestDTO;
import org.joonzis.domain.ReserveVO;
import org.joonzis.domain.RestVO;
import org.joonzis.service.BookmarkService;
import org.joonzis.service.GroupService;
import org.joonzis.service.MemberService;
import org.joonzis.service.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	private BookmarkService bservice;
	@Autowired
	private GroupService groupService;
	
	
	
	
	@GetMapping("/myInfo")
	public String myInfo(Model model, HttpSession session) {
//	public String myInfo(Model model, @RequestParam("mem_no") int mem_no) {
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		if (loggedInMember == null) {
			// 로그인되지 않은 경우 처리 (예: 로그인 페이지로 리다이렉트)
			return "redirect:/login/loginPage";
		}
		int mem_no = loggedInMember.getMem_no();

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
	public String modifyInfo(Model model, HttpSession session) {
//	public String modifyInfo(Model model, @RequestParam("mem_no") int mem_no) {
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		if (loggedInMember == null) {
			return "redirect:/login/loginPage";
		}
		int mem_no = loggedInMember.getMem_no();
		
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
	public String modifyInfo(MemberVO vo, RedirectAttributes rttr,
	                         @RequestParam(value = "profileImageInput", required = false) MultipartFile profileImage,
	                         @RequestParam(value = "food", required = false) List<Integer> interests,
	                         HttpSession session
	) {

	    MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
	    if (loggedInMember == null) {
	        return "redirect:/login/loginPage";
	    }
	    vo.setMem_no(loggedInMember.getMem_no());

	    log.info("수정 요청 데이터: " + vo);

	    if (profileImage != null && !profileImage.isEmpty()) {
	        String originalFilename = profileImage.getOriginalFilename();
	        // 회원 가입 시와 동일한 파일명 생성 규칙 적용 (저장 경로는 제외)
	        String storedFilename = loggedInMember.getMem_id() + "_" + System.currentTimeMillis() + "_" + originalFilename;
	        vo.setMem_img(storedFilename); // MemberVO에 새로운 이미지 파일명 설정
	        log.info("새로운 이미지 파일명 설정: {}"+ storedFilename);
	    } else {
	        MemberVO currentMemberInfo = service.getMemberInfo(loggedInMember.getMem_no());
	        vo.setMem_img(currentMemberInfo.getMem_img()); // 기존 이미지 유지
	        log.info("기존 이미지 유지: {}"+ vo);
	    }

	    // food_kate 테이블 데이터 삭제
	    service.deleteFoodKate(vo.getMem_no());
	    // 데이터 삽입
	    if (interests != null) {
	        for (Integer food_no : interests) {
	            service.insertFoodKate(vo.getMem_no(), food_no);
	        }
	    }
	    if (service.modify(vo)) {
	        rttr.addFlashAttribute("result", "success");
	    }
	    return "redirect:/mypage/myInfo";
	}
	
	
	@GetMapping("/bookmark")
	public String bookmark(Model model) {
//	public String bookmark(Model model, @RequestParam("mem_no") int mem_no) {
		int mem_no=118;
		
		log.info("bookmark..."+mem_no);

		List<BookMarkVO> bookmarkList = bservice.getBookMark(mem_no);
		for (BookMarkVO bm : bookmarkList) {
		    RestVO rest = rservice.getRest(bm.getRest_no());
	        bm.setRest(rest);
		}
		model.addAttribute("bookmarkList", bookmarkList);

		return "/mypage/bookmark";
	}
	@PostMapping(value = "/bookmark/del", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> delBookmark(@RequestBody BookMarkVO vo) {
		log.info("delBookmark..."+vo.getMem_no()+","+vo.getRest_no());
		boolean result=bservice.deleteBookmark(vo.getMem_no(),vo.getRest_no());
		return new ResponseEntity<Boolean>(result,HttpStatus.OK);
	}
	@PostMapping(value = "/bookmark/add", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> addBookmark(@RequestBody BookMarkVO vo) {
		log.info("delBookmark..."+vo.getMem_no()+","+vo.getRest_no());
		boolean result=bservice.addBookmark(vo.getMem_no(),vo.getRest_no());
		return new ResponseEntity<Boolean>(result,HttpStatus.OK);
	}
	
	@GetMapping("/booking")
	public String booking(Model model) {
//	public String booking(Model model, @RequestParam("mem_no") int mem_no) {
		int mem_no=118;
		log.info("booking...");
		List<ReserveRestDTO> reserveList=rservice.getReserveList(mem_no);
		model.addAttribute("reserveList", reserveList);
		return "/mypage/booking";
	}
	@PostMapping(value = "/booking/del", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> cancelBooking(@RequestBody ReserveVO vo) {
		log.info("delBookmark..."+vo.getRes_no());
		boolean result=rservice.cancelBooking(vo.getRes_no());
		return new ResponseEntity<Boolean>(result,HttpStatus.OK);
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
