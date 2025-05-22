<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/resources/css/eventTab/0003.css">
<link rel="stylesheet" href="/resources/css/common.css">
<title>Insert title here</title>
</head>
<body>
  
	<div class="container">
		<div class="main-menu">
			<div class="roulette">
				<h1>룰렛 돌리기</h1>
				<canvas id="canvas" width="500" height="500"></canvas>
				<span>룰렛은 100포인트를 소모해서 사용할 수 있습니다</span>
				<button id="spin" class="spin-btn">Spin</button>
				<div class="my-point-div">

				</div>
				<button id="usePointBtn" class="use-point-btn">포인트 사용하러 가기</button>
			</div>
		</div>	
	</div>	
	<div id="customConfirm" class="result-modal">
		<div class="inner-modal">
			<div class="modal-instructions">

			</div>
			<div class="roulette-modal-content">
			    <button class="close-modal" id="closeModalBtn">확인</button>
		    </div>
		</div>
	</div>
<script type="text/javascript" src="/resources/js/eventTab/0003.js"></script>
</body>
</html>