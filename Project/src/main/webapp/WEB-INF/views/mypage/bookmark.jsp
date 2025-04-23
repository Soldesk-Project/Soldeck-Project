<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
	  
	  		
	  <div class="list-title">
	  	<span>공개 리스트</span>
	  </div>
	  <div class="list-content">
	  	<div class="inner-content">
	  	<c:forEach var="rest" items="${restList }">
	  	<c:if test="${bookmark.is_public =='Y'}">
            <div class="view">
                <div class="view-img">
                	<img alt="res img" src="/resources/images/index_slide_image_2.png" class="view-res-image">
                </div>
                <div class="view-info">
                    <div><button type="button" class="bookmark" id="bookmarkBtn">★</button></div>
                    <div class="info-text">
	                    <a href="#" draggable="false"><input type="text" class="res-name" value="${rest.rest_name }" readonly="readonly"></a>
	                    <span class="input-size" id="input-size"></span>
	                    <input type="text" class="res-industry" value="${rest.rest_cate }" readonly="readonly">
	                    <input type="text" class="res-time" value="${rest.rest_bh }" readonly="readonly">
	                    <input type="text" class="res-addr" value="${rest.rest_adr }" readonly="readonly">
                    </div>
                </div>
            </div>
           <!--  -->
	  	</c:if>
	  	</c:forEach>

	  	</div>
	  </div>
	  
	  	<c:if test="${bookmark.is_public =='N'}">
	  
	  <div class="list-title">
	  	<span>나만의 작은 리스트</span>
	  </div>
	  <div class="list-content">
	  	<div class="inner-content">
	  		<c:forEach var="rest" items="${restList }">
            <div class="view">
                <div class="view-img">
                	<img alt="가게 사진" src="/resources/images/index_slide_image_2.png" class="view-res-image">
                </div>
                <div class="view-info">
                    <div><button type="button" class="bookmark" id="bookmarkBtn">★</button></div>
                    <div class="info-text">
	                    <a href="#" draggable="false"><input type="text" class="res-name" value="${rest.rest_name }" readonly="readonly"></a>
	                    <span class="input-size" id="input-size"></span>
	                    <input type="text" class="res-industry" value="${rest.rest_cate }" readonly="readonly">
	                    <input type="text" class="res-time" value="${rest.rest_bh }" readonly="readonly">
	                    <input type="text" class="res-addr" value="${rest.rest_adr }" readonly="readonly">
                    </div>
                </div>
            </div>
	  		</c:forEach>
	  		
	  		
	  	</div>
	  </div>
	  
		  	</c:if>
	</div>
  </div>
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/bookmark.js"></script>
</body>
</html>
