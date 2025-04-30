package org.joonzis.controller;

import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.joonzis.domain.FriendVO;
import org.joonzis.domain.MemberVO;
import org.joonzis.service.FriendService;
import org.joonzis.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/friendlist")
public class FriendController {
	
	@Autowired
	FriendService fservice;
	
	@Autowired
	MemberService service;
	
	//@GetMapping("/friendList")
	//public void getFriendList() {
	//	log.info("친구 페이지");
	//}
	
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

    @GetMapping("/friendList")
    public String getFriendListPage(HttpSession session, Model model) {
        MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
        if (member == null) {
            return "redirect:/login/loginPage";
        }

        model.addAttribute("mem_no", member.getMem_no());  // JS에서 mem_no 활용 가능
        return "friendlist/friendList";  // JSP 파일 반환
    }

    @GetMapping(value = "/friendListData", produces = "application/json")
    @ResponseBody
    public List<FriendVO> getFriendListData(HttpSession session) {
        MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
        if (member == null) {
            return Collections.emptyList();  // 로그인 안 되어 있으면 빈 리스트 반환
        }

        int mem_no = member.getMem_no();
        return fservice.getFriendList(mem_no);  // JSON 응답
    }
	
    @PostMapping("/unfollow")
    @ResponseBody
    public ResponseEntity<String> unfollow(@RequestParam("friend_mem_no") int friendMemNo,
                                           HttpSession session) {
        MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다");
        }

        fservice.removeFriend(member.getMem_no(), friendMemNo);  // 관계 삭제
        return ResponseEntity.ok("삭제 완료");
    }
    
    @GetMapping(value = "/friendListRecommendData", produces = "application/json")
    @ResponseBody
    public List<FriendVO> getFriendRandomListData(HttpSession session) {
        MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
        if (member == null) {
            return Collections.emptyList();  // 로그인 안 되어 있으면 빈 리스트 반환
        }

        int mem_no = member.getMem_no();
        return fservice.getRandomFriendList(mem_no);  // JSON 응답
    }
}
