<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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

    <div class="content">
        <div class="image-section">
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
    		
		</div>
		<div class="main2">
	        <div class="location-select">
	            <select class="locationOption">
	                <option value="">지역 선택</option>
	                <option value="seoul">서울</option>
	                <option value="busan">경기</option>
	                <option value="busan">인천</option>
	                <option value="busan">대구</option>
	                <option value="busan">울산</option>
	                <option value="busan">광주</option>
	                <option value="busan">대전</option>
	                <option value="busan">제주</option>
	                </select>
	        </div>
	
			<div class="category-buttons-container">
	    		<div class="category-buttons">
	    			<div class="koreaFood" onclick="showKoreafood()">
		        		<img src="#"class="category-button">
		        		<p class="foodText">한식</p>
	        		</div>
	        		<div class="chinaFood" onclick="showChinafood()">
	        			<img src="#"class="category-button">
	        			<p class="foodText">중식</p>
	        		</div>
	        		<div class="japanFood" onclick="showJapanfood()">
	        			<img src="#"class="category-button">
	        			<p class="foodText">일식</p>
	        		</div>
	        		<div class="westurnFood" onclick="showWesturnfood()">
	        			<img src="#"class="category-button">
	        			<p class="foodText">양식</p>
	        		</div>
	        		<div class="vietnamFood" onclick="showVietfood()">
	        			<img src="#"class="category-button">
	        			<p class="foodText">베트남요리</p>
	        		</div>
	    		</div>
			</div>
		</div>
        <div class="recommendations">
            <h2 class="indexTitle"># 오늘의 추천 pick</h2>
			<div class="recommendation-slider-wrapper">
			    <button class="slide-btn prev" onclick="moveSlider('today', -1)">&#10094;</button>
			
			    <div class="recommendation-slider-window">
			        <div class="recommendation-slider-track" id="today-slider">
			            <div class="recommendation-item"><img src="/resources/images/1.png" alt="추천 1" onclick="showRandumfood()"></div>
			            <div class="recommendation-item"><img src="/resources/images/2.png" alt="추천 2" onclick="showRandumfood()"></div>
			            <div class="recommendation-item"><img src="/resources/images/3.png" alt="추천 3" onclick="showRandumfood()"></div>
			            <div class="recommendation-item"><img src="/resources/images/4.png" alt="추천 4" onclick="showRandumfood()"></div>
			            <div class="recommendation-item"><img src="/resources/images/5.png" alt="추천 5" onclick="showRandumfood()"></div>
			            <div class="recommendation-item"><img src="/resources/images/6.png" alt="추천 5" onclick="showRandumfood()"></div>
			        </div>
			    </div>
			
			    <button class="slide-btn next" onclick="moveSlider('today', 1)">&#10095;</button>
			</div>

            <h2 class="indexTitle"># 내 취향에 맞게 pick</h2>
			<div class="recommendation-slider-wrapper">
			    <button class="slide-btn prev" onclick="moveSlider('preference', -1)">&#10094;</button>
			
			    <div class="recommendation-slider-window">
			        <div class="recommendation-slider-track" id="preference-slider">
			            <div class="recommendation-item"><img src="preference1.jpg" alt="취향 1" onclick="showMostpickfood()"></div>
			            <div class="recommendation-item"><img src="preference2.jpg" alt="취향 2" onclick="showMostpickfood()"></div>
			            <div class="recommendation-item"><img src="preference3.jpg" alt="취향 3" onclick="showMostpickfood()"></div>
			            <div class="recommendation-item"><img src="preference4.jpg" alt="취향 4" onclick="showMostpickfood()"></div>
			            <div class="recommendation-item"><img src="preference5.jpg" alt="취향 4" onclick="showMostpickfood()"></div>
			            <div class="recommendation-item"><img src="preference6.jpg" alt="취향 4" onclick="showMostpickfood()"></div>
			        </div>
			    </div>
			
			    <button class="slide-btn next" onclick="moveSlider('preference', 1)">&#10095;</button>
			</div>

            <h2 class="indexTitle"># 친구 추천 pick</h2>
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
			</div>
        </div>
		<div class="popup" id="popup">
	            <div class="popup-content">
	                <span class="popup-close" id="popup-close">&times;</span>
	                <img alt="pop-up" src="/resources/images/popup.png" class="pop-up_image">
	            </div>
	    </div>
    </div>


	<script type="text/javascript" src="/resources/js/index.js"></script>
    <%@ include file="../views/layout/footer.jsp" %>
</body>
</html>