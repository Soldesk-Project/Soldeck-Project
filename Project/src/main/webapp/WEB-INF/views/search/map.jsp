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
	    <a href="/"><img src="/resources/images/logo.png" alt="logo" style="width: 70px;"></a>
	    <input type="text" class="search-box" placeholder="검색어를 입력하세요" style="width:100%"/>
	</div>
	<div id="sidebar-body">

    </div>
	</div>
  <div id="map"></div>
  

  <!-- 분리한 js 파일 연결 -->
  <script type="text/javascript" src="/resources/js/map.js"></script>

</body>
</html>
