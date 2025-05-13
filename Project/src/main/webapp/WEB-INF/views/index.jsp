<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>메인 페이지</title>
</head>
    <link rel="stylesheet" href="../resources/css/header.css">
	<link rel="stylesheet" href="../resources/css/index.css">
    <link rel="stylesheet" href="../resources/css/footer.css">
<body>
    <%@ include file="../views/layout/header.jsp" %>
	
	<div class="bodyWrapper">
	<div class="content">
		<div class="image-section">
			<button class="slide-btn prev" onclick="moveSlider('image', -1)">&#10094;</button>
			<div class="slides" id="slides">
				<div class="slide-container">
		            <img src="resources/images/index_slide_image_1.png" alt="슬라이드 이미지 1" class="slide"> <!-- 이미지 강제로 넣은.. db기준으로 랜덤돌려야 함 '이하동문' -->
		        </div>
		        <div class="slide-container">
		            <img src="resources/images/index_slide_image_2.png" alt="슬라이드 이미지 2" class="slide">
		        </div>
		        <div class="slide-container">
		            <img src="resources/images/index_slide_image_1.png" alt="슬라이드 이미지 3" class="slide">
		        </div>
    		</div>
    		<button class="slide-btn next" onclick="moveSlider('image', 1)">&#10095;</button>
		</div>
		
	<div class="select_box">
		<div class="page-header">
			<div class="location-select">
		
		    </div>
	  	</div>
	   
	   <div class="panel-body">
	   		<div class="kategorie-container">
			    <ul class="kategorie-list">
			    	<li>
			    		<button type="button" class="btn btn-fir" id="korBtn" value="한식"></button>
			    		<p>한식</p>
			    	</li>
			    	<li>
			    		<button type="button" class="btn btn-fir" id="chnBtn" value="중식"></button>
			    		<p>중식</p>
			    	</li>
			    	<li>
				    	<button type="button" class="btn btn-fir" id="japBtn" value="일식"></button>
				    	<p>일식</p>
			    	</li>
			    	<li>
				    	<button type="button" class="btn btn-fir" id="wesBtn" value="양식"></button>
				    	<p>양식</p>
			    	</li>
			    	<li>
				    	<button type="button" class="btn btn-fir" id="vietBtn" value="베트남식"></button>
				    	<p>베트남</p>
			    	</li>
			    </ul>
	   		</div>
	   </div>
	</div>
		

        	<div class="recommendations">
            	<h2 class="indexTitle"># 오늘의 추천 pick</h2>
				<div class="recommendation-slider-wrapper">
			    	<button class="slide-btn prev" onclick="moveSlider('today', -1)">&#10094;</button>
			
			    	<div class="recommendation-slider-window">
			        	<div class="recommendation-slider-track" id="today-slider">
			            	<!-- <div class="recommendation-item"><img src="/resources/images/1.png" alt="추천 1" onclick="showRandumfood()"></div> -->
			        	</div>
			    	</div>
			
			    	<button class="slide-btn next" onclick="moveSlider('today', 1)">&#10095;</button>
				</div>

			<c:if test="${sessionScope.loggedInUser != null}">
            	<h2 class="indexTitle"># 내 취향에 맞게 pick</h2>
				<div class="recommendation-slider-wrapper">
			    	<button class="slide-btn prev" onclick="moveSlider('preference', -1)">&#10094;</button>
			
			    	<div class="recommendation-slider-window">
			        	<div class="recommendation-slider-track" id="preference-slider">
			            	<!-- <div class="recommendation-item"><img src="preference1.jpg" alt="취향 1" onclick="showMostpickfood()"></div> -->
			        	</div>
			    	</div>
			
			    	<button class="slide-btn next" onclick="moveSlider('preference', 1)">&#10095;</button>
				</div>

            	<!-- <h2 class="indexTitle"># 친구 추천 pick</h2>
				<div class="recommendation-slider-wrapper">
			    	<button class="slide-btn prev" onclick="moveSlider('friend', -1)">&#10094;</button>
			
			    	<div class="recommendation-slider-window">
			        	<div class="recommendation-slider-track" id="friend-slider">
			            	<div class="recommendation-item"><img src="friend1.jpg" alt="친구 추천 1" onclick="showFirendpickfood()"></div>
			            	<div class="recommendation-item"><img src="friend2.jpg" alt="친구 추천 2" onclick="showFirendpickfood()"></div>
			            	<div class="recommendation-item"><img src="friend3.jpg" alt="친구 추천 3" onclick="showFirendpickfood()"></div>
			            	<div class="recommendation-item"><img src="friend4.jpg" alt="친구 추천 4" onclick="showFirendpickfood()"></div>
			            	<div class="recommendation-item"><img src="friend5.jpg" alt="친구 추천 4" onclick="showFirendpickfood()"></div>
			            	<div class="recommendation-item"><img src="friend6.jpg" alt="친구 추천 4" onclick="showFirendpickfood()"></div>
			        	</div>
			    	</div>
			
			    	<button class="slide-btn next" onclick="moveSlider('friend', 1)">&#10095;</button>
				</div> -->
			</c:if>
        </div>
        
        <!-- 랭킹 탭 -->
        <div class="rank-tap">
        	<div class="rank-header">
	        	<div class="header-rating active" data-tab="rating">평점</div>
	        	<div class="header-review" data-tab="review">리뷰</div>
        	</div>
        	<div class="rank-content">
	        	<div class="content-rating show"></div>
	        	<div class="content-review"></div>
        	</div>
        </div>
        
		<div class="popup" id="popup">
	            <div class="popup-content">
	                <span class="popup-close" id="popup-close">&times;</span>
	                <img alt="pop-up" src="/resources/images/popup.png" class="pop-up_image">
	            </div>
	    </div>
	    <div id="user-data" data-user="${sessionScope.loggedInUser.mem_no}"></div>
    </div>
	</div>

	<script type="text/javascript" src="/resources/js/index.js"></script>
	<script type="text/javascript">
            const currentNo = ${currentNo}; // JSP에서 전달된 currentNo를 JavaScript로 사용
	</script>
    <%@ include file="../views/layout/footer.jsp" %>
</body>
</html>