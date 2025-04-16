
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
		<div class="title">
			<span>나의 예약 내역</span>
		</div>
		<!-- for문 / 내용수정 / 내용 넘어가면 자동 스크롤 -->
		<div class="booking-list">
			<div class="sec-1">
				<div class="booking-date">
					<span>yyyy-MM-dd</span>
				</div>
				<div class="booking-img">
					<img src="./images/profile.png" alt="가게 사진">
				</div>
				<div class="category">
					<span> 예약 일정</span>
				</div>
				<div class="category">
					<span> 특이 사항</span>
				</div>
			</div>
			<div class="sec-2">
				<div class="btn"><button type="button" id="bookingCancel">예약취소</button></div>
				<div class="booking-info">
					<div><img src="./images/profile.png" alt="즐겨찾기" class="bookmark-img"></div>
					<div class="info-text">가게 이름</div>
					<div class="info-text">가게 업종</div>
					<div class="info-text">영업 시간</div>
					<div class="info-text">가게 주소</div>
				</div>
				<div class="booking-schedule">
					<input type="text" class="booking-schedule" name="bookingDate" value="yyyy-MM-dd">
				</div>
				<div class="booking-schedule">
					<input type="text" class="booking-schedule" name="bookingDateTime" value="hh-mm">
				</div>
				<div>
					<input type="text" class="memo" name="memo" value="-----//">
				</div>
			</div>
		</div>
		<!-- 여기까지가 원문 -->
		<div class="booking-list">
			<div class="sec-1">
				<div class="booking-date">
					<span>yyyy-MM-dd</span>
				</div>
				<div class="booking-img">
					<img src="./images/profile.png" alt="가게 사진">
				</div>
				<div class="category">
					<span> 예약 일정</span>
				</div>
				<div class="category">
					<span> 특이 사항</span>
				</div>
			</div>
			<div class="sec-2">
				<div class="btn"><button type="button" id="bookingCancel">예약취소</button></div>
				<div class="booking-info">
					<div><img src="./images/profile.png" alt="즐겨찾기" class="bookmark-img"></div>
					<div class="info-text">가게 이름</div>
					<div class="info-text">가게 업종</div>
					<div class="info-text">영업 시간</div>
					<div class="info-text">가게 주소</div>
				</div>
				<div class="booking-schedule">
					<input type="text" class="booking-schedule" name="bookingDate" value="yyyy-MM-dd">
				</div>
				<div class="booking-schedule">
					<input type="text" class="booking-schedule" name="bookingDateTime" value="hh-mm">
				</div>
				<div>
					<input type="text" class="memo" name="memo" value="-----//">
				</div>
			</div>
		</div>
		<div class="booking-list">
			<div class="sec-1">
				<div class="booking-date">
					<span>yyyy-MM-dd</span>
				</div>
				<div class="booking-img">
					<img src="./images/profile.png" alt="가게 사진">
				</div>
				<div class="category">
					<span> 예약 일정</span>
				</div>
				<div class="category">
					<span> 특이 사항</span>
				</div>
			</div>
			<div class="sec-2">
				<div class="btn"><button type="button" id="bookingCancel">예약취소</button></div>
				<div class="booking-info">
					<div><img src="./images/profile.png" alt="즐겨찾기" class="bookmark-img"></div>
					<div class="info-text">가게 이름</div>
					<div class="info-text">가게 업종</div>
					<div class="info-text">영업 시간</div>
					<div class="info-text">가게 주소</div>
				</div>
				<div class="booking-schedule">
					<input type="text" class="booking-schedule" name="bookingDate" value="yyyy-MM-dd">
				</div>
				<div class="booking-schedule">
					<input type="text" class="booking-schedule" name="bookingDateTime" value="hh-mm">
				</div>
				<div>
					<input type="text" class="memo" name="memo" value="-----//">
				</div>
			</div>
		</div>
		<div class="booking-list">
			<div class="sec-1">
				<div class="booking-date">
					<span>yyyy-MM-dd</span>
				</div>
				<div class="booking-img">
					<img src="./images/profile.png" alt="가게 사진">
				</div>
				<div class="category">
					<span> 예약 일정</span>
				</div>
				<div class="category">
					<span> 특이 사항</span>
				</div>
			</div>
			<div class="sec-2">
				<div class="btn"><button type="button" id="bookingCancel">예약취소</button></div>
				<div class="booking-info">
					<div><img src="./images/profile.png" alt="즐겨찾기" class="bookmark-img"></div>
					<div class="info-text">가게 이름</div>
					<div class="info-text">가게 업종</div>
					<div class="info-text">영업 시간</div>
					<div class="info-text">가게 주소</div>
				</div>
				<div class="booking-schedule">
					<input type="text" class="booking-schedule" name="bookingDate" value="yyyy-MM-dd">
				</div>
				<div class="booking-schedule">
					<input type="text" class="booking-schedule" name="bookingDateTime" value="hh-mm">
				</div>
				<div>
					<input type="text" class="memo" name="memo" value="-----//">
				</div>
			</div>
		</div>


	</div>
</div>
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/booking.js"></script>
</body>
</html>
