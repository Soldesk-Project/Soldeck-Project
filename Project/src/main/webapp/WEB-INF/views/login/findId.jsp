<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>아이디 찾기</title>
    <link rel="stylesheet" href="../resources/css/findId.css">
</head>
<body>
    <div class="container">
        <img src="resources/images/logo.png" alt="로고" class="logo">
		<div class="form-wrapper">
            <label for="name">이름</label>
            <input type="text" id="name" placeholder="이름을 입력하세요.">
            <label for="birth_date">생년월일</label>
            <input type="text" id="birth_date" placeholder="생년월일을 입력하세요.">
            <label for="contact">연락처</label>
            <input type="text" id="contact" placeholder="연락처를 입력하세요.">
            <div class="button-group">
            	<button id="findIdBtn">조회</button>
            	<button id="findPwPageBtn">비밀번호 찾기</button>
            </div>
            <div class="result-container" id="resultContainer" style="display: none;">
                <div id="result">아이디 조회 결과</div>
            </div>
        </div>
    </div>
    <%@ include file="../layout/footer.jsp" %>
	<script type="text/javascript" src="/resources/js/findId.js"></script>
</body>
</html>