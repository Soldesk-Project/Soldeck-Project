<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>아이디 찾기</title>
	<link rel="stylesheet" href="../resources/css/findId.css">
	<link rel="stylesheet" href="../resources/css/common.css">
	<link rel="stylesheet" href="../resources/css/footer.css">
</head>
<body>
	<div class="wrapper">
	<div class="container">
		<a href="/">
			<img src="../resources/images/logo.png" alt="로고" class="logo">
		</a>
		<div class="formWrapper">
			<label for="name">이름</label>
			<input type="text" id="name" placeholder="이름을 입력하세요.">
			<label for="birthDate">생년월일</label>
			<input type="text" id="birthDate" placeholder="생년월일 8자리를 입력하세요.">
			<label for="contact">연락처</label>
			<input type="text" id="contact" name="contact" placeholder="연락처를 - 없이 입력하세요.">
			<div class="buttonGroup">
				<button id="findIdBtn">조회</button>
				<button id="findPwPageBtn">비밀번호 찾기</button>
			</div>
			<div class="resultContainer" id="resultContainer" style="display: none;">
				<p>아이디 조회 결과:</p>
				<div id="result"></div>
			</div>
		</div>
	</div>
	</div>
	<%@ include file="../layout/footer.jsp" %>
	
	<script type="text/javascript" src="/resources/js/findId.js"></script>
</body>
</html>