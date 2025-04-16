<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>메인 페이지</title>
<link rel="stylesheet" href="../resources/css/index.css">
</head>
<body>
    <%@ include file="../layout/header.jsp" %>

    <div class="content">
        <div class="image-section">
    		<div class="slides">
        		<div class="slide-container">
            		<img src="resources/images/slide1.jpg" alt="슬라이드 이미지 1" class="slide">
        		</div>
        		<div class="slide-container">
            		<img src="resources/images/slide2.jpg" alt="슬라이드 이미지 2" class="slide">
        		</div>
        		<div class="slide-container">
            		<img src="resources/images/slide3.jpg" alt="슬라이드 이미지 3" class="slide">
        		</div>
    		</div>
    		<div class="dots">
        		<span class="dot active"></span>
        		<span class="dot"></span>
        		<span class="dot"></span>
    		</div>
		</div>

        <div class="location-select">
            <select>
                <option value="">지역 선택</option>
                <option value="seoul">서울</option>
                <option value="busan">부산</option>
                </select>
        </div>

		<div class="category-buttons-container">
    		<div class="category-buttons">
        		<button class="category-button"></button>
        		<button class="category-button"></button>
        		<button class="category-button"></button>
        		<button class="category-button"></button>
        		<button class="category-button"></button>
    		</div>
		</div>

        <div class="recommendations">
            <h2># 오늘의 추천 pick</h2>
            <div class="recommendation-grid">
                <div class="recommendation-item">
                    <img src="recommendation1.jpg" alt="추천 1">
                </div>
                <div class="recommendation-item">
                    <img src="recommendation2.jpg" alt="추천 2">
                </div>
                <div class="recommendation-item">
                    <img src="recommendation3.jpg" alt="추천 3">
                </div>
            </div>

            <h2># 내 취향에 맞게 pick</h2>
            <div class="recommendation-grid">
                <div class="recommendation-item">
                    <img src="preference1.jpg" alt="취향 1">
                </div>
                <div class="recommendation-item">
                    <img src="preference2.jpg" alt="취향 2">
                </div>
                <div class="recommendation-item">
                    <img src="preference3.jpg" alt="취향 3">
                </div>
            </div>

            <h2># 친구 추천 pick</h2>
            <div class="recommendation-grid">
                <div class="recommendation-item">
                    <img src="friend1.jpg" alt="친구 추천 1">
                </div>
                <div class="recommendation-item">
                    <img src="friend2.jpg" alt="친구 추천 2">
                </div>
                <div class="recommendation-item">
                    <img src="friend3.jpg" alt="친구 추천 3">
                </div>
            </div>
        </div>

        <div class="popup" id="popup">
            <div class="popup-content">
                <span class="close" id="close">&times;</span>
                <p>팝업 내용</p>
            </div>
        </div>
    </div>

    <%@ include file="../layout/footer.jsp" %>

    <script src="resources/js/index.js"></script>
</body>
</html>