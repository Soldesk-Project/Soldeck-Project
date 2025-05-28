<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<link rel="stylesheet" href="../resources/css/header.css">
    <link rel="stylesheet" href="../resources/css/admin.css">
    <link rel="stylesheet" href="../resources/css/add.css">
<body>
	<%@ include file="../layout/header.jsp" %>
	<div class="main-menu" style="margin-top: 500px">
		<ul class="side">
			<li class="side-myinfo"><a href="/admin/member" class="a-myinfo">회원 관리</a></li>
			<li class="side-bookmark"><a href="/admin/group"class="a-bookmark">모임 관리</a></li>
			<li class="side-restaurant"><a>매장 관리</a></li>
		</ul>
	</div><div class="restaurant-menu" style="margin-top: 500px; display: none;">
		<ul class="side">
			<li class="side-booking"><a href="/admin/restaurant"class="a-booking">매장 목록</a></li>
			<li class="side-add"><a href="/admin/add"class="a-add">매장 등록</a></li>
		</ul>
	</div>
	
	<h2 style="margin-top: 100px;">매장 등록</h2>
	
	<div class="container">
		<form action="/search/restAdd" method="post" enctype="multipart/form-data">
			<div class="formGroup">
	            <label>매장 이름: <input type="text" name="rest.rest_name" required></label><br>
	            <label>매장 주소: <input type="text" name="rest.rest_adr" required></label><br>
	            <label>매장 번호: <input type="text" name="rest.rest_phone" required></label><br>
	            <label>영업 시간: <input type="text" name="rest.rest_bh" required></label><br>
	            <label>매장 정보: <input type="text" name="rest.rest_info" required></label><br>
	            <label>매장 지역: <input type="text" name="rest.rest_loc" required></label><br>
	            <label>매장 종류: <input type="text" name="rest.rest_cate" required></label><br>
				<input type="hidden" name="rest.latitude" id="rest_lat" readonly><br>
				<input type="hidden" name="rest.longitude" id="rest_lng" readonly><br>
	            <label>매장 사진:
			        <input type="file" name="images" accept="image/*" multiple>
			        <small>최대 10장까지 업로드 가능</small>
			    </label><br>
			    
			    <div id="menuContainer">
			    </div>

            </div>
  				  <button type="button" onclick="addMenuItem()">메뉴 추가</button>
	            <button type="submit">등록</button>
        </form>
	</div>
</body>
<script type="text/javascript" src="/resources/js/admin.js"></script>
<script type="text/javascript" src="/resources/js/add.js"></script>
</html>