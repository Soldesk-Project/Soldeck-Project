package org.joonzis.controller;

import java.util.List;

import org.joonzis.domain.RestVO;
import org.joonzis.service.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@GetMapping(value = "/search")
	public String searchPage() {
		log.info("search...");
		return "/search/search";
	}
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
	
	/*
	 * @GetMapping(value = "/search/data", produces =
	 * MediaType.APPLICATION_JSON_VALUE) public ResponseEntity<List<RestVO>>
	 * searchData() { log.info("searchData..."); return new
	 * ResponseEntity<List<RestVO>>(service.getList(), HttpStatus.OK); }
	 */
	
	// 지역 페이지
	@GetMapping("/location")
	public String location() {
		log.info("location...");
		return "/search/location";
	}
	// JSON 데이터 반환 (AJAX 요청용)
	@GetMapping(value = "/location/data", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RestVO>> locationData(@RequestParam(value = "region", required = false) String region,
														@RequestParam(value = "category", required = false) String category) {
		log.info("locationData..." + " region : " + region + " category : " + category);
		return new ResponseEntity<List<RestVO>>(service.getFilteredList(region, category), HttpStatus.OK);
	}
	// 상세 페이지
	@GetMapping(value = "/view", produces = MediaType.APPLICATION_JSON_VALUE)
	public String view(@RequestParam(value = "rest_no") int rest_no, Model model) {
		log.info("view..." + rest_no);
		model.addAttribute("rest_no", rest_no);
		return "/search/view";
	}
	// 상세 페이지
	@GetMapping(value = "/view/{rest_no}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RestVO>> getview(@PathVariable(value = "rest_no") int rest_no) {
		log.info("getview..." + rest_no);
		return new ResponseEntity<List<RestVO>>(service.get(rest_no), HttpStatus.OK);
	}
}