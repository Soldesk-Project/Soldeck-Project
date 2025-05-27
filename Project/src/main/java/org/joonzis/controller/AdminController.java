package org.joonzis.controller;

import org.joonzis.domain.Criteria;
import org.joonzis.domain.PageDTO;
import org.joonzis.service.AdminService;
import org.joonzis.service.GroupService;
import org.joonzis.service.MemberService;
import org.joonzis.service.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private RestService restService;
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private GroupService groupService;
	
	@GetMapping("/member")
    public String adminMemberPage(Model model, Criteria cri) {
		
		int total = adminService.getTotalMemberRecordCount();
	    PageDTO pdto = new PageDTO(cri, total);

	    model.addAttribute("list", adminService.getAllMemberWithPaging(cri));
	    model.addAttribute("pageMaker", pdto);
	    
	    return "admin/member";
    }
	
	@GetMapping("/group")
    public String adminGroupPage(Model model, Criteria cri) {
		
		int total = adminService.getTotalGroupRecordCount();
	    PageDTO pdto = new PageDTO(cri, total);

	    model.addAttribute("list", adminService.getAllGroupWithPaging(cri));
	    model.addAttribute("pageMaker", pdto);
        return "admin/group";  // templates/admin/adminPage.html 반환
    }
	
	@GetMapping("/restaurant")
	public String adminRestaurantPage(Model model, Criteria cri) {
		
		int total = adminService.getTotalRestRecordCount(cri);
		PageDTO pdto = new PageDTO(cri, total);
		
		model.addAttribute("list", adminService.getRestWithPaging(cri));
		model.addAttribute("pageMaker", pdto);
		
		return "admin/restaurant";
	}

	@GetMapping("/add")
    public String adminRestaurantAdd() {
        return "admin/add";
    }
	
	@PostMapping("/deleteMember")
	public String deleteMember(@RequestParam("mem_no") int mem_no) {
		memberService.removeMember(mem_no);
		
		return "redirect:/admin/member";
	}
	
	@PostMapping("/deleteRestaurnt")
	public String deleteRestaurnt(@RequestParam("rest_no") int rest_no) {
		restService.deleteRestaurnt(rest_no);
		
		return "redirect:/admin/restaurant";
		
	}
	@PostMapping("/deleteGroup")
	public String deleteGroup(@RequestParam("group_no") int group_no, @RequestParam("mem_no") int mem_no) {
		groupService.remove(group_no, mem_no);
		
		return "redirect:/admin/group";
	}
}
