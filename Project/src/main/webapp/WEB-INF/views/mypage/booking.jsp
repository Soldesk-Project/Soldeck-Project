
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
		<div class="main-list">
			<div class="inner-main">
				<!-- for문 / 내용수정 / 내용 넘어가면 자동 스크롤 -->
				<div class="booking-list">
					<div class="sec-1">
						<div class="booking-img">
							<img src="/resources/images/index_slide_image_2.png" alt="가게 사진" class="booking-res-image">
						</div>
						<div class="category">
							<span> 예약 일정</span>
						</div>
						<div class="category">
							<span> 특이 사항</span>
						</div>
					</div>
					<div class="sec-2">
						<div class="booking-info">
							<div><button type="button" class="bookmark" id="bookmarkBtn">★</button></div>
		                    <div class="info-text">
			                    <a href="#" draggable="false"><input type="text" class="res-name" value="가게 이름" readonly="readonly"></a>
			                    <span class="input-size" id="input-size"></span>
			                    <input type="text" class="res-industry" value="가게 업종" readonly="readonly">
			                    <input type="text" class="res-time" value="영업 시간" readonly="readonly">
			                    <input type="text" class="res-addr" value="가게 주소" readonly="readonly">
		                    </div>
						</div>
						<div class="booking-schedule">
							<input type="text" class="booking-date" name="bookingDate" value="yyyy-MM-dd" readonly="readonly">
							<input type="text" class="booking-date" name="bookingDateTime" value="hh-mm" readonly="readonly">
							<button type="button" class="booking-cancel-btn" id="bookingCancelBtn">예약취소</button>
						</div>
						<div>
							<input type="text" class="memo" name="memo" value="-----//">
							<button type="button" class="memo-btn" id="saveMemoBtn">저장</button>
						</div>
					</div>
				</div>
				<!-- 여기까지가 원문 -->


			</div>
		</div>
	</div>
</div>
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/booking.js"></script>
</body>
</html>
