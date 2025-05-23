package org.joonzis.controller;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.joonzis.domain.EventVO;
import org.joonzis.domain.MemberVO;
import org.joonzis.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/event/*")
public class EventController {

	
	@Autowired
	private EventService eservice;
	
	@GetMapping("/eventMain") // URL 매핑 수정
    public String eventMain(Model model, HttpSession session) {
        MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
        if (loggedInMember == null) {
            // 로그인되지 않은 경우 처리 (예: 로그인 페이지로 리다이렉트)
            return "redirect:/login/loginPage?redirectUrl=" + URLEncoder.encode("/event/eventMain", StandardCharsets.UTF_8);
        }
        return "/event/main";
    }
	
	@ResponseBody
	@GetMapping(value = "/list/0001", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<EventVO> eventTab1() {
		return eservice.getGame1Rank();
	}
	@ResponseBody
	@GetMapping(value = "/list/0001/myScore", produces = MediaType.APPLICATION_JSON_VALUE)
	public EventVO eventTab1MyScore(HttpSession session) {
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		int mem_no = loggedInMember.getMem_no();
		return eservice.getMyGame1Rank(mem_no);
	}
	@ResponseBody
	@GetMapping(value = "/list/0002", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<EventVO> eventTab2() {
		return eservice.getGame2Rank();
	}
	@ResponseBody
	@GetMapping(value = "/list/0002/myScore", produces = MediaType.APPLICATION_JSON_VALUE)
	public EventVO eventTab2MyScore(HttpSession session) {
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		int mem_no = loggedInMember.getMem_no();
		return eservice.getMyGame2Rank(mem_no);
	}
	
	@ResponseBody
	@GetMapping(value = "/list/point", produces = MediaType.APPLICATION_JSON_VALUE)
	public EventVO eventTab3(HttpSession session) {
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		int mem_no = loggedInMember.getMem_no();
		return eservice.getPoint(mem_no);
	}

	@GetMapping("/list/0004")
	public void eventTab4() {
	}
	
	
	@PostMapping(value = "/event/savePoint", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> savePoint(@RequestBody EventVO vo, HttpSession session) {
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		if (loggedInMember == null) {
		    return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
		}
		int mem_no = loggedInMember.getMem_no();
		boolean result=eservice.savePoint(mem_no, vo.getPoint());
		return new ResponseEntity<Boolean>(result,HttpStatus.OK);
	}
	@PostMapping(value = "/event/saveGameScore1", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> saveGameScore1(@RequestBody EventVO vo, HttpSession session) {
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		if (loggedInMember == null) {
		    return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
		}
		int mem_no = loggedInMember.getMem_no();
		boolean result=eservice.saveGameScore1(mem_no, vo.getGame_score_1());
		return new ResponseEntity<Boolean>(result,HttpStatus.OK);
	}
	@PostMapping(value = "/event/saveGameScore2", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> saveGameScore2(@RequestBody EventVO vo, HttpSession session) {
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		if (loggedInMember == null) {
			return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
		}
		int mem_no = loggedInMember.getMem_no();
		boolean result=eservice.saveGameScore2(mem_no, vo.getGame_score_2());
		return new ResponseEntity<Boolean>(result,HttpStatus.OK);
	}

	@PostMapping(value = "/event/checkAttendance", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> checkAttendance(@RequestBody EventVO vo, HttpSession session) {
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		int mem_no = loggedInMember.getMem_no();
		boolean result=eservice.checkAttendance(mem_no, vo.getAttendance_date());
		return new ResponseEntity<Boolean>(result,HttpStatus.OK);
	}
	@ResponseBody
	@PostMapping(value = "/event/loadAttendance", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Integer> loadAttendance(@RequestBody EventVO vo, HttpSession session) {
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		int mem_no = loggedInMember.getMem_no();
		return eservice.loadAttendance(mem_no, vo.getYear(), vo.getMonth());
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}