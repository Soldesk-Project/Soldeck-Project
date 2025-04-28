<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
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
		<div class="friend-list">
			<div class="friendPicklist_title">
			<h2>나와 잘 맞을 거 같은 친구</h2>
			</div>
			<div class="pickLayout" id="miniProfileContainer">
				
			</div>
		</div>
		<div class="chat-pick">
			<div class="chatList_title">
			<h2>내 취향에 딱인 모임 픽</h2>
			</div>
			<div class="pickLayout">
				<div class="miniChat">
				<div class="chat_image">
				<input type="image" alt="chat_image" id="chat_image" src="/resources/images/profile.png">
				</div>
				<div class="chat_title">
				<span>${vo.chat_title.value}</span>
				</div>
				<div>
					<div class="chat_joinBtn">
					<form action="/chat/joinRequest" method="post">
					<input type="hidden" name="chat_id" value="${vo.chat_id.value}">
					<button type="submit" class="joinBtn">가입요청</button>
					</form>
					</div>
				</div>
				</div>
			</div>
		</div>
		<div class="friendList">
			<div class="friendpick_listtitle">
			<h2>친구 목록</h2>
			</div>
			<div class="firend_layout">
				<div class="friend_box">
				<div class="friendLayout">
					<div class="friend_info">
						<div class="pro_image"><input type="image" id="f_proFile_img" src="/resources/images/profile.png" alt="firend_image"></div>
						<div class="pro_userNick"><span>${vo.chat_title.value}</span></div>
						<form action="/friend/memoUpdate" method="post">
							<div class="pro_freMemo">
								<h4>Memo</h4>
								<input type="text" name="friendMemo" value="${vo.fre_memo.value}">
								<input type="hidden" name="mem_id" value="${vo.mem_id}">
								<div class="memo_Btn">
								<input type="submit" value="저장" class="memoBtn">
								</div>
							</div>
						</form>
						<div class="follow_Btn">
						<input type="button" name="follow" value="언팔로우" onclick="followOn_Off()" class="followBtn">
						</div>
					</div>
				</div>
				</div>
			</div>
		</div>
	</div>
	
	<script src="/resources/js/friendList.js"></script>
	<jsp:include page="../layout/footer.jsp"/>
	
</body>
</html>