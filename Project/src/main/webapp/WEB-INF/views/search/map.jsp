<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>내 위치 지도 보기</title>
  <!-- 카카오 지도 SDK 로드 -->
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f95efd6df49141c0b98c0463ecfe5d9e"></script>
</head>
<link rel="stylesheet" href="../resources/css/map.css">
<body>
	<div id="sidebar">
	<div id="sidebar-head">
		<div id="toggleArrow">&lt;</div> <!-- 화살표 버튼 추가! -->
	    <a href="/" draggable="false"><img src="/resources/images/logo.png" alt="logo" style="width: 70px;" draggable="false"></a>
	    <input type="text" class="search-box" id="search-box" placeholder="검색어를 입력하세요" style="width:100%"/>
	</div>
	<div id="sidebar-body">

    </div>
	</div>
  <div id="map"></div>
  
  <button class="changeLocationBtn">
  	<span class="btn_text">현 지도에서 검색</span>
  </button>
  
  
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
	    const searchInput = document.getElementById("search-box");
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
	});
</script>
  <!-- 분리한 js 파일 연결 -->
  <script type="text/javascript" src="/resources/js/map.js"></script>

</body>
</html>
