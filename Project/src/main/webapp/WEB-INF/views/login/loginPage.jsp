<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인 페이지</title>
<link rel="stylesheet" href="../resources/css/loginPage.css">
</head>
<body>
  <div class="container">
        <img src="resources/images/logo.png" alt="로고">
        <div class="login-box">
            <div class="input-group">
                <label for="id">ID</label>
                <input type="text" id="id" placeholder="아이디를 입력하세요.">
            </div>
            <div class="input-group">
                <label for="password">PASSWORD</label>
                <input type="password" id="password" placeholder="비밀번호를 입력하세요.">
            </div>
            <button class="login-btn">로그인</button>
        </div>
        <div class="find-links">
        	<button type="button" class="btn btn-fir" id="findIdBtn"> 아이디 찾기</button>
        	<button type="button" class="btn btn-fir" id="findPwBtn"> 비밀번호 찾기</button>
        	<button type="button" class="btn btn-fir" id="registerMemberBtn"> 회원가입</button>	
        </div>
    </div>
    
    
    <%@ include file="../layout/footer.jsp" %>

    <script src="resources/js/loginPage.js"></script>
</body>
</html>