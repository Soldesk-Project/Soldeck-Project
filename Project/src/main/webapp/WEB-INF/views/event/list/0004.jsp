<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/resources/css/eventTab/0004.css">
<link rel="stylesheet" href="/resources/css/common.css">
<title>Insert title here</title>
</head>
<body>
  
	<div class="container">
		<div class="main-menu">
		    <div class="calendar">
				<h2>달력형 출석체크</h2>
		    	<div class="month-title" id="monthTitle"></div>
		    	<table id="calendarTable">
		     	 <!-- 달력이 여기에 생성됩니다 -->
		    	</table>
		    	<button class="today-check-btn">출석체크</button>
		    	<p>출석체크 할 때마다 100p!</p>
				<div class="my-point">
				</div>			
				<button id="usePointBtn" class="use-point-btn">포인트 사용하러 가기</button>
		  	</div>
		</div>
	</div>	
	<div id="customConfirm" class="result-modal">
		<div class="inner-modal">
			<div class="modal-instructions">

			</div>
			<div class="attendance-modal-content">
			    <button class="close-modal" id="closeModalBtn">확인</button>
		    </div>
		</div>
	</div>
	
<script type="text/javascript" src="/resources/js/eventTab/0004.js"></script>
</body>
</html>