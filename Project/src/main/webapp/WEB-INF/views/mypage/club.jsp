<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
  <jsp:include page="../layout/header.jsp"/>
  
  <div class="container">
	<div class="side-menu">
  		<jsp:include page="../layout/sideMenu.jsp"/>
	</div>
	<div class="button-div">
		<button type="button" class="create-club-btn" id="createClubBtn">모임만들기</button>
	</div>		
	<div class="main-menu">
		<div class="club-main">
			<!-- 여기서부터~~~~~ -->
			<div class="club-list">
				<div>
					<img src="" alt="클럽사진" class="club-img">
				</div>
				<div class="club-content">
					<div class="club-info">
						<div>
							<input type="text" name="name" class="club-name" value="모임 명" readonly="readonly">
							<img src="" alt="즐겨찾기" class="bookmark-img">
						</div>
						<div>
							<input type="text" name="oc" class="club-oc" value="공개 모임" readonly="readonly">
						</div>
					</div>
					<div class="club-memo">
						<textarea rows="7" cols="75" class="memo-area">메모</textarea>
					</div>
				</div>
			</div>
			<!-- 여기까지~~~~~~!!! -->
			<div class="club-list">
				<div>
					<img src="" alt="클럽사진" class="club-img">
				</div>
				<div class="club-content">
					<div class="club-info">
						<div>
							<input type="text" name="name" class="club-name" value="모임 명" readonly="readonly">
							<img src="" alt="즐겨찾기" class="bookmark-img">
						</div>
						<div>
							<input type="text" name="oc" class="club-oc" value="공개 모임" readonly="readonly">
						</div>
					</div>
					<div class="club-memo">
						<textarea rows="7" cols="75" class="memo-area">메모</textarea>
					</div>
				</div>
			</div>
			<div class="club-list">
				<div>
					<img src="" alt="클럽사진" class="club-img">
				</div>
				<div class="club-content">
					<div class="club-info">
						<div>
							<input type="text" name="name" class="club-name" value="모임 명" readonly="readonly">
							<img src="" alt="즐겨찾기" class="bookmark-img">
						</div>
						<div>
							<input type="text" name="oc" class="club-oc" value="공개 모임" readonly="readonly">
						</div>
					</div>
					<div class="club-memo">
						<textarea rows="7" cols="75" class="memo-area">메모</textarea>
					</div>
				</div>
			</div>
			<div class="club-list">
				<div>
					<img src="" alt="클럽사진" class="club-img">
				</div>
				<div class="club-content">
					<div class="club-info">
						<div>
							<input type="text" name="name" class="club-name" value="모임 명" readonly="readonly">
							<img src="" alt="즐겨찾기" class="bookmark-img">
						</div>
						<div>
							<input type="text" name="oc" class="club-oc" value="공개 모임" readonly="readonly">
						</div>
					</div>
					<div class="club-memo">
						<textarea rows="7" cols="75" class="memo-area">메모</textarea>
					</div>
				</div>
			</div>
			<div class="club-list">
				<div>
					<img src="" alt="클럽사진" class="club-img">
				</div>
				<div class="club-content">
					<div class="club-info">
						<div>
							<input type="text" name="name" class="club-name" value="모임 명" readonly="readonly">
							<img src="" alt="즐겨찾기" class="bookmark-img">
						</div>
						<div>
							<input type="text" name="oc" class="club-oc" value="공개 모임" readonly="readonly">
						</div>
					</div>
					<div class="club-memo">
						<textarea rows="7" cols="75" class="memo-area">메모</textarea>
					</div>
				</div>
			</div>
			<div class="club-list">
				<div>
					<img src="" alt="클럽사진" class="club-img">
				</div>
				<div class="club-content">
					<div class="club-info">
						<div>
							<input type="text" name="name" class="club-name" value="모임 명" readonly="readonly">
							<img src="" alt="즐겨찾기" class="bookmark-img">
						</div>
						<div>
							<input type="text" name="oc" class="club-oc" value="공개 모임" readonly="readonly">
						</div>
					</div>
					<div class="club-memo">
						<textarea rows="7" cols="75" class="memo-area">메모</textarea>
					</div>
				</div>
			</div>
		</div>
	</div>
  </div>
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/club.js"></script>
</body>
</html>