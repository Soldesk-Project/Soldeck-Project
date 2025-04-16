<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입 페이지</title>
<link rel="stylesheet" href="../resources/css/signUpPage.css">
</head>
<body>
    <%@ include file="../layout/header.jsp" %>

    <div class="signup-container">
        <h2>회원 가입</h2>
        <form action="signupProcess.jsp" method="post">
            <div class="form-group">
                <label for="name">이름</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label>생년월일</label>
                <div class="birth-date">
                    <input type="number" id="birthYear" name="birthYear" placeholder="YYYY" required>
                    <input type="number" id="birthMonth" name="birthMonth" placeholder="MM" required>
                    <input type="number" id="birthDay" name="birthDay" placeholder="DD" required>
                </div>
            </div>
            <div class="form-group">
                <label>성별</label>
                <div class="gender">
                	 <div class="gender-option">
                        <label for="female">여성</label>
                        <input type="radio" id="female" name="gender" value="female">
                    </div>
                    <div class="gender-option">
                        <label for="male">남성</label>
                        <input type="radio" id="male" name="gender" value="male">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="id">아이디</label>
                <input type="text" id="id" name="id" required>
            </div>
            <div class="form-group">
                <label for="password">비밀번호</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label for="nickname">별명</label>
                <input type="text" id="nickname" name="nickname" required>
            </div>
            <div class="form-group">
                <label for="email">이메일 주소</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="phone">연락처</label>
                <input type="tel" id="phone" name="phone" required>
            </div>
            <button type="submit">회원 가입</button>
        </form>
    </div>


    <%@ include file="../layout/footer.jsp" %>

	<script type="text/javascript" src="/resources/js/signUpPage.js"></script>
</body>
</html>