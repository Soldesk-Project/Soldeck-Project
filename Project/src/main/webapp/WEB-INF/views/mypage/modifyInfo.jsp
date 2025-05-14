<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<jsp:include page="../layout/header.jsp"/>

<div class="container-wrapper">
	<div class="container">
		<div class="side-menu">
			<jsp:include page="../layout/sideMenu.jsp"/>
		</div>
	<div class="main-menu">
		<form method="POST" id="modifyInfoForm" enctype="multipart/form-data">
		<div class="info">
			<p class="text_left">개인 정보</p>
			<div class="info_personal_box">
				<div class="info-profile-div-box">
					<div class="info-profile-div">
						<img class="info-profile" id="profileImage" src="/resources/upload/${member.mem_img}" alt="유저 프로필" width="80" height="80"
							onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='/resources/images/profile.png'; }"
							data-original-src="/resources/upload/${member.mem_img}">
						<input type="file" id="profileImageInput" class="previewImage" accept="image/*" name="profileImageInput">
					</div>
					<div class="info-profile-div-div">
						<p id="text1">※이미지 크기는 최소 90*90px로 업로드해주시길 바랍니다. </p>
						<button type="button" class="profile-upload" id="profileUploadBtn">업로드</button>
					</div>
				</div>
				<div class="info_border_box">
					<div class="info-title">
						<b class="info_text">이름</b>	
					</div>
					<div class="info-content">
						<input type="text" class="info-name" name="name" value="${member.mem_name}" readonly="readonly">
					</div>
				</div>
				<div class="info_border_box">
					<div class="info-title">
						<b>생년월일</b>	
					</div>
					<div class="info-content">
						<input type="text" class="info-birth" name="year" value="${fn:substring(member.mem_birth, 0, 4)}" readonly="readonly">
						<input type="text" class="info-birth" name="month" value="${fn:substring(member.mem_birth, 4, 6)}" readonly="readonly">
						<input type="text" class="info-birth" name="day" value="${fn:substring(member.mem_birth, 6, 8)}" readonly="readonly">
					</div>
				</div>
				<div class="info_border_box">
					<div class="info-title">
						<b>성별</b>	
					</div>
					<div class="info-content">
					<c:choose>
						<c:when test="${fn:substring(member.mem_birth,8,9) eq 1}">
							<input type="text" class="info-gender" name="gender" value="남자" readonly="readonly">
						</c:when>          	
						<c:otherwise>
							<input type="text" class="info-gender" name="gender" value="여자" readonly="readonly">
						</c:otherwise>
					</c:choose>
					</div>
	          	</div>
			</div>
			<p class="text_left">가입 정보</p>
			<div class="info_personal_box">
			<div class="info_border_box">
				<div class="info-title">
					<b>아이디</b>	
				</div>
				<div class="info-content">
					<input type="text" class="info-rest" id="id" name="id" value="${member.mem_id}" readonly="readonly">
				</div>
			</div>
			<div class="info_border_box">
				<div class="info-title">
					<b>비밀번호</b>	
				</div>
				<div class="info-content">
					<input type="password" class="info-rest" id="password" name="mem_pw" value="${member.mem_pw}" readonly="readonly">
					<div id="passwordErrorMessage" class="message error"></div>
				</div>
			</div>
			<div class="info_border_box">
				<div class="info-title">
					<b>별명</b>	
				</div>
				<div class="info-content">
					<input type="text" class="info-rest" id="nickName" name="mem_nick" value="${member.mem_nick}" readonly="readonly">
					<div id="nicknameCheckMessage" class="message error"></div>
				</div>
			</div>
			</div>  
			<p class="text_left">나의 추가 정보</p>
			<div class="info_personal_box">
			<div class="info_border_box">
				<div class="info-title">
					<b>이메일</b>	
				</div>
				<div class="info-content">
					<input type="text" class="info-rest" id="email" name="mem_email" value="${member.mem_email}" readonly="readonly">
					<div id="emailCheckMessage" class="message error"></div>
				</div>
			</div>
				<div class="info-title">
					<b>연락처</b>	
				</div>
				<div class="info-content">
					<div>
						<input type="text" class="info-phone" id="phone1" name="phoneNumber" value="010" readonly="readonly"><span class="dash">-</span>
						<input type="text" class="info-phone" id="phone2" name="phoneNumber" value="${fn:substring(member.mem_phone, 2, 6)}" readonly="readonly"><span class="dash">-</span>
						<input type="text" class="info-phone" id="phone3" name="phoneNumber" value="${fn:substring(member.mem_phone, 6, 10)}" readonly="readonly">
					</div>
					<div id="phoneErrorMessage" class="message error phone-error"></div>
					</div>
				<div class="info-title">
					<b>선호 음식</b>	
				</div>
				<div class="info-content">
					<fieldset>
						<input type="checkbox" class="foods" id="korean" name="food" value="1"  <c:if test="${fn:contains(foodList, '한식')}">checked</c:if>>
						<label for="korean">한식</label>
						<input type="checkbox" class="foods" id="japanese" name="food" value="2" <c:if test="${fn:contains(foodList, '중식')}">checked</c:if>>
						<label for="japanese">일식</label>
						<input type="checkbox" class="foods" id="chinese" name="food" value="3" <c:if test="${fn:contains(foodList, '일식')}">checked</c:if>>
						<label for="chinese">중식</label>
						<input type="checkbox" class="foods" id="western" name="food" value="4" <c:if test="${fn:contains(foodList, '양식')}">checked</c:if>>
						<label for="western">양식</label>
						<input type="checkbox" class="foods" id="viet" name="food" value="5" <c:if test="${fn:contains(foodList, '베트남음식')}">checked</c:if>>
						<label for="viet">베트남요리</label>
					</fieldset>
					<div id="interestErrorMessage" class="message error"></div>
				</div>
				<input type="hidden" name="mem_no" value="${member.mem_no}">
			</div>
			<div class="btn-div">
				<button type="button" class="modify-finish-btn" id="modifyFinishBtn" style="display: none;">수정 완료</button>
				<button type="reset" class="reset-btn" id="resetBtn" style="display: none;">수정 리셋</button>
				<button type="button" class="remove-btn" id="removeBtn" style="display: none;">회원 탈퇴</button>
				<button type="button" class="modify-btn" id="modifyBtn">수정</button>
			</div>
		</div>
		</form>
	</div>
	</div>
</div>
<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/modifyInfo.js"></script>
</body>
</html>