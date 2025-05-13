<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div class="header">
	<div class="nav-left">
		<a href="/" draggable="false"><img src="/resources/images/logo.png" alt="logo" style="width: 70px;" draggable="false"></a>
	</div>
	<div class="nav-center">
		<input type="search" placeholder="검색어를 입력하세요." id="search">
	</div>

    <c:if test="${sessionScope.loggedInUser != null}">
    	<c:set var="member" value="${sessionScope.loggedInUser}" />
    	
        <div class="profileBox">
        	<div class="profileBox1">
        		<div class="profile_img_box">
					<img src="/resources/upload/${member.mem_img}" alt="프로필" width="80" height="80"
                	 onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='/resources/images/profile.png'; }">
				</div>
				<!-- <div><img src='../resources/images/profile_line.png' alt="라인"></div>  -->
			</div>
			<div class="profileBox2">
				<div class="nickAndmypage">
					<div class="nickname">${member.mem_nick}님</div>
					<div class="mypageAndlouout">
						<div class="mypage_text"><a href="/mypage/myInfo">마이페이지</a></div>
						<form id="logoutForm" action="/login/logout" method="POST" style="display: none;"></form>
						<div><a href="#" onclick="document.getElementById('logoutForm').submit();">로그아웃</a></div>
					</div>
				</div>
			</div>
		</div>
    </c:if>

	<c:if test="${empty sessionScope.loggedInUser}">
    	<a href="javascript:void(0)" id="login">로그인</a>
    </c:if>
    <div><a href="community/communityMain">커뮤티티이동</a></div>

</div>
<script>
// 검색 관련 스크립트
let headerSearchKeyword = '';

function handleSearch(event) {
headerSearchKeyword = event.target.value.trim();

if (headerSearchKeyword) {
    const encodedKeyword = encodeURIComponent(headerSearchKeyword);
    sessionStorage.setItem('search', encodedKeyword);
    sessionStorage.setItem('actionType', 'search'); // 행동 유형 저장
    window.location.href = "/search/map"; // 그냥 이동
} else {
    console.log("검색어가 비어 있습니다.");
    alert("검색어를 입력하세요.");
}

}

// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
const searchInput = document.getElementById("search");
if (searchInput) {
if (searchInput.disabled) {
console.log("searchInput이 비활성화되어 있습니다. 활성화합니다.");
searchInput.disabled = false;
}
searchInput.removeEventListener("change", handleSearch);
searchInput.removeEventListener("keypress", handleSearch);
searchInput.addEventListener("change", handleSearch);
searchInput.addEventListener("keypress", function(event) {
event.stopPropagation();
if (event.key === 'Enter') {
handleSearch(event);
}
}, { capture: false });
} else {
console.error("searchInput 요소를 찾을 수 없습니다.");
}

// 로그인 링크 클릭 시 현재 URL 전달
const loginLink = document.getElementById("login");
if (loginLink) {
    loginLink.addEventListener('click', function(event) {
        event.preventDefault(); // 기본 동작 방지
        const currentUrl = encodeURIComponent(window.location.href);
        // 템플릿 리터럴 대신 명시적 문자열 연결
        const baseUrl = "/login/loginPage";
        const queryString = "redirectUrl=" + currentUrl;
        const redirectUrl = baseUrl + "?" + queryString;
        window.location.href = redirectUrl;
    });
} else {
    console.error("loginLink 요소를 찾을 수 없습니다.");
}

});

// 로그아웃 관련 스크립트 (로그인 상태에서만 실행)
<c:if test="${sessionScope.loggedInUser != null}">
document.addEventListener('DOMContentLoaded', function() {
const logoutLink = document.querySelector('#myModal .modal-menu li:last-child a');
if (logoutLink) {
logoutLink.addEventListener('click', function(event) {
event.preventDefault();
const form = document.createElement('form');
form.action = '/login/logout';
form.method = 'POST';
form.style.display = 'none';

         // 현재 URL을 redirectUrl로 추가
            const currentUrl = encodeURIComponent(window.location.href);
            const redirectInput = document.createElement('input');
            redirectInput.type = 'hidden';
            redirectInput.name = 'redirectUrl';
            redirectInput.value = currentUrl;
            form.appendChild(redirectInput);

            document.body.appendChild(form);
            form.submit();
        });
    } else {
        console.error("로그아웃 링크를 찾을 수 없습니다.");
    }
});

</c:if>
</script>