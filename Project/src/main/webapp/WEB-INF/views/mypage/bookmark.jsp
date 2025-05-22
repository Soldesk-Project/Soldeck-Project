<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>북마크 리스트</title>
</head>
<body>
  <jsp:include page="../layout/header.jsp"/>
  
	<div class="wrapper">
		<div class="container">
			<div class="side-menu">
	  			<jsp:include page="../layout/sideMenu.jsp"/>
			</div>
			<div class="mainBoxDesign">
				<div class="main-menu">
					<div class="loc-btn">
						<button type="button" class="all-btn" id="all" value="전체">전체</button>
						<button type="button" class="btn" id="seoulBtn" value="서울">서울</button>
						<button type="button" class="btn" id="incheonBtn" value="인천">인천</button>
						<button type="button" class="btn" id="daejeonBtn" value="대전">대전</button>
						<button type="button" class="btn" id="busanBtn" value="부산">부산</button>
						<button type="button" class="btn" id="deaguBtn" value="대구">대구</button>
						<button type="button" class="btn" id="gwangjuBtn" value="광주">광주</button>
						<button type="button" class="btn" id="ulsanBtn" value="울산">울산</button>
						<button type="button" class="btn" id="jejuBtn" value="제주">제주</button>
					</div>
			  	
				  	<div class="bookmark-list">
				  		<div class="list-main">
				  			<div class="list-title"><span>공개 즐겨찾기</span></div>
				  			<div class="list-content" id="public-bookmarks"></div>
				  		</div>
				  		<div class="change-bookmark-button">
				  			<button type="button" class="change-btn" id="rightBtn">▶</button>
				  			<button type="button" class="change-btn" id="leftBtn">◀</button>
				  		</div>
			  			<div class="list-main">
			  				<div class="list-title"><span>비공개 즐겨찾기</span></div>
				  			<div class="list-content" id="private-bookmarks"></div>
			  			</div>
			  		</div>
				</div>
			</div>
  		</div>
  	</div>

	<div id="customConfirm" class="bookmark-check-modal" style="display: none;">
		<div class="inner-modal">
	    	<p>즐겨찾기를 삭제하시겠습니까?</p>
			<div class="bookmark-modal-content">
			    <button class="out-bookmark-btn" id="outBookMarkBtn">예</button>
				<button class="cancle-modal-btn" id="cancelModalBtn">아니오</button>
		    </div>
		</div>
	</div>
	<!-- 로그인 정보 -->
    <div id="login-data" data-mem_no="${member.mem_no != null ? member.mem_no : '0'}" data-mem_name="${member.mem_name != null ? member.mem_name : ''}"></div>
    
	<footer>
  		<jsp:include page="../layout/footer.jsp"/>
  	</footer>
  	
<script type="text/javascript" src="/resources/js/bookmark.js"></script>
</body>
</html>
