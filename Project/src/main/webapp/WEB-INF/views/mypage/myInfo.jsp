<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
            <input type="text" class="info-name" name="name" value="NAME" readonly="readonly">
            <input type="image" class="info-profile" name="name" readonly="readonly">
          </div>
      
          <div class="info-title">
            <b>생년월일</b>	
          </div>
          <div class="info-content">
            <input type="text" class="info-birth" name="year" value="yyyy" readonly="readonly">
            <input type="text" class="info-birth" name="month" value="MM" readonly="readonly">
            <input type="text" class="info-birth" name="day" value="dd" readonly="readonly">
          </div>
      
          <div class="info-title">
            <b>성별</b>	
          </div>
          <div class="info-content">
            <input type="text" class="info-rest" name="gender" value="GENDER" readonly="readonly">
          </div>
      
          <div class="info-title">
            <b>아이디</b>	
          </div>
          <div class="info-content">
            <input type="text" class="info-rest" name="id" value="ID" readonly="readonly">
          </div>
      
          <div class="info-title">
            <b>비밀번호</b>	
          </div>
          <div class="info-content">
            <input type="password" class="info-rest" name="pw" value="PASSWORD" readonly="readonly">
          </div>
      
          <div class="info-title">
            <b>별명</b>	
          </div>
          <div class="info-content">
            <input type="text" class="info-rest" name="nickName" value="NICKNAME" readonly="readonly">
          </div>
      
          <div class="info-title">
            <b>이메일</b>	
          </div>
          <div class="info-content">
            <input type="text" class="info-rest" name="email" value="EMAIL" readonly="readonly">
          </div>
      
          <div class="info-title">
            <b>연락처</b>	
          </div>
          <div class="info-content">
            <input type="text" class="info-rest" name="phoneNumber" value="PHONENUMBER" readonly="readonly">
          </div>
          
          <div class="info-title">
            <b>선호 음식</b>	
          </div>
          <div class="info-content">
            <fieldset>
              <input type="checkbox" class="foods" name="food" value="한식" checked onClick="return false;">한식
              <input type="checkbox" class="foods" name="food" value="중식" onClick="return false;">중식
              <input type="checkbox" class="foods" name="food" value="일식" onClick="return false;">일식
              <input type="checkbox" class="foods" name="food" value="양식" onClick="return false;">양식
              <input type="checkbox" class="foods" name="food" value="베트남음식" onClick="return false;">베트남음식
            </fieldset>
          </div>
          
          <div>
            <button type="button" class="btn" id="modifyBtn">수정</button>
          </div>
        </div>
      </form>
	</div>
  </div>
  
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/myInfo.js"></script>
</body>
</html>