<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>

<!-- Flatpickr CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

<!-- Flatpickr JS -->
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

<!-- 한국어 설정  -->
<script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/ko.js"></script>

<meta charset="UTF-8">
<title>메인 페이지</title>
</head>
    <link rel="stylesheet" href="../resources/css/header.css">
	<link rel="stylesheet" href="../resources/css/index.css">
    <link rel="stylesheet" href="../resources/css/common.css">
    <link rel="stylesheet" href="../resources/css/footer.css">
<body>
	
    <%@ include file="../views/layout/header.jsp" %>
	<div class="bodyWrapper">
	
	<!-- banner layout -->
	<div class="banner_gap">
    	<div class="banner" id="banner1">
    		<a href="/community/communityMain?page=0004"><img alt="배너1" src="resources/images/banner1.png"></a>
    	</div>
    	<div class="banner" id="banner2">
    		<a href="/community/communityMain?page=0003"><img alt="배너2" src="resources/images/banner2.png"></a>
    	</div>
    </div>
	
	<div class="content">
		<div class="image-section">
			<button class="slide-btn prev" onclick="moveSliderIndex('image', -1)">&#10094;</button>
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
    		<button class="slide-btn next" onclick="moveSliderIndex('image', 1)">&#10095;</button>
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
			    		<a href="../search/map" class="btn btn-fir" data-value="한식">
							<img src="resources/images/korea_food.png" alt="한식 아이콘">
    						<p>한식</p>
    					</a>
			    	</li>
			    	<li>
			    		<a href="../search/map" class="btn btn-fir" data-value="중식">
							<img src="resources/images/china_food.png" alt="중식 아이콘">
			    			<p>중식</p>
    					</a>
			    	</li>
			    	<li>
			    		<a href="../search/map" class="btn btn-fir" data-value="일식">
							<img src="resources/images/japan_food.png" alt="일식 아이콘">
				    		<p>일식</p>
    					</a>
			    	</li>
			    	<li>
			    		<a href="../search/map" class="btn btn-fir" data-value="양식">
							<img src="resources/images/America_food.png" alt="양식 아이콘">
				    		<p>양식</p>
    					</a>
			    	</li>
			    	<li>
			    		<a href="../search/map" class="btn btn-fir" data-value="베트남식">
							<img src="resources/images/vietnam_food.png" alt="베트남 아이콘">
				    		<p>베트남</p>
    					</a>
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

			</c:if>
        </div>
        
        <!-- 
		<div class="popup" id="popup">
	            <div class="popup-content">
	                <span class="popup-close" id="popup-close">&times;</span>
	                <img alt="pop-up" src="/resources/images/popup.png" class="pop-up_image">
	            </div>
	    </div>
         -->
	    <div id="user-data" data-user="${sessionScope.loggedInUser.mem_no}"></div>
    </div>
    
    <!-- 랭킹 탭 -->
    	<div class="right_content">
	        <div class="rank_layout">
				<div class="rank_text">
		        	<div class="resRank_text">가게랭킹</div>
		       		<div id="today-datetime"></div>
		        </div>
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
	        </div>
	    
		    <div class="mini-calendar-wrapper">
		    	<input type="text" id="mini-calendar" placeholder="날짜 선택">
			</div>
			
			<div id="reserve-popup" class="reserve-popup hidden">
			  <div class="popup-content">
			    <span class="popup-close" onclick="closePopup()">&times;</span>
			    <div id="popup-date" class="popup-date"></div>
			    <div id="popup-details" class="popup-details"></div>
			  </div>
			</div>
			
		</div>
    
	</div>

	<script type="text/javascript" src="/resources/js/index.js"></script>
    <%@ include file="../views/layout/footer.jsp" %>
</body>
</html>