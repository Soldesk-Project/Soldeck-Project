<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/resources/css/eventTab/0002.css">
<title>Insert title here</title>
</head>
<body>
  
	<div class="container">
		<div class="main-menu">
			<div class="snake-game">
				<h1>스네이크 게임</h1>
			    <canvas id="game-board" width="400px" height="400px"></canvas>
			    <div class="buttons">
				  <button class="start-btn">시작</button>
				  <button class="save-score">최고 점수 저장</button>
				</div>
			    
			    <div class="score-div">
				    <p class="score">점수: <span id="score">0</span></p> <br>
				    <p class="highScore">최고점수: <span id="highScore">0</span></p>
				</div>
			</div>
		
		
		
		
		</div>	
	</div>	
	
<script type="text/javascript" src="/resources/js/eventTab/0002.js"></script>
</body>
</html>