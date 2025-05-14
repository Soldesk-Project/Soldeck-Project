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
        log.info("eventMain...");
        return "/event/main";
    }
	
	@GetMapping(value = "/list/0001", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<EventVO> eventTab1() {
		log.info("eventTab...1");
		return eservice.getGame1Rank();
	}
	@GetMapping(value = "/list/0001/myScore", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public EventVO eventTab1MyScore(HttpSession session) {
		log.info("eventTab...1-1");
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		int mem_no = loggedInMember.getMem_no();
		return eservice.getMyGame1Rank(mem_no);
	}
	@GetMapping("/list/0002")
	public void eventTab2() {
		log.info("eventTab...2");
	}
	
	@GetMapping("/list/0003")
	public void eventTab4(Model model, HttpSession session) {
		log.info("eventTab...3");
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		int mem_no = loggedInMember.getMem_no();
		model.addAttribute("point", eservice.getPoint(mem_no));
		log.info(eservice.getPoint(mem_no));
	}

	@GetMapping("/list/0004")
	public void eventTab3() {
		log.info("eventTab...4");
	}
	
	
	@PostMapping(value = "/event/savePoint", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> savePoint(@RequestBody EventVO vo, HttpSession session) {
		log.info("savePoint...");
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
		log.info("saveGameScore1...");
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		if (loggedInMember == null) {
		    return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
		}
		int mem_no = loggedInMember.getMem_no();
		int gameScore1=eservice.getGameScore1(mem_no);
		if (gameScore1<vo.getGame_score_1()) {
			boolean result=eservice.saveGameScore1(mem_no, vo.getGame_score_1());
			return new ResponseEntity<Boolean>(result,HttpStatus.OK);
		}else {
			return new ResponseEntity<Boolean>(false,HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}