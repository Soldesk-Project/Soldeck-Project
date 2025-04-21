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
	
	<div class="page-header">
		<div class="location-select">
			<select>
				<option value="">지역 선택</option>
				<option value="서울">서울</option>
				<option value="부산">부산</option>
				<option value="대전">대전</option>
				<option value="대구">대구</option>
				<option value="울산">울산</option>
				<option value="광주">광주</option>
				<option value="인천">인천</option>
				<option value="제주">제주</option>
			</select>
	    </div>
   </div>
   
   <div class="panel-body">
   		<div class="kategorie-container">
		    <ul class="kategorie-list">
		    	<li><button type="button" class="btn btn-fir" id="korBtn">한식</button></li>
		    	<li><button type="button" class="btn btn-fir" id="chnBtn">중식</button></li>
		    	<li><button type="button" class="btn btn-fir" id="japBtn">일식</button></li>
		    	<li><button type="button" class="btn btn-fir" id="wesBtn">양식</button></li>
		    	<li><button type="button" class="btn btn-fir" id="vietBtn">베트남</button></li>
		    </ul>
   		</div>
   </div>
   
	<div class="panel-footer">
		<div class="chat-body">
			<div class="image-con">
		      <!-- 이미지와 가게 이름 세트 -->
		      <div class="item-set" data-rest-no="1">
		        <div class="image">
		          <img src="https://img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E" alt="이미지 1">
		        </div>
		        <div class="name">
		          <p>가게 이름test</p>
		        </div>
		      </div>
			</div>
		</div>
	</div>
	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/location.js"></script> 
</body>
</html>