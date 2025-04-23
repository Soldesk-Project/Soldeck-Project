<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="nav">
  <div class="nav-left">
    <a href="/"><img src="/resources/images/logo.png" alt="logo" style="width: 70px;"></a>
</div>
<div class="nav-center">
  <input type="search" placeholder="검색어를 입력하세요." onChange={handleSearchKeywordChange} id="search">
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
const openModalBtn = document.getElementById("proFile");
const closeModal = document.getElementsByClassName("close")[0];

// 프로필 버튼 클릭 시 모달창 열기
openModalBtn.onclick = function() {
		head_modal.style.display = "block";
}

// 닫기 버튼 클릭 시 모달창 닫기
closeModal.onclick = function() {
		head_modal.style.display = "none";
}

// 모달창 바깥 클릭 시 닫기
window.onclick = function(event) {
		if (event.target == modal) {
				head_modal.style.display = "none";
		}
}
</script>

