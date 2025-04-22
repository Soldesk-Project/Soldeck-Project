<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>비밀번호 찾기</title>
<link rel="stylesheet" href="../resources/css/findPw.css">
<link rel="stylesheet" href="../resources/css/footer.css">
</head>
<body>
	<div class="container">
		<a href="/">
			<img src="../resources/images/logo.png" alt="로고" class="logo">
		</a>
		<div class="formWrapper">
			<label for="Id">Id</label>
			<input type="text" id="Id" placeholder="아이디를 입력하세요.">
			<label for="bithDate">생년월일</label>
			<input type="text" id="birth_date" placeholder="생년월일을 입력하세요.">
			<label for="contact">연락처</label>
			<input type="text" id="contact" placeholder="연락처를 입력하세요.">
			<button id="findPwBtn">조회</button>
			<div class="resultContainer" id="resultContainer" style="display: none;">
				<p>비밀번호 조회 결과:</p>
				<div id="result"></div>
			</div>
		</div>
	</div>

	<%@ include file="../layout/footer.jsp" %>

	<script type="text/javascript" src="/resources/js/findPw.js"></script>
</body>
</html>