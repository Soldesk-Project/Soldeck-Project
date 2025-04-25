package org.joonzis.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.joonzis.domain.MemberVO;
import org.joonzis.domain.ReserveVO;
import org.joonzis.domain.RestVO;
import org.joonzis.service.MemberService;
import org.joonzis.service.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/search")
public class SearchController {
	
	@Autowired
	private RestService service;
	
	@Autowired
	private MemberService memberService;
	
	@GetMapping(value = "/search")
	public String searchPage(@RequestParam(value = "keyword", required = false, defaultValue = "") String keyword, Model model) {
		log.info("search..." + "keyword : " + keyword);
		model.addAttribute("keyword", keyword);
		return "/search/search";
	}
//	@GetMapping(value = "/search")
//	public String searchPage() {
//		log.info("search...");
//		return "/search/search";
//	}
	// search페이지 필터기능
	@GetMapping(value = "/search/filterData", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RestVO>> filterData(@RequestParam(value = "region", required = false) String region,
			@RequestParam(value = "category", required = false) String category) {
		log.info("filterData..." + " region : " + region + " category : " + category);
		return new ResponseEntity<List<RestVO>>(service.getFilteredList(region, category), HttpStatus.OK);
	}
	
	// search페이지 검색기능
	@GetMapping(value = "/search/searchData", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<RestVO>> searchData(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "region", required = false) String region,
            @RequestParam(value = "category", required = false) String category) {
        log.info("searchData... keyword: " + keyword + ", region: " + region + ", category: " + category);
        if (keyword == null || keyword.trim().isEmpty()) {
            log.info("Search keyword is empty, proceeding with region and category filters");
        }

        List<RestVO> list = service.getSearchList(keyword, region, category);
        list.forEach(rest -> {
            if (rest.getRest_img_name() == null || rest.getRest_img_name().isEmpty()) {
                rest.setRest_img_name("/resources/images/noImage.png");
            }
        });
        log.info("Returning data: " + list.size() + " items");
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
	
	// 지역 페이지
	@GetMapping("/location")
	public String location(@RequestParam(value = "region", required = false) String region,
							@RequestParam(value = "category", required = false) String category,
							Model model) {
		log.info("location..." + " region : " + region + " category : " + category);
		model.addAttribute("category", category);
		model.addAttribute("region",region);
		return "/search/location";
	}
	// JSON 데이터 반환 (AJAX 요청용)
	@GetMapping(value = "/location/data", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RestVO>> locationData(@RequestParam(value = "region", required = false) String region,
														@RequestParam(value = "category", required = false) String category) {
		log.info("locationData..." + " region : " + region + " category : " + category);
		return new ResponseEntity<List<RestVO>>(service.getFilteredList(region, category), HttpStatus.OK);
	}
	
	// 상세 페이지 이동
	@GetMapping(value = "/view")
	public String view(@RequestParam(value = "rest_no") int rest_no, Model model, HttpSession session) {
	    log.info("view..." + rest_no);
	    MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
	    if (loggedInMember != null) {
	        log.info("loggedInMember: " + loggedInMember);
	        model.addAttribute("member", loggedInMember);
	    } else {
	        log.warn("No logged-in user found in session");
	        model.addAttribute("member", new MemberVO()); // 비로그인 시 빈 MemberVO 객체
	    }
	    model.addAttribute("rest_no", rest_no);
	    return "/search/view"; // /search/view.jsp 렌더링
	}

	// 상세 페이지 데이터 가져오기
	@GetMapping(value = "/view/{rest_no}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RestVO>> getview(@PathVariable(value = "rest_no") int rest_no, HttpSession session) {
	    log.info("getview..." + rest_no);
	    List<RestVO> storeList = service.get(rest_no);
	    if (storeList == null || storeList.isEmpty()) {
	        log.warn("No store found for rest_no: {}" + rest_no);
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	    return new ResponseEntity<>(storeList, HttpStatus.OK);
	}
	
	// 예약하기
	@PostMapping("/reservations/add")
	public ResponseEntity<Map<String, Object>> addReservation(@RequestBody ReserveVO reservation) {
	    log.info("addReservation..." + reservation);
	    try {
	        service.addReserve(reservation);
	        Map<String, Object> response = new HashMap<>();
	        response.put("status", "success");
	        response.put("message", "예약 성공");
	        return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        log.error("예약 실패: " + e.getMessage());
	        Map<String, Object> response = new HashMap<>();
	        response.put("status", "error");
	        response.put("message", "예약 실패: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}
	
	//예약한 시간 가져오기
	@GetMapping("/reservations/times")
    public ResponseEntity<Map<String, Object>> getReservedTimes(
            @RequestParam("rest_no") int rest_no,
            @RequestParam("res_date") String res_date) {
		log.info("getReservedTimes..." + rest_no + res_date);
        try {
            List<String> reservedTimes = service.getReservedTimes(rest_no, res_date);
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("reservedTimes", reservedTimes);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("예약된 시간 조회 실패: ", e);
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "예약된 시간 조회 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}