<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="../resources/css/header.css">
<link rel="stylesheet" href="../resources/css/friendList.css">
<link rel="stylesheet" href="../resources/css/common.css">
<link rel="stylesheet" href="../resources/css/footer.css">
</head>
<body style="overflow-y: scroll;"
	data-mem-no="${sessionScope.loggedInUser.mem_no}">

	<!-- 알림 표시 영역 -->
	<div id="notificationContainer"
		style="position: fixed; top: 10px; right: 10px; z-index: 9999;"></div>

	<div class="container_F">
		<!-- 검색 영역 -->
		<div class="searchBox">
			<button class="friend-tab-button active" data-tab="my">내 친구</button>
			<button class="friend-tab-button" data-tab="recommend">추천 친구</button>
		</div>


		<!-- 친구 탭 UI -->
		<div class="friendWrapper">
			<!-- 탭 콘텐츠 -->
				<div class="friendTabContent">
					<!-- 내 친구 목록 -->
					<div id="tab-my" class="friendTabPane active">
							<div class="friendSearchBox">
								<p class="searchTitle">친구 검색</p>
								<input type="text" id="searchInput" placeholder="친구 검색" autocomplete="off">
								<button id="friendSearchButton">검색</button>
							</div>
								<div id="searchResultContainer"></div>
						<div class="friendTitle">
							<h2>친구 목록</h2>
						</div>
						<div class="friendList">
							<div id="friendListContainer" class="scroll-container">
								<!-- JS로 프로필 div가 계속 추가됨 -->
							</div>
						</div>
					</div>
	
					<!-- 친구 추천 목록 -->
					<div id="tab-recommend" class="friendTabPane">
						<div class="friendSearchBox">
							<p class="searchTitle">친구 검색</p>
							<input type="text" id="searchInput" placeholder="친구 검색" autocomplete="off">
							<button id="friendSearchButton">검색</button>
						</div>
							<div id="searchResultContainer"></div>
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
				<!-- 채팅방을 표시할 곳 -->
				<div id="chat-container"></div>
		</div>
	</div>

</body>
</html>