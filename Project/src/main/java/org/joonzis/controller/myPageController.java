package org.joonzis.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.joonzis.domain.BookMarkVO;
import org.joonzis.domain.CommentVO;
import org.joonzis.domain.GroupMemberDTO;
import org.joonzis.domain.MemberVO;
import org.joonzis.domain.ReserveRestDTO;
import org.joonzis.domain.ReserveVO;
import org.joonzis.domain.RestVO;
import org.joonzis.service.BookmarkService;
import org.joonzis.service.CommentService;
import org.joonzis.service.GroupService;
import org.joonzis.service.MemberService;
import org.joonzis.service.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping("/mypage/*")
public class myPageController {

	@Autowired
	private MemberService service;
	@Autowired
	private RestService rservice;
	@Autowired
	private BookmarkService bservice;
	@Autowired
	private GroupService groupService;
	@Autowired
	private CommentService cservice;
	@Value("${file.upload-dir}")
    private String uploadFolderPath;
	
	@GetMapping("/myInfo")
	public String myInfo(Model model, HttpSession session) {
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		if (loggedInMember == null) {
			// 로그인되지 않은 경우 처리 (예: 로그인 페이지로 리다이렉트)
			return "redirect:/login/loginPage";
		}
		int mem_no = loggedInMember.getMem_no();

		log.info("myInfo..."+mem_no);
		int foodKate[]=service.getFoodKateInfo(mem_no);
		List<String> foodList = new ArrayList<>();
	    for (int f : foodKate) {
	        String foodName = changeFoodNoToName(f);
	        foodList.add(foodName);
	    }
		
		model.addAttribute("member",service.getMemberInfo(mem_no));
		model.addAttribute("foodList",foodList);
		return "/mypage/myInfo";
	}
	
	private String changeFoodNoToName(int no) {
	    switch(no) {
	        case 1: return "한식";
	        case 2: return "중식";
	        case 3: return "일식";
	        case 4: return "양식";
	        case 5: return "베트남음식";
	        default: return "";
	    }
	}
	@GetMapping("/modifyInfo")
	public String modifyInfo(Model model, HttpSession session) {
		MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
		if (loggedInMember == null) {
			return "redirect:/login/loginPage";
		}
		int mem_no = loggedInMember.getMem_no();
		
		log.info("modifyInfo..."+mem_no);
		int foodKate[]=service.getFoodKateInfo(mem_no);
		List<String> foodList = new ArrayList<>();
	    for (int f : foodKate) {
	        String foodName = changeFoodNoToName(f);
	        foodList.add(foodName);
	    }
	    model.addAttribute("member",service.getMemberInfo(mem_no));
	    model.addAttribute("foodList",foodList);	    
		return "/mypage/modifyInfo";
	}
	@Transactional
	@PostMapping("modifyInfo")
	public String modifyInfo(MemberVO vo, RedirectAttributes rttr,
	                         @RequestParam(value = "profileImageInput", required = false) MultipartFile profileImage,
	                         @RequestParam(value = "food", required = false) List<Integer> interests,
	                         HttpSession session
	) {

	    MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
	    if (loggedInMember == null) {
	        return "redirect:/login/loginPage";
	    }
	    vo.setMem_no(loggedInMember.getMem_no());

	    log.info("수정 요청 데이터: " + vo);
	    log.info("Upload Folder Path: " + uploadFolderPath);

	    if (profileImage != null && !profileImage.isEmpty()) {
	        String originalFilename = profileImage.getOriginalFilename();
	        // 회원 가입 시와 동일한 파일명 생성 규칙 적용 (저장 경로는 제외)
	        String storedFilename = loggedInMember.getMem_id() + "_" + System.currentTimeMillis() + "_" + originalFilename;
	        vo.setMem_img(storedFilename); // MemberVO에 새로운 이미지 파일명 설정
	        try {
	            File saveFile = new File(uploadFolderPath, storedFilename);
	            profileImage.transferTo(saveFile);

	        } catch (Exception e) {
	            log.error("File upload failed: " + storedFilename, e);
	        }
	        log.info("새로운 이미지 파일명 설정: "+ storedFilename);
	    } else {
	        MemberVO currentMemberInfo = service.getMemberInfo(loggedInMember.getMem_no());
	        vo.setMem_img(currentMemberInfo.getMem_img()); // 기존 이미지 유지
	        log.info("기존 이미지 유지: "+ vo);
	    }
	    // food_kate 테이블 데이터 삭제
	    service.deleteFoodKate(vo.getMem_no());
	    // 데이터 삽입
	    if (interests != null) {
	        for (Integer food_no : interests) {
	            service.insertFoodKate(vo.getMem_no(), food_no);
	        }
	    }
	    if (service.modify(vo)) {
	        rttr.addFlashAttribute("result", "success");
	        
	        // 최신 회원 정보로 세션 갱신
	        MemberVO updatedMember = service.getMemberInfo(vo.getMem_no());
	        session.setAttribute("loggedInUser", updatedMember);
	    }
	    
	    
	    return "redirect:/mypage/myInfo";
	}
	
	@PostMapping("/removeMember")
	public String removeMember(@RequestParam("mem_no") int mem_no, HttpSession session, RedirectAttributes rttr) {
	    log.info("removeMember... mem_no: " + mem_no);

	    // 1. 회원 번호(mem_no)를 이용하여 데이터베이스에서 회원 정보 삭제
	    boolean isRemoved = service.removeMember(mem_no);

	    if (isRemoved) {
	        // 2. 탈퇴 성공 시 세션 무효화
	        session.invalidate();
	        rttr.addFlashAttribute("result", "removeSuccess");
	        return "redirect:/"; // 탈퇴 후 메인 페이지 또는 다른 페이지로 리다이렉트
	    } else {
	        // 3. 탈퇴 실패 시 에러 메시지 전달 (선택 사항)
	        rttr.addFlashAttribute("result", "removeFail");
	        return "redirect:/mypage/myInfo"; // 탈퇴 실패 시 마이페이지로 다시 이동 (또는 다른 에러 페이지)
	    }
	}
	
	@GetMapping("/bookmark")
	public String bookmark(Model model, HttpSession session) {
		MemberVO mvo = (MemberVO) session.getAttribute("loggedInUser");
		int mem_no = mvo.getMem_no();
		log.info("bookmark..."+mem_no);
		List<BookMarkVO> bookmarkList = bservice.getBookMark(mem_no);
		for (BookMarkVO bm : bookmarkList) {
		    RestVO rest = rservice.getRest(bm.getRest_no());
	        bm.setRest(rest);
		}
		model.addAttribute("bookmarkList", bookmarkList);

		return "/mypage/bookmark";
	}
	// 상세 페이지 즐겨찾기 상태 확인
    @GetMapping("/favorites/status/{restNo}")
    public ResponseEntity<Boolean> checkFavoriteStatus(@PathVariable int restNo, HttpSession session) {
        MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
        if (loggedInMember == null) {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
        int mem_no = loggedInMember.getMem_no();
        boolean isFavorite = bservice.isBookmarked(mem_no, restNo);
        return new ResponseEntity<>(isFavorite, HttpStatus.OK);
    }
	
 // 즐겨찾기 추가 (상세 페이지 및 마이페이지)
    @PostMapping(value = {"/favorites/add", "/bookmark/add"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> addBookmark(@RequestBody BookMarkVO vo, HttpSession session) {
        MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
        if (loggedInMember == null) {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
        int mem_no = loggedInMember.getMem_no();
        String isPublicStr = vo.getIs_public();
        boolean publicFlag = "true".equalsIgnoreCase(isPublicStr);
        String dbIsPublic = publicFlag ? "Y" : "N";

        BookMarkVO bookmarkVO = new BookMarkVO();
        bookmarkVO.setMem_no(mem_no);
        bookmarkVO.setRest_no(vo.getRest_no());
        bookmarkVO.setIs_public(dbIsPublic);

        boolean result = bservice.addBookmark(bookmarkVO);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 즐겨찾기 제거 (상세 페이지 및 마이페이지)
    @DeleteMapping(value = {"/favorites/remove/{restNo}", "/bookmark/del"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> delBookmark(@PathVariable(required = false) Integer restNo, @RequestBody(required = false) BookMarkVO vo, HttpSession session) {

        MemberVO loggedInMember = (MemberVO) session.getAttribute("loggedInUser");
        if (loggedInMember == null) {
            return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
        }
        int mem_no = loggedInMember.getMem_no();
        int targetRestNo = 0;

        // 경로 변수로 restNo가 넘어온 경우 (상세 페이지)
        if (restNo != null) {
            targetRestNo = restNo;
        }
        // 요청 본문에 BookMarkVO 형태로 넘어온 경우 (마이페이지)
        else if (vo != null) {
            targetRestNo = vo.getRest_no();
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST); // restNo 정보가 없는 경우 에러 응답
        }

        boolean result = bservice.deleteBookmark(mem_no, targetRestNo);
				log.info("result..." + result);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
	@PostMapping(value = "/bookmark/private", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> updateBookmarkToPrivate(@RequestBody BookMarkVO vo) {
		log.info("updateBookmarkToPrivate...");
		boolean result = bservice.updateBookmarkPublicStatus(vo.getMem_no(), vo.getRest_no(), "N");
		return new ResponseEntity<Boolean>(result,HttpStatus.OK);
	}

	@PostMapping(value = "/bookmark/public", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> updateBookmarkToPublic(@RequestBody BookMarkVO vo) {
		log.info("updateBookmarkToPublic...");
		boolean result = bservice.updateBookmarkPublicStatus(vo.getMem_no(), vo.getRest_no(), "Y");
		return new ResponseEntity<Boolean>(result,HttpStatus.OK);
	}

	@GetMapping("/booking")
	public String booking(Model model, HttpSession session) {
		MemberVO mvo = (MemberVO) session.getAttribute("loggedInUser");
		int mem_no = mvo.getMem_no();
		log.info("booking..."+mem_no);
		List<ReserveRestDTO> reserveList=rservice.getReserveList(mem_no);
		model.addAttribute("reserveList", reserveList);
		return "/mypage/booking";
	}
	@PostMapping(value = "/booking/del", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> cancelBooking(@RequestBody ReserveVO vo) {
		log.info("delBookmark..."+vo.getRes_no());
		boolean result=rservice.cancelBooking(vo.getRes_no());
		return new ResponseEntity<Boolean>(result,HttpStatus.OK);
	}
	@PostMapping(value = "/booking/memoUpdate", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> updateReserveMemo(@RequestBody ReserveVO vo) {
		log.info("updateReserveMemo..."+vo.getRes_no());
		boolean result=rservice.updateReserveMemo(vo.getRes_no(), vo.getRes_memo());
		return new ResponseEntity<Boolean>(result,HttpStatus.OK);
	}
	
	@GetMapping("/club")
	public String club(Model model, HttpSession session) {
		MemberVO mvo = (MemberVO) session.getAttribute("loggedInUser");
		int mem_no = mvo.getMem_no();
		log.info("club..."+mem_no);
		List<GroupMemberDTO> groups = groupService.getAllGroups(mem_no);
		model.addAttribute("groupList", groups);
		return "/mypage/club";
	}
	@PostMapping(value = "/club/memoUpdate", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> updateGRoupMemo(@RequestBody GroupMemberDTO dto) {
		log.info("updateGRoupMemo..."+dto.getMem_no()+dto.getGroup_no());
		boolean result=groupService.updateGroupMemo(dto.getGroup_no(), dto.getMem_no(), dto.getGroup_usermemo());
		return new ResponseEntity<Boolean>(result,HttpStatus.OK);
	}
	@PostMapping(value = "/groupBookmark/del", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> cancelGroupBookmark(@RequestBody GroupMemberDTO dto) {
		log.info("cancelGroupBookmark..."+dto.getGroup_no()+dto.getMem_no());
		boolean result=groupService.cancelGroupBookmark(dto.getGroup_no(), dto.getMem_no());
		return new ResponseEntity<Boolean>(result,HttpStatus.OK);
	}
	@PostMapping(value = "/groupBookmark/add", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> addGroupBookmark(@RequestBody GroupMemberDTO dto) {
		log.info("addGroupBookmark..."+dto.getGroup_no()+dto.getMem_no());
		boolean result=groupService.addGroupBookmark(dto.getGroup_no(),dto.getMem_no());
		return new ResponseEntity<Boolean>(result,HttpStatus.OK);
	}
	
	@GetMapping("/review")
	public String review(Model model, HttpSession session) {
		MemberVO mvo = (MemberVO) session.getAttribute("loggedInUser");
		int mem_no = mvo.getMem_no();
		log.info("review..."+mem_no);
		List<CommentVO> comment = cservice.getCommentList(mem_no);
		model.addAttribute("commentList", comment);
		return "/mypage/review";
	}
	
	@PostMapping(value = "/review/del", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> deleteComment(@RequestBody CommentVO vo) {
		log.info("deleteComment..."+vo.getCom_no()+vo.getMem_no());
		int result=cservice.deleteComment(vo.getCom_no(), vo.getMem_no());
		return new ResponseEntity<Boolean>((result==1?true:false),HttpStatus.OK);
	}

	@GetMapping("/event")
	public String event() {
		log.info("event...");
		return "/mypage/event";
	}
}
