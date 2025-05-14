<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
  
	<div class="container">
		<div class="main-menu">
			<h1>룰렛 돌리기</h1>
			<canvas id="canvas" width="500" height="500"></canvas>
			<button id="spin" class="spin-btn">Spin</button>
			<p>현재 내 포인트 : <span class="my-point">${point }</span></p>
			<span>룰렛은 100포인트를 소모해서 사용할 수 있습니다</span>
		</div>	
	</div>	
	
<script type="text/javascript" src="/resources/js/eventTab/0003.js"></script>
</body>
</html>