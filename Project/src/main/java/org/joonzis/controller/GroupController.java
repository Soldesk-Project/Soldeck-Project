package org.joonzis.controller;

import org.joonzis.domain.GroupVO;
import org.joonzis.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/mypage/*")
public class GroupController {
	
	@Autowired
	private GroupService service;
	
	@ResponseBody
	@PostMapping(value = "/createGroup" )
	public  ResponseEntity<String> createGroup(@RequestBody GroupVO vo, Model model) {
		log.info("create..." + vo);
		vo.setMemNo(100);
		vo.setMaxMem(10);
		int result = service.createGroup(vo);
		if(result > 0) {
			return ResponseEntity.ok().body("{\"redirect\":\"/mypage/club\"}");			
		}else {
			model.addAttribute("msg", "그룹 생성 실패");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\":\"그룹 생성 실패\"}");
		}
	}

}
