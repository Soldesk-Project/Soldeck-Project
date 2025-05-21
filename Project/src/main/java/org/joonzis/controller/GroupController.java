package org.joonzis.controller;

import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.joonzis.domain.GroupDTO;
import org.joonzis.domain.GroupMemberDTO;
import org.joonzis.domain.GroupVO;
import org.joonzis.domain.MemberVO;
import org.joonzis.service.GroupService;
import org.joonzis.websoket.FriendSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
	
	 @GetMapping("/main") // 그룹 메인 페이지 요청 처리
	    public String groupMain(HttpSession session, Model model) {
	        log.info("그룹 메인 페이지 요청");
	        MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
	        if (member == null) {
	            return "redirect:/login/loginPage"; // 로그인 안 되어 있으면 로그인 페이지로 리다이렉트
	        }
	        model.addAttribute("mem_no", member.getMem_no()); // JS에서 mem_no 활용 가능
	        return "grouplist/groupList"; // 그룹 목록 페이지 JSP 파일 경로
	    }
	
	// 그룹 생성 및 채팅방 생성
	@Transactional
	@ResponseBody
	@PostMapping("/createGroup")
	public ResponseEntity<String> createGroup(@RequestBody GroupDTO dto, HttpSession session, Model model) {
	    log.info("create..." + dto);
	    MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다");
        }
        dto.setMem_no(member.getMem_no());  // 회원 번호 설정
        dto.setMax_mem(10);  // 최대 인원 설정

        int result = service.createGroupAndChatRoom(dto);  // 그룹과 채팅방을 함께 생성
	    
        log.info(".............."+dto.getGroup_no());
	    for(int interests:dto.getFoodList()) {
	    	service.insertFoodKate(dto.getGroup_no(), interests);
	    }
	    
	    if (result > 0) {
	        return ResponseEntity.ok("성공");
	    } else {
	    	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("그룹 생성 실패");
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
	public List<GroupMemberDTO> getGroupListData(HttpSession session) {
		 MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
	     if (member == null) {
	        return Collections.emptyList();  // 로그인 안 되어 있으면 빈 리스트 반환
	    }
	
	    int mem_no = member.getMem_no();
	    return service.getAllGroups(mem_no);  // JSON 응답
	}
	
	@PostMapping("/unfollow")
    @ResponseBody
    public ResponseEntity<String> unfollow(@RequestParam("group_no") int group_no, HttpSession session) {
		MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다");
        }
        
        service.removeGroup(group_no, member.getMem_no());  // 관계 삭제
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
	    List<GroupDTO> result;
	    if (group_no == null) {
	        // 내가 속한 그룹이 없을 때: 필터 없이 전체 중에서 추천
	        result = service.getRandomGroupListWithoutFilter(mem_no);
	    } else {
	        // 정상적으로 group_no 조회되었을 때
	        result = service.getRandomGroupList(group_no, mem_no);
	    }
	    for(GroupDTO gdto:result) {
	    	gdto.setFoodList(service.getGroupFoodKate(gdto.getGroup_no()));
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
    
    @PostMapping(value = "/follow", produces = "text/plain;charset=UTF-8")
    @ResponseBody
    public ResponseEntity<String> follow(@RequestParam("group_no") int group_no, HttpSession session) {
    	MemberVO member = (MemberVO) session.getAttribute("loggedInUser");
        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다");
        }
        boolean sent = service.insertGroupRequset(group_no, member.getMem_no());
        if (sent) {
            // 웹소켓 알림 전송
            //String msg = member.getMem_nick() + "님이 친구 요청을 보냈습니다.";
        	friendSocketHandler.sendGroupRequestAlert(group_no, service.getGroupOwnerMemNo(group_no), member.getMem_no(), member.getMem_nick());
            return ResponseEntity.ok("요청이 전송되었습니다");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 요청을 보냈습니다");
        }
    }
    
    // 요청 수락
    @PostMapping("/accept")
    @ResponseBody
    public ResponseEntity<String> acceptRequest(@RequestParam("group_no") int group_no,
    											@RequestParam("mem_no") int request_mem_no,
                                                HttpSession session) {
        MemberVO member = (MemberVO) session.getAttribute("loggedInUser");

        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다");
        }

        service.acceptGroupRequest(group_no, request_mem_no);

        // UTF-8 인코딩 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/plain; charset=UTF-8"));
        
//        List<FriendReqVO> pendingRequest = fservice.getPendingRequest(member.getMem_no());
//        
//        ObjectMapper objectMapper = new ObjectMapper();
//        String pendingRequestJson = null;
//
//        try {
//            pendingRequestJson = objectMapper.writeValueAsString(pendingRequest);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//        
//        log.info(pendingRequestJson);
//
//        // 세션에 저장
//        if (pendingRequestJson != null) {
//        	session.setAttribute("pendingRequest", pendingRequestJson);
//        }

        return new ResponseEntity<>("그룹 가입 요청 수락", headers, HttpStatus.OK);
    }
    
 // 요청 거절
    @PostMapping("/declineFriend")
    @ResponseBody
    public ResponseEntity<String> declineFriend(@RequestParam("group_no") int group_no,
    											HttpSession session){
    	
    	MemberVO member = (MemberVO) session.getAttribute("loggedInUser");

        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다");
        }
        
    	service.declineGroupRequest(group_no, member.getMem_no());
    	
        // UTF-8 인코딩 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/plain; charset=UTF-8"));
        
//        List<FriendReqVO> pendingRequest = fservice.getPendingRequest(member.getMem_no());
//        
//        ObjectMapper objectMapper = new ObjectMapper();
//        String pendingRequestJson = null;
//
//        try {
//            pendingRequestJson = objectMapper.writeValueAsString(pendingRequest);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//        
//
//        // 세션에 저장
//        if (pendingRequestJson != null) {
//        	session.setAttribute("pendingRequest", pendingRequestJson);
//        }

        return new ResponseEntity<>("친구 거절 완료", headers, HttpStatus.OK);
    }

}
