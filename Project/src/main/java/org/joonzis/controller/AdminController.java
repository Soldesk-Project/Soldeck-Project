package org.joonzis.controller;

import org.joonzis.domain.Criteria;
import org.joonzis.domain.PageDTO;
import org.joonzis.service.AdminService;
import org.joonzis.service.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@GetMapping("/update")
	public String adminRestaurantUpdate(Model model, @RequestParam("rest_no") int rest_no) {
		model.addAttribute("restVO", restService.get(rest_no)); // RestVO
		model.addAttribute("menuList", "매장메뉴리스트"); // List<MenuVO>
		return "admin/update";
	}
}
