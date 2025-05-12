package org.joonzis.controller;

import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.joonzis.domain.GroupVO;
import org.joonzis.domain.MemberVO;
import org.joonzis.service.GroupService;
import org.joonzis.websoket.FriendSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/grouplist")
public class GroupController {
	
	@Autowired
	private GroupService service;
	
	@Autowired
	private FriendSocketHandler friendSocketHandler;
	
	// 그룹 생성 및 채팅방 생성
	@ResponseBody
	@PostMapping("/createGroup")
	public ResponseEntity<String> createGroup(@RequestBody GroupVO vo, Model model) {
	    log.info("create..." + vo);

	    vo.setMem_no(100);  // 회원 번호 설정
	    vo.setMax_mem(10);  // 최대 인원 설정

	    int result = service.createGroupAndChatRoom(vo);  // 그룹과 채팅방을 함께 생성

	    if (result > 0) {
	        return ResponseEntity.ok().body("{\"redirect\":\"/mypage/club\"}");
	    } else {
	        model.addAttribute("msg", "그룹 생성 실패");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\":\"그룹 생성 실패\"}");
	    }
	}
	
	@GetMapping("/groupList")
    public String getGroupListPage(HttpSession session, Model model) {
        MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
        if (member == null) {
            return "redirect:/login/loginPage";
        }

        model.addAttribute("mem_no", member.getMem_no());  // JS에서 mem_no 활용 가능
        return "grouplist/groupList";  // JSP 파일 반환
    }
	
	@GetMapping(value = "/groupListData", produces = "application/json")
	@ResponseBody
	public List<GroupVO> getGroupListData(HttpSession session) {
		 MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
	     if (member == null) {
	        return Collections.emptyList();  // 로그인 안 되어 있으면 빈 리스트 반환
	    }
	
	    int mem_no = member.getMem_no();
	    return service.getGroupList(mem_no);  // JSON 응답
	}
	
	@PostMapping("/unfollow")
    @ResponseBody
    public ResponseEntity<String> unfollow(@RequestParam("mem_no") int MemNo,
                                           HttpSession session) {
        GroupVO group = (GroupVO) session.getAttribute("loggedInUser");
        if (group == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다");
        }

        service.removeGroup(group.getGroup_no(), MemNo);  // 관계 삭제
        return ResponseEntity.ok("삭제 완료");
    }
	    
	@GetMapping(value = "/groupListRecommendData", produces = "application/json")
	@ResponseBody
	public ResponseEntity<?> getGroupListRecommendData(HttpSession session) {
	    MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
	    if (member == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
	    }

	    int mem_no = member.getMem_no();

	    // group_no 조회
	    Integer group_no = null;
	    try {
	        group_no = service.getGroupNoByMember(mem_no);  // 이 메서드는 반드시 있어야 함
	    } catch (Exception e) {
	        // group_no 조회 실패 시 null로 처리
	        group_no = null;
	    }

	    List<GroupVO> result;
	    if (group_no == null) {
	        // 내가 속한 그룹이 없을 때: 필터 없이 전체 중에서 추천
	        result = service.getRandomGroupListWithoutFilter(mem_no);
	    } else {
	        // 정상적으로 group_no 조회되었을 때
	        result = service.getRandomGroupList(group_no, mem_no);
	    }

	    return ResponseEntity.ok(result);
	}
	
	@GetMapping(value = "/search", produces = "application/json")
    @ResponseBody
    public List<GroupVO> searchGroup(@RequestParam("keyword") String keyword) {
        return service.getSimpleSearch("%" + keyword + "%");
    }
	
	@GetMapping(value = "/memberGroupListData", produces = "application/json")
	@ResponseBody
	public List<GroupVO> memberGroupListData(HttpSession session) {
		 MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
	     if (member == null) {
	        return Collections.emptyList();
	    }
	
	    int mem_no = member.getMem_no();
	    return service.getGroupListByMember(mem_no);
	}
    
    @PostMapping(value = "/follow", produces = "application/json;charset-UTF-8")
    @ResponseBody
    public ResponseEntity<String> follow(@RequestParam("senderMemNo") int senderMemNo, HttpSession session) {
    	
    	MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
        
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다");
        }

        boolean sent = service.insertGroupRequset(22, senderMemNo);

        if (sent) {
            // 웹소켓 알림 전송
            //String msg = member.getMem_nick() + "님이 친구 요청을 보냈습니다.";
        	friendSocketHandler.sendFriendRequestAlert(22, senderMemNo, member.getMem_nick());
            return ResponseEntity.ok("요청이 전송되었습니다");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 요청을 보냈습니다");
        }
    }

}
