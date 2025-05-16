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
				</div>
			    
			    <div class="score-div">
				    <p class="score">점수: <span id="score">0</span></p> <br>
				</div>
				<div class="ranking-info">
					<div class="rank">
						
					</div>
					<div class="myRank">
						
					</div>
				</div>
			</div>
		</div>	
	</div>	
	<div id="customConfirm" class="result-modal">
		<div class="inner-modal">
	    	<p>최고점수가 갱신되었습니다!</p>
			<div class="score-modal-content">
			    <button class="close-modal" id="closeModalBtn">확인</button>
		    </div>
		</div>
	</div>
<script type="text/javascript" src="/resources/js/eventTab/0002.js"></script>
</body>
</html>