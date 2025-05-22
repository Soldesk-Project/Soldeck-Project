<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인 페이지</title>
</head>
<link rel="stylesheet" href="../resources/css/header.css">
<link rel="stylesheet" href="../resources/css/loginPage.css">
<link rel="stylesheet" href="../resources/css/common.css">
<link rel="stylesheet" href="../resources/css/footer.css">
<body>
	<div class="wrapper">
	<div class="container">
		<a href="/">
			<img src="../resources/images/logo.png" alt="로고" class="loginLogo">
		</a>
		<div class="loginBox">
			<div class="inputGroup">
				<label for="id">ID</label>
				<input type="text" id="userId" placeholder="아이디를 입력하세요.">
			</div>
			<div class="inputGroup">
				<label for="password">PASSWORD</label>
				<input type="password" id="password" placeholder="비밀번호를 입력하세요.">
			</div>
			<button type="button" class="loginBtn" id="loginBtn">로그인</button>
		</div>
		<div class="findLinks">
			<button type="button" class="btn btn-fir" id="findIdBtn"> 아이디 찾기</button>
			<button type="button" class="btn btn-fir" id="findPwBtn"> 비밀번호 찾기</button>
			<button type="button" class="btn btn-fir" id="signUpPageBtn"> 회원가입</button>	
		</div>
   </div>
   </div>
	<%@ include file="../layout/footer.jsp" %>
	
	<script type="text/javascript">
        var redirectUrl = '<%= session.getAttribute("redirectUrl") %>';
    </script>
	<script type="text/javascript" src="/resources/js/loginPage.js"></script>
</body>
</html>