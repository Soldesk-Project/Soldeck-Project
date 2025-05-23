package org.joonzis.controller;

import java.util.List;

import org.joonzis.domain.GroupVO;
import org.joonzis.domain.MemberVO;
import org.joonzis.domain.RestVO;
import org.joonzis.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/adminPage")
    public String adminPage() {
        return "admin/adminPage";  // templates/admin/adminPage.html 반환
    }
	
	@GetMapping("/member")
    public String adminMemberPage(Model model) {
		List<MemberVO> memberList = adminService.getAllMember(); // 모든 회원 조회
        model.addAttribute("memberList", memberList);
        return "admin/member";  // templates/admin/adminPage.html 반환
    }
	
	@GetMapping("/group")
    public String adminGroupPage(Model model) {
		List<GroupVO> groupList = adminService.getAllGroup();
		model.addAttribute("groupList", groupList);
        return "admin/group";  // templates/admin/adminPage.html 반환
    }
	
	@GetMapping("/restaurant")
    public String adminRestaurantPage(Model model) {
		List<RestVO> restaurantList = adminService.getAllRestaurant();
		model.addAttribute("restaurantList", restaurantList);
        return "admin/restaurant";  // templates/admin/adminPage.html 반환
    }
}
