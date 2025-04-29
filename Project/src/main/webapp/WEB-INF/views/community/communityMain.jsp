<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>커뮤니티 메인</title>
    <link rel="stylesheet" href="../resources/css/header.css">
    <link rel="stylesheet" href="../resources/css/communityMain.css">
    <link rel="stylesheet" href="../resources/css/footer.css">
</head>
<body>
<%@ include file="../layout/header.jsp" %>

<div class="community-container">
    <div class="community-top-area">
        <div class="community-search-inline">
            <div class="search-area">
                <input type="text" placeholder="글 제목에 배치할 키워드 입력">
                <button type="button">검색</button>
            </div>
        </div>
        <div class="community-major-category-area">
            <label>대분류:</label>
            <button type="button" class="major-category-button active" data-major="major1">대분류 1</button>
            <button type="button" class="major-category-button" data-major="major2">대분류 2</button>
        </div>
    </div>
    <div class="community-minor-category-area">
        <div>
            <label>소분류:</label>
            <div class="minor-category-buttons">
                </div>
        </div>
    </div>

    <section class="community-list">
        <h2 class="community-title">커뮤니티 게시글 목록</h2>
        <div class="post-list">
            </div>
    </section>

    <section class="event-info">
        <h2>이벤트 페이지 제작 후 들어갈 관련 이벤트 안내 내용...</h2>
        <div class="placeholder">이벤트 관련 내용이 표시될 영역입니다.</div>
    </section>
</div>
<script type="text/javascript" src="/resources/js/communityMain.js"></script>
<%@ include file="../layout/footer.jsp" %>
</body>
</html>