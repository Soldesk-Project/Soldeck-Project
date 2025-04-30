<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>	
<link rel="stylesheet" href="../resources/css/header.css">
<link rel="stylesheet" href="../resources/css/friendList.css">
<link rel="stylesheet" href="../resources/css/footer.css">
</head>
<body style="overflow-y: scroll;">

	<jsp:include page="../layout/header.jsp"/>
	
	<div class="container_F">
		<div class="searchBox">
			<p class="searchTitle">친구 검색</p>
			<input type="search" class="friendSearch">
		<button value="검색" class="searchBtn">검색</button>
		</div>
		<div class="friendWrapper">
			<div class="friendListBox">
				<div class="friendTitle">
					<h2>내 친구 목록</h2>
				</div>
			
				<div class="friendList">
					<div id="friendListContainer" class="scroll-container">
						<!-- JS로 프로필 div가 계속 추가됨 -->
					</div>
				</div>
			</div>
			
			<div class="friendListRandomBox">
				<div class="friend_RandomTitle">
					<h2>친구 추천 목록</h2>
				</div>
				
				<div class="friendRandomlist">
					<div id="friendListRandomContainer" class="scroll-container">
						<!-- JS로 프로필 div가 계속 추가됨 -->
					</div>
				</div>
			</div>
		</div>
	</div>
	<script src="/resources/js/friendList.js"></script>
	<jsp:include page="../layout/footer.jsp"/>
	
</body>
</html>