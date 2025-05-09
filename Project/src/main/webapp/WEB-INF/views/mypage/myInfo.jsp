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
      <form method="POST">

        <div class="info">
        <p class="myInfo_text"> 나의 정보 </p>
        <div class="info_personal_box">
			<div class="info-profile-div">
	            <img class="info-profile" src="../resources/upload/${member.mem_img}" alt="유저 프로필" onerror="this.src='/resources/images/profile.png'">
			</div>            
	        <div class="info-title">
	        <b>이름</b>	
	        </div>
	        <div class="info-content">
	        	<input type="text" class="info-name" name="name" value="${member.mem_name}" readonly="readonly">
	        </div>
        
      
	        <div class="info-title">
	        	<b>생년월일</b>	
	        </div>
	        <div class="info-content">
		        <input type="text" class="info-birth" name="year" value="${fn:substring(member.mem_birth, 0, 4)}" readonly="readonly">
		        <input type="text" class="info-birth" name="month" value="${fn:substring(member.mem_birth, 4, 6)}" readonly="readonly">
		        <input type="text" class="info-birth" name="day" value="${fn:substring(member.mem_birth, 6, 8)}" readonly="readonly">
	        </div>
        </div>
    
        <div class="info_personal_box">
        <div class="info-title">
          <b>아이디</b>	
        </div>
        <div class="info-content">
          <input type="text" class="info-rest" name="id" value="${member.mem_id}" readonly="readonly">
        </div>
    
        <div class="info-title">
          <b>비밀번호</b>	
        </div>
        <div class="info-content">
          <input type="password" class="info-rest" name="pw" value="${member.mem_pw}" readonly="readonly">
        </div>
    
        <div class="info-title">
          <b>별명</b>	
        </div>
        <div class="info-content">
          <input type="text" class="info-rest" name="nickName" value="${member.mem_nick}" readonly="readonly">
        </div>
        </div>
    
        <div class="info_personal_box">
        <div class="info-title">
          <b>이메일</b>	
        </div>
        <div class="info-content">
          <input type="text" class="info-rest" name="email" value="${member.mem_email}" readonly="readonly">
        </div>
    
        <div class="info-title">
          <b>연락처</b>	
        </div>
        <div class="info-content">
          <input type="text" class="info-phone" name="phoneNumber" value="0${fn:substring(member.mem_phone, 0, 2)}" readonly="readonly"><span>-</span>
          <input type="text" class="info-phone" name="phoneNumber" value="${fn:substring(member.mem_phone, 2, 6)}" readonly="readonly"><span>-</span>
          <input type="text" class="info-phone" name="phoneNumber" value="${fn:substring(member.mem_phone, 6, 10)}" readonly="readonly">
        </div>
        
        <div class="info-title">
          <b>선호 음식</b>	
        </div>
        <div class="info-content">
          <fieldset>
            <input type="checkbox" class="foods" name="food" value="한식" disabled <c:if test="${fn:contains(foodList, '한식')}">checked</c:if> onClick="return false;">한식
            <input type="checkbox" class="foods" name="food" value="중식" disabled <c:if test="${fn:contains(foodList, '중식')}">checked</c:if> onClick="return false;">중식
            <input type="checkbox" class="foods" name="food" value="일식" disabled <c:if test="${fn:contains(foodList, '일식')}">checked</c:if> onClick="return false;">일식
            <input type="checkbox" class="foods" name="food" value="양식" disabled <c:if test="${fn:contains(foodList, '양식')}">checked</c:if> onClick="return false;">양식
            <input type="checkbox" class="foods" name="food" value="베트남음식" disabled <c:if test="${fn:contains(foodList, '베트남음식')}">checked</c:if> onClick="return false;">베트남음식
          </fieldset>
        </div>
        <input type="hidden" name="mno" value="${member.mem_no}">
        </div>
        <div class="btn-div">
          <button type="button" class="modify-btn" id="modifyBtn">수정</button>
        </div>
        </div>
      </form>
	</div>
  </div>
  </div>
  
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/myInfo.js"></script>
</body>
</html>