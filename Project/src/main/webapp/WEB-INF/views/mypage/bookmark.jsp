
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<!-- Font Awesome 5 CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
</head>
<body>
  <jsp:include page="../layout/header.jsp"/>
  
  <div class="container">
	<div class="side-menu">
  		<jsp:include page="../layout/sideMenu.jsp"/>
	</div>
	<div class="main-menu">
	  <div class="list-title">
	  	<span>공개 리스트</span>
	  </div>
	  <div class="list-content">
	  	<!-- for문 / DB에서 값 가져와서 수정 -->
            <div class="view">
                <div class="view-img">
                	<img alt="가게 사진" src="/resources/images/index_slide_image_2.png" class="view-res-image">
                </div>
                <div class="view-info">
                    <div><button type="button" class="bookmark" id="bookmarkBtn">★</button></div>
                    <div class="info-text">
	                    <a href="#" draggable="false"><input type="text" class="res-name" value="가게 이름" readonly="readonly"></a>
	                    <span class="input-size" id="input-size"></span>
	                    <input type="text" class="res-industry" value="가게 업종" readonly="readonly">
	                    <input type="text" class="res-time" value="영업 시간" readonly="readonly">
	                    <input type="text" class="res-addr" value="가게 주소" readonly="readonly">
                    </div>
                </div>
            </div>
           <!--  -->
	  </div>
	  <div class="list-title">
	  	<span>나만의 작은 리스트</span>
	  </div>
	  <div class="list-content">
	  	<!-- for문 / DB에서 값 가져와서 수정 / 내용 넘치면 스크롤 생성-->
            <div class="view">
                <div class="view-img">
                	<img alt="가게 사진" src="/resources/images/index_slide_image_2.png" class="view-res-image">
                </div>
                <div class="view-info">
                    <div><button type="button" class="bookmark" id="bookmarkBtn">★</button></div>
                    <div class="info-text">
	                    <a href="#" draggable="false"><input type="text" class="res-name" value="가게 이름" readonly="readonly"></a>
	                    <span class="input-size" id="input-size"></span>
	                    <input type="text" class="res-industry" value="가게 업종" readonly="readonly">
	                    <input type="text" class="res-time" value="영업 시간" readonly="readonly">
	                    <input type="text" class="res-addr" value="가게 주소" readonly="readonly">
                    </div>
                </div>
            </div>
	
	  </div>
	</div>
  </div>
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/bookmark.js"></script>
</body>
</html>
