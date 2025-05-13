<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>

<link rel="stylesheet" href="../resources/css/friendList.css">

<body style="overflow-y: scroll;" data-mem-no="${sessionScope.loggedInUser.mem_no}">
	
	<!-- 알림 표시 영역 -->
	<div id="notificationContainer" style="position: fixed; top: 10px; right: 10px; z-index: 9999;"></div>
	
	<div class="container_F">
		<div class="searchBox">
			<p class="searchTitle">친구 검색</p>
			<input type="text" id="searchInput" placeholder="친구 검색">
		<button id="searchButton">검색</button>
		</div>
		<div id="searchResultContainer"></div>
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
</body>
</html>