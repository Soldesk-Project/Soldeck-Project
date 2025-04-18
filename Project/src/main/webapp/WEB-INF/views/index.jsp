<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>메인 페이지</title>
<link rel="stylesheet" href="../resources/css/index.css">
</head>
<body>
    <%@ include file="../views/layout/header.jsp" %>

    <div class="content">
        <div class="imageSection">
            <div class="slides">
                <div class="slideContainer">
                    <img src="resources/images/fruit1.jpg" class="slide">
                </div>
                <div class="slideContainer">
                    <img src="resources/images/fruit2.jpg" class="slide">
                </div>
                <div class="slideContainer">
                    <img src="resources/images/fruit3.jpg" class="slide">
                </div>
            </div>
            <div class="dots">
                <span class="dot active"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </div>

        <div class="locationSelect">
			<form action="/search/location" method="get">
                <select name="region" onchange="this.form.submit()">
                <option value="">지역 선택</option>
                <option value="seoul">서울</option>
                <option value="busan">인천</option>
                <option value="busan">대전</option>
                <option value="busan">광주</option>
                <option value="busan">대구</option>
                <option value="busan">부산</option>
            </select>
        </div>

        <div class="categoryBtnContainer">
            <div class="categoryBtns">
                <button class="categoryBtn">한식</button>
                <button class="categoryBtn">중식</button>
                <button class="categoryBtn">일식</button>
                <button class="categoryBtn">양식</button>
                <button class="categoryBtn">베트남요리</button>
            </div>
        </div>

        <div class="recommendations">
            <h2># 오늘의 추천 pick</h2>
            <div class="recommendationGrid">
                <div class="recommendationItem">
                    <img src="recommendation1.jpg" alt="추천 1">
                </div>
                <div class="recommendationItem">
                    <img src="recommendation2.jpg" alt="추천 2">
                </div>
                <div class="recommendationItem">
                    <img src="recommendation3.jpg" alt="추천 3">
                </div>
            </div>

            <h2># 내 취향에 맞게 pick</h2>
            <div class="recommendationGrid">
                <div class="recommendationItem">
                    <img src="preference1.jpg" alt="취향 1">
                </div>
                <div class="recommendationItem">
                    <img src="preference2.jpg" alt="취향 2">
                </div>
                <div class="recommendationItem">
                    <img src="preference3.jpg" alt="취향 3">
                </div>
            </div>

            <h2># 친구 추천 pick</h2>
            <div class="recommendationGrid">
                <div class="recommendationItem">
                    <img src="friend1.jpg" alt="친구 추천 1">
                </div>
                <div class="recommendationItem">
                    <img src="friend2.jpg" alt="친구 추천 2">
                </div>
                <div class="recommendationItem">
                    <img src="friend3.jpg" alt="친구 추천 3">
                </div>
            </div>
        </div>

        <div class="popup" id="popup">
            <div class="popupContent">
                <span class="popupClose" id="popupClose">&times;</span>
                <p>팝업 내용</p>
            </div>
        </div>
    </div>

    <%@ include file="../views/layout/footer.jsp" %>

    <script type="text/javascript" src="/resources/js/index.js"></script>
</body>
</html>