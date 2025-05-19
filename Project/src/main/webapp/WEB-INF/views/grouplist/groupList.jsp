<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<link rel="stylesheet" href="../resources/css/groupList.css">

<body style="overflow-y: scroll;" data-mem-no="${sessionScope.loggedInUser.mem_no}">
	
	<div class="container_F">
		<div class="searchBox">
			<button id="myGroupBtn">내 모임</button>
			<button id="randomGroupBtn">추천 모임</button>
			<p class="searchTitle">모임 검색</p>
			<input type="text" id="searchInput" placeholder="모임 검색">
			<button id="groupSearchButton">검색</button>
			<button id="createGroupBtn">모임 만들기</button>
		</div>
		<div id="searchResultContainer"></div>
		<div class="groupWrapper">
			<div class="groupListBox">
				<div class="groupTitle">
				</div>
				<div class="groupList">
					<div id="groupListContainer" class="scroll-container">
						<!-- JS로 모임 div가 계속 추가됨 -->
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
	
<div id="modal">
	<div class="group-modal-content">
		<div class="modal-title">
			<a>새 모임방 등록</a>
		</div>
		<div class="modal-body">
			<ul>
				<li class="image-container">
					<div class="image-placeholder">이미지</div>
				</li>
				<li>
					<input type="text" name="club-title" placeholder="모임방 이름" class="input-text">
				</li>
				<li>
					<textarea placeholder="모임 소개" name="club-desc" class="input-textarea"></textarea>
				</li>
				<li>
					<label class="input-label">나이 제한</label>
					<div class="age-range-container">
						<input type="number" value="20" name="min-age" class="input-number">
						<span>~</span>
						<input type="number" value="40" name="max-age" class="input-number">
					</div>
				</li>
				<li>
					<label class="input-label">성별</label>
					<div class="gender-container">
						<label><input type="radio" name="gender" value="male" class="gender-radio"> 남성</label>
						<label><input type="radio" name="gender" value="female" class="gender-radio"> 여성</label>
					</div>
				</li>
				<li>
					<label class="input-label">공개 여부</label>
					<input type="checkbox" class="public-checkbox"> 공개
				</li>
			</ul>
		</div>
		<div class="modal-footer">
			<button type="button" id="closeModalBtn" class="btn-cancel">취소</button>
			<button type="button" id="createBtn" class="btn-create">생성</button>
		</div>
	</div>
</div>
	
	
	
	
	<script src="/resources/js/groupList.js"></script>
</body>
</html>