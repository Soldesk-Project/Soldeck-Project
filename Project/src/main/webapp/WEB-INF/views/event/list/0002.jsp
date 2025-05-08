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
			<div class="snake-game">
				<h1>스네이크 게임</h1>
			    <canvas id="game-board" width="400" height="400"></canvas>
			    
			    <div class="buttons">
				  <button id="start-btn">시작</button>
				  <button id="stop-btn">정지</button>
				</div>
			    
			    <p class="score">점수: <span id="score">0</span></p>
			</div>
		
		
		
		
		</div>	
	</div>	
	
	<jsp:include page="../../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/eventTab/0002.js"></script>
</body>
</html>