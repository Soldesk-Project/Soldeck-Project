<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>커뮤니티 메인</title>
    <link rel="stylesheet" href="/resources/css/header.css">
    <link rel="stylesheet" href="/resources/css/communityMain.css">
    <link rel="stylesheet" href="/resources/css/footer.css">
</head>
<body>
<%@ include file="../layout/header.jsp" %>

<div class="community-container">
    <div class="community-major-category-area">
        <button type="button" class="major-category-button active" data-major="friend">친구</button>
        <button type="button" class="major-category-button" data-major="group">모임</button>
        <button type="button" class="major-category-button" data-major="chat">채팅</button>
        <button type="button" class="major-category-button" data-major="event">이벤트</button>
        <button type="button" class="major-category-button" data-major="minigame">미니게임</button>
    </div>

    <div class="community-content-area"  id="communityContent">
        <jsp:include page="${includePage}.jsp"></jsp:include>
    </div>
</div>
<%@ include file="../layout/footer.jsp" %>

	<script type="text/javascript" src="/resources/js/communityMain.js"></script>
</body>
</html>