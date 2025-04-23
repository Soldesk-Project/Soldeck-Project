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
  
  <div class="container">
	<div class="side-menu">
  		<jsp:include page="../layout/sideMenu.jsp"/>
	</div>
	<div class="main-menu">
      <form method="POST">

        <div class="info">
          <div class="info-title">
            <b>이름</b>	
          </div>
          <div class="info-content">
            <input type="text" class="info-name" name="name" value="${member.mem_name}" readonly="readonly">
			<div class="info-profile-div">
	            <img class="info-profile" src="${member.mem_img}" alt="유저 프로필" onerror="this.src='/resources/images/profile.png'">
			</div>            
          </div>
      
          <div class="info-title">
            <b>생년월일</b>	
          </div>
          <div class="info-content">
            <input type="text" class="info-birth" name="year" value="${fn:substring(member.mem_birth, 0, 4)}" readonly="readonly">
            <input type="text" class="info-birth" name="month" value="${fn:substring(member.mem_birth, 4, 6)}" readonly="readonly">
            <input type="text" class="info-birth" name="day" value="${fn:substring(member.mem_birth, 6, 8)}" readonly="readonly">
          </div>
      
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
      
          <div class="info-title">
            <b>아이디</b>	
          </div>
          <div class="info-content">
            <input type="text" class="info-rest" name="id" value="${member.mem_id}">
          </div>
      
          <div class="info-title">
            <b>비밀번호</b>	
          </div>
          <div class="info-content">
            <input type="password" class="info-rest" name="pw" value="${member.mem_pw}">
          </div>
      
          <div class="info-title">
            <b>별명</b>	
          </div>
          <div class="info-content">
            <input type="text" class="info-rest" name="nickName" value="${member.mem_nick}">
          </div>
      
          <div class="info-title">
            <b>이메일</b>	
          </div>
          <div class="info-content">
            <input type="text" class="info-rest" name="email" value="${member.mem_email}">
          </div>
      
          <div class="info-title">
            <b>연락처</b>	
          </div>
          <div class="info-content">
            <input type="text" class="info-phone" name="phoneNumber" value="${fn:substring(member.mem_phone, 0, 3)}"><span>-</span>
            <input type="text" class="info-phone" name="phoneNumber" value="${fn:substring(member.mem_phone, 3, 7)}"><span>-</span>
            <input type="text" class="info-phone" name="phoneNumber" value="${fn:substring(member.mem_phone, 7, 11)}">
          </div>
          
          <div class="info-title">
            <b>선호 음식</b>	
          </div>
          <div class="info-content">
            <fieldset>
              <input type="checkbox" class="foods" name="food" value="한식"  <c:if test="${fn:contains(foodList, '한식')}">checked</c:if>>한식
              <input type="checkbox" class="foods" name="food" value="중식" <c:if test="${fn:contains(foodList, '중식')}">checked</c:if>>중식
              <input type="checkbox" class="foods" name="food" value="일식" <c:if test="${fn:contains(foodList, '일식')}">checked</c:if>>일식
              <input type="checkbox" class="foods" name="food" value="양식" <c:if test="${fn:contains(foodList, '양식')}">checked</c:if>>양식
              <input type="checkbox" class="foods" name="food" value="베트남음식" <c:if test="${fn:contains(foodList, '베트남음식')}">checked</c:if>>베트남음식
            </fieldset>
            <p class="food-error-message" style="color: red;"></p>
          </div>
          <div class="btn-div">
            <button type="button" class="modify-btn" id="modifyBtn">수정 완료</button>
          </div>
        </div>
      </form>
	</div>
  </div>
  
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/myInfo.js"></script>
</body>
</html>