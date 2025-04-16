
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
	  <div class="list-title">
	  	<span>공개 리스트</span>
	  </div>
	  <div class="list-content">
	  	<!-- for문 / DB에서 값 가져와서 수정 -->
            <div class="view">
                <div class="view-img">사진</div>
                <div class="view-info">
                    <div><img src="./images/profile.png" alt="즐겨찾기" class="bookmark-img"></div>
                    <div class="info-text">가게 이름</div>
                    <div class="info-text">가게 업종</div>
                    <div class="info-text">영업 시간</div>
                    <div class="info-text">가게 주소</div>
                </div>
            </div>
           <!--  -->
            <div class="view">
                <div class="view-img">사진</div>
                <div class="view-info">
                    <div><img src="./images/profile.png" alt="즐겨찾기" class="bookmark-img"></div>
                    <div class="info-text">가게 이름</div>
                    <div class="info-text">가게 업종</div>
                    <div class="info-text">영업 시간</div>
                    <div class="info-text">가게 주소</div>
                </div>
            </div>
            <div class="view">
                <div class="view-img">사진</div>
                <div class="view-info">
                    <div><img src="./images/profile.png" alt="즐겨찾기" class="bookmark-img"></div>
                    <div class="info-text">가게 이름</div>
                    <div class="info-text">가게 업종</div>
                    <div class="info-text">영업 시간</div>
                    <div class="info-text">가게 주소</div>
                </div>
            </div>
            <div class="view">
                <div class="view-img">사진</div>
                <div class="view-info">
                    <div><img src="./images/profile.png" alt="즐겨찾기" class="bookmark-img"></div>
                    <div class="info-text">가게 이름</div>
                    <div class="info-text">가게 업종</div>
                    <div class="info-text">영업 시간</div>
                    <div class="info-text">가게 주소</div>
                </div>
            </div>
	  </div>
	  <div class="list-title">
	  	<span>나만의 작은 리스트</span>
	  </div>
	  <div class="list-content">
	  	<!-- for문 / DB에서 값 가져와서 수정 / 내용 넘치면 스크롤 생성-->
            <div class="view">
                <div class="view-img">사진</div>
                <div class="view-info">
                    <div><img src="./images/profile.png" alt="즐겨찾기" class="bookmark-img"></div>
                    <div class="info-text">가게 이름</div>
                    <div class="info-text">가게 업종</div>
                    <div class="info-text">영업 시간</div>
                    <div class="info-text">가게 주소</div>
                </div>
            </div>
            <div class="view">
                <div class="view-img">사진</div>
                <div class="view-info">
                    <div><img src="./images/profile.png" alt="즐겨찾기" class="bookmark-img"></div>
                    <div class="info-text">가게 이름</div>
                    <div class="info-text">가게 업종</div>
                    <div class="info-text">영업 시간</div>
                    <div class="info-text">가게 주소</div>
                </div>
            </div>
            <div class="view">
                <div class="view-img">사진</div>
                <div class="view-info">
                    <div><img src="./images/profile.png" alt="즐겨찾기" class="bookmark-img"></div>
                    <div class="info-text">가게 이름</div>
                    <div class="info-text">가게 업종</div>
                    <div class="info-text">영업 시간</div>
                    <div class="info-text">가게 주소</div>
                </div>
            </div>
	  </div>
	</div>
  </div>
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/bookmark.js"></script>
</body>
</html>
