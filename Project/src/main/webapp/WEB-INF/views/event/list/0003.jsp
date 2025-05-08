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
			<h1>룰렛 돌리기</h1>
			<canvas id="canvas" width="500" height="500"></canvas>
			<button id="spin" class="spin-btn">Spin</button>
			<p>현재 내 포인트 : <span>0</span></p>
		
		
		</div>	
	</div>	
	
	<jsp:include page="../../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/eventTab/0003.js"></script>
</body>
</html>