<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원 가입</title>
<link rel="stylesheet" href="../resources/css/header.css">
<link rel="stylesheet" href="../resources/css/signUpPage.css">
<link rel="stylesheet" href="../resources/css/footer.css">
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>

	<div class="container">
		<form id="registrationForm" action="/login/signUpProcess" method="post" enctype="multipart/form-data">
			<div class="image-upload-container">
				<div class="image-upload-area">
					<div class="image-preview">
						<img id="previewImage" src="#" alt="미리보기">
					</div>
					<div class="file-upload">
						<label for="profileImage">파일 선택</label>
						<input type="file" id="profileImage" name="profileImage" accept="image/*">
						<span class="file-name">선택된 파일 없음</span>
					</div>
				</div>
			</div>
			
			<div class="form-group">
				<label for="name">이름</label>
				<input type="text" id="name" name="name" placeholder="NAME" required>
			</div>

			<div class="formGroup">
				<label>생년월일</label>
				<div class="birthDate">
					<input type="text" id="yyyy" name="yyyy" placeholder="yyyy" maxlength="4" required>
					<input type="text" id="mm" name="mm" placeholder="mm" maxlength="2" required>
					<input type="text" id="dd" name="dd" placeholder="dd" maxlength="2" required>
				</div>
			</div>

			<div class="formGroup">
				<label>성별</label>
				<div class="gender">
					<div class="genderOption">
						<label for="female">여성</label>
						<input type="radio" id="female" name="gender" value="female">
					</div>
					<div class="genderOption">
						<label for="male">남성</label>
						<input type="radio" id="male" name="gender" value="male">
					</div>
				</div>
			</div>
			<div class="formGroup">
				<label for="id">아이디</label>
				<input type="text" id="id" name="id" placeholder="ID" required>
				<div id="idCheckMessage" class="message"></div>
			</div>

			<div class="formGroup">
				<label for="password">비밀번호</label>
				<input type="password" id="password" name="password" placeholder="PASSWORD" required>
			</div>

			<div class="formGroup">
				<label for="nickname">별명</label>
				<input type="text" id="nickname" name="nickname" placeholder="NICKNAME" required>
				<div id="nicknameCheckMessage" class="message"></div>
			</div>

			<div class="formGroup">
				<label for="email">이메일 주소</label>
				<input type="email" id="email" name="email" placeholder="EMAIL" required>
				<div id="emailCheckMessage" class="message"></div>
			</div>

			<div class="formGroup">
				<label for="phone">연락처</label>
				<input type="tel" id="phone" name="phone" placeholder="PHONE NUMBER" required>
			</div>

			<div class="formGroup">
				<label>관심분야</label>
				<div class="interests">
					<div class="interestOption">
						<input type="checkbox" id="korean" name="interest" value="korean">
						<label for="korean">한식</label>
					</div>
					<div class="interestOption">
						<input type="checkbox" id="japanese" name="interest" value="japanese">
						<label for="japanese">일식</label>
					</div>
					<div class="interestOption">
						<input type="checkbox" id="chinese" name="interest" value="chinese">
						<label for="chinese">중식</label>
					</div>
					<div class="interestOption">
						<input type="checkbox" id="western" name="interest" value="western">
						<label for="western">양식</label>
					</div>
					<div class="interestOption">
						<input type="checkbox" id="vietnamese" name="interest" value="vietnamese">
						<label for="vietnamese">베트남요리</label>
					</div>
				</div>
				<div id="interestErrorMessage" class="message"></div>
			</div>

			<button type="submit" class="submit">회원 가입</button>
		</form>
	</div>
	
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/signUpPage.js"></script>
</body>
</html>