<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
  <jsp:include page="../layout/header.jsp"/>
  
	<div class="wrapper">
	  <div class="container">
		<div class="side-menu">
	  		<jsp:include page="../layout/sideMenu.jsp"/>
		</div>
		<div class="mainBoxDesign">
		<div class="main-menu">
			<div class="main-list">
				<div class="inner-main">
					
					<c:forEach var="rl" items="${reserveList }">
					<div class="booking-list">
						<div class="image-div">
							<div class="booking-img">
								<img src="${rl.rest_img_name }" alt="가게 사진" class="booking-res-image">
							</div>
						</div>
						<div class="booking-info">
							<div class="booking-schedule">
								<div>
									<input type="text" class="booking-date personnel" name="bookingDatePersonnel" value="${rl.res_personnel}" readonly="readonly">
									<input type="text" class="booking-date date" name="bookingDate" value="<fmt:formatDate value="${rl.res_date}" pattern='yyyy - MM - dd'/>" readonly="readonly">
									<input type="text" class="booking-date time" name="bookingDateTime" value="${rl.res_time }" readonly="readonly">
				                    <input type="hidden" class="reserve-no" value="${rl.res_no }">
				                    <input type="hidden" class="member-no" value="${rl.mem_no }">
								</div>
								<button type="button" class="booking-cancel-btn" id="bookingCancelBtn">예약취소</button>
							</div>
							<div class="border-div">
			                    <div class="info-text">
			            	        <div class="rest-info">
				    	                <a href="#" draggable="false">
					                    	<input type="text" class="res-name" value="${rl.rest_name }" readonly="readonly"><span class="input-size"></span>
					                    </a>
					                    <input type="text" class="res-addr" value="${rl.rest_adr }" readonly="readonly">
				                    </div>
									<div class="bookmark-div">
										<button type="button" class="bookmark" id="bookmarkBtn">★</button>
									</div>
			                    </div>
			                    <div class="memo-div">
				                    <span class="memo-title">특이 사항 메모</span>
				                    <div class="memo-content">
										<span class="booking-memo">${rl.res_memo }</span>
										<input type="text" class="booking-memo-modify" value="${rl.res_memo }">
										<button type="button" class="booking-memo-btn" id="modifyMemoBtn">수정</button>
										<button type="button" class="check-memo" id="saveMemoBtn">저장</button>
					                    <input type="hidden" id="restNo" value="${rl.rest_no }">
					                    <input type="hidden" id="isPublic" value="${rl.is_public }">
				                    </div>
			                    </div>
							</div>
						</div>
					</div>
					</c:forEach>
	
	
				</div>
			</div>
		</div>
		</div>
	</div>

	<div id="customConfirm" class="bookmark-check-modal">
		<div class="inner-modal">
	    	<p>즐겨찾기를 삭제하시겠습니까?</p>
			<div class="bookmark-modal-content">
			    <button class="yes-btn" id="outBookMarkBtn">예</button>
				<button class="cancle-modal-btn" id="cancelModalBtn">아니오</button>
		    </div>
		</div>
	</div>
	<div id="customConfirm" class="bookmark-add-modal">
		<div class="inner-modal">
	    	<p>즐겨찾기를 추가하시겠습니까?</p>
			<div class="bookmark-modal-content">
			    <button class="yes-btn" id="addBookMarkBtn">예</button>
				<button class="add-bookmark-btn" id="cancelModalBtn">아니오</button>
		    </div>
		</div>
	</div>
	<div id="customConfirm" class="booking-cancel-modal">
		<div class="inner-modal">
	    	<p>예약을 취소하시겠습니까?</p>
			<div class="bookmark-modal-content">
			    <button class="yes-btn" id="cancelBookingBtn">예</button>
				<button class="cancle-booking-btn" id="cancelModalBtn">아니오</button>
		    </div>
		</div>
	</div>
	<div id="customConfirm" class="save-memo-modal">
		<div class="inner-modal">
	    	<p>메모를 저장하시겠습니까?</p>
			<div class="bookmark-modal-content">
			    <button class="yes-btn" id="memoUpdateBtn">예</button>
				<button class="cancle-booking-btn" id="cancelModalBtn">아니오</button>
		    </div>
		</div>
	</div>
	
	<footer>
		<jsp:include page="../layout/footer.jsp"/>
	</footer>
	</div>
<script type="text/javascript" src="/resources/js/booking.js"></script>
</body>
</html>
