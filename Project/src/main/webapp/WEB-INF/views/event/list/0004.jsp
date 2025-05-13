<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<jsp:include page="../../layout/header.jsp"/>
  
	<div class="container">
		<div class="main-menu">
		<h2>달력형 출석체크</h2>
	    <div class="calendar">
	    	<div class="month-title" id="monthTitle"></div>
	    	<table id="calendarTable">
	     	 <!-- 달력이 여기에 생성됩니다 -->
	    	</table>
	  	</div>
		
		
		</div>	
	</div>	
	
	<jsp:include page="../../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/eventTab/0004.js"></script>
</body>
</html>