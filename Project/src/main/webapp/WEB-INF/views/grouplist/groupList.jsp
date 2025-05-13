<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<link rel="stylesheet" href="../resources/css/groupList.css">

<body style="overflow-y: scroll;" data-mem-no="${sessionScope.loggedInUser.mem_no}">
	
	<div class="container_F">
		<div class="searchBox">
			<p class="searchTitle">모임 검색</p>
			<input type="text" id="searchInput" placeholder="모임 검색">
		<button id="searchButton">검색</button>
		</div>
		<div id="searchResultContainer"></div>
		<div class="groupWrapper">
			<div class="groupListBox">
				<div class="groupTitle">
					<h2>내가 속한 모임 목록</h2>
				</div>
			
				<div class="groupList">
					<div id="groupListContainer" class="scroll-container">
						<!-- JS로 모임 div가 계속 추가됨 -->
					</div>
				</div>
			</div>
			
			<div class="groupListRandomBox">
				<div class="group_RandomTitle">
					<h2>모임 추천 목록</h2>
				</div>
				
				<div class="groupRandomlist">
					<div id="groupListRandomContainer" class="scroll-container">
						<!-- JS로 모임 div가 계속 추가됨 -->
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="/resources/js/groupList.js"></script>
</body>
</html>