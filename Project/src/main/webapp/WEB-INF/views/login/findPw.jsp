<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>비밀번호 찾기</title>
<link rel="stylesheet" href="../resources/css/findPw.css">
</head>
<body>
    <div class="container">
        <img src="resources/images/logo.png" alt="로고" class="logo">
		<div class="form-wrapper">
        	<label for="Id">Id</label>
            <input type="text" id="Id" placeholder="아이디를 입력하세요.">
            <label for="bith_date">생년월일</label>
            <input type="text" id="birth_date" placeholder="생년월일을 입력하세요.">
            <label for="contact">연락처</label>
            <input type="text" id="contact" placeholder="연락처를 입력하세요.">
            <button id="findPwBtn">조회</button>
            <div class="result-container" id="resultContainer" style="display: none;">
            <div id="result">비밀번호 조회 결과</div>
        	</div>
        </div>
    </div>
    
        <%@ include file="../layout/footer.jsp" %>
    
    <script src="resources/js/findPw.js"></script>
</body>
</html>