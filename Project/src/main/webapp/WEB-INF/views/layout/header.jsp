<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="nav">
  <div class="nav-left">
    <a href="/"><img src="/resources/images/logo.png" alt="logo" style="width: 70px;"></a>
</div>
<div class="nav-center">
  <input type="search" placeholder="검색어를 입력하세요." id="search">
</div>
<div class="nav-right">
  <input type="image" src="../resources/images/profile.png" alt="profile" id="proFile" style="width: 70px; cursor: pointer;"><br>
</div>
<!-- 모달창 -->
<div id="myModal" class="modal">
	<div class="modal-content">
		<div class="modal-header">
		    <div class="profile-icon"></div>
		    <span class="nickname">nickName</span>
		    <span class="close">×</span>
		</div>
		<ul class="modal-menu">
		    <li><a href="/mypage/myInfo">my page</a></li>
		    <li><a href="/friendlist/friendList">community</a></li>
		    <li><a href="/mypage/bookmark">bookmark</a></li>
		    <li><a href="#">logout</a></li>
		</ul>
	</div>
</div>
<div class="nav-right1">
  <a href="/login/loginPage" id="login">로그인</a>
</div>
</div>
<script>
//모달 관련 스크립트
const head_modal = document.getElementById("myModal");
const head_openModalBtn = document.getElementById("proFile");
const head_closeModal = document.getElementsByClassName("close")[0];

// 프로필 버튼 클릭 시 모달창 열기
head_openModalBtn.onclick = function() {
		head_modal.style.display = "block";
}

// 닫기 버튼 클릭 시 모달창 닫기
head_closeModal.onclick = function() {
		head_modal.style.display = "none";
}

// 모달창 바깥 클릭 시 닫기
window.onclick = function(event) {
		if (event.target == head_modal) {
				head_modal.style.display = "none";
		}
}

//검색 관련 스크립트
let headerSearchKeyword = '';

function handleSearch(event) {
    headerSearchKeyword = event.target.value.trim();
    console.log("입력값 (raw):", event.target.value);
    console.log("검색어 (trim):", headerSearchKeyword);
    
    if (headerSearchKeyword) {
        const encodedKeyword = encodeURIComponent(headerSearchKeyword);
        console.log("인코딩된 검색어:", encodedKeyword);
        const searchUrl = "/search/search?keyword=" + encodedKeyword;
        console.log("전송 URL (조합):", searchUrl);
        window.location.href = searchUrl; // 주석 해제하여 테스트
    } else {
        console.log("검색어가 비어 있습니다.");
    }
}

const searchInput = document.getElementById("search");
if (searchInput) {
    // 기존 이벤트 핸들러 제거 (충돌 방지)
    searchInput.removeEventListener("change", handleSearch);
    searchInput.removeEventListener("keypress", handleSearch);

    // 통합 이벤트 핸들러 추가
    searchInput.addEventListener("change", handleSearch);
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    });
} else {
    console.error("searchInput 요소를 찾을 수 없습니다.");
}
</script>

