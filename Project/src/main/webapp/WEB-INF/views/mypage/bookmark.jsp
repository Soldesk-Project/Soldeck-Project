<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>북마크 리스트</title>
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
	  	<c:forEach var="bm" items="${bookmarkList }">
	  	<c:if test="${bm.is_public eq 'Y'}">
            <div class="view">
                <div class="view-img">
                	<img alt="res img" src="${bm.rest.rest_img_name }" class="view-res-image">
                </div>
                <div class="view-info">
                    <div><button type="button" class="bookmark" id="bookmarkBtn">★</button></div>
                    <div class="info-text">
	                    <a href="#" draggable="false">
	                    	<input type="text" class="res-name" value="${bm.rest.rest_name }" readonly="readonly"><span class="input-size"></span>
	                    </a>
	                    <input type="text" class="res-industry" value="${bm.rest.rest_cate }" readonly="readonly">
	                    <input type="text" class="res-time" value="${bm.rest.rest_bh }" readonly="readonly">
	                    <input type="text" class="res-addr" value="${bm.rest.rest_adr }" readonly="readonly">
	                    <input type="hidden" id="memNo" value="${bm.mem_no }">
	                    <input type="hidden" id="restNo" value="${bm.rest.rest_no }">
                    </div>
                </div>
            </div>
           <!--  -->
	  	</c:if>
	  	</c:forEach>

	  	</div>
	  </div>
	   
	  <div class="list-title">
	  	<span>나만의 작은 리스트</span>
	  </div>
	  <div class="list-content">
	  	<div class="inner-content">
        	<c:forEach var="bm" items="${bookmarkList }">
	  	<c:if test="${bm.is_public eq 'N'}">
            <div class="view">
                <div class="view-img">
                	<img alt="res img" src="${bm.rest.rest_img_name }" class="view-res-image">
                </div>
                <div class="view-info">
                    <div><button type="button" class="bookmark" id="bookmarkBtn">★</button></div>
                    <div class="info-text">
	                    <a href="#" draggable="false">
	                    	<input type="text" class="res-name" value="${bm.rest.rest_name }" readonly="readonly"><span class="input-size"></span>
                    	</a>
	                    <input type="text" class="res-industry" value="${bm.rest.rest_cate }" readonly="readonly">
	                    <input type="text" class="res-time" value="${bm.rest.rest_bh }" readonly="readonly">
	                    <input type="text" class="res-addr" value="${bm.rest.rest_adr }" readonly="readonly">
                        <input type="hidden" id="restNo" value="${bm.rest.rest_no }">
                    </div>
                </div>
            </div>
           <!--  -->
	  	</c:if>
	  	</c:forEach>
	  		
	  		
	  	</div>
	  </div>
	</div>
  </div>

	<div id="customConfirm" class="bookmark-check-modal">
		<div class="inner-modal">
	    	<p>즐겨찾기를 삭제하시겠습니까?</p>
			<div class="bookmark-modal-content">
			    <button class="out-bookmark-btn" id="outBookMarkBtn">예</button>
				<button class="cancle-modal-btn" id="cancelModalBtn">아니오</button>
		    </div>
		</div>
	</div>

  <jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/bookmark.js"></script>
</body>
</html>
