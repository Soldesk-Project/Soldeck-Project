package org.joonzis.controller;

import java.util.Arrays;
import java.util.List;

import org.joonzis.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/alarm")
public class AlarmController {

	@Autowired
	private MemberService mservice;

	@GetMapping("/list")
	@ResponseBody
    public ResponseEntity<List<String>> getAlarms() {
        // 지금은 테스트용
        List<String> dummyAlarms = Arrays.asList(
            "친구 요청이 도착했습니다.",
            "예약이 확정되었습니다.",
            "새로운 댓글이 달렸습니다."
        );

        return ResponseEntity.ok(dummyAlarms);
    }
}
