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
	<div class="main-menu">
		<div class="inner-main">
		<!-- for문 / 데이터 수정  -->
			<div class="review-list">
				<div>
					<img src="/resources/images/fruit1.jpg" alt="리뷰사진" class="review-img">
				</div>
				<div class="review-content">
					<div class="review-comment">
						<div class="comment-up">
							<div class="profile">
								<img src="/resources/images/user_profile.png" alt="프로필" class="user-profile">
							</div>
							<input type="text" name="name" class="name" value="별명" readonly="readonly">
						</div>
						<div class="comment-down">
							<input type="text" name="comment" class="comment" value="가게 내부 인테리어 ~..." readonly="readonly">
						</div>
					</div>
					<div class="appraisal">
						<div class="appraisal-div">
							<span>평점</span>
							<input type="text" name="score" class="score" value="4.5" readonly="readonly">
							<span>재방문 의사</span>
							<input type="text" name="revisit" class="revisit" value="또 방문할 의향이 ~..." readonly="readonly">
						</div>
					</div>
					<div><button type="button" class="remove-btn" id="removeBtn">삭제</button></div>
				</div>
			</div>
			<!-- 여기까지 리뷰 1회 -->

			
			
			
		</div>
	</div>
 </div>
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/review.js"></script>
</body>
</html>