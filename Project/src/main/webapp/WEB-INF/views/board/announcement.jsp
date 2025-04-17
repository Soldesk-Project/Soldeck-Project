<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>공지사항</title>
    <link rel="stylesheet" href="../resources/css/announcement.css">
</head>
<body>
	<%@ include file="../layout/header.jsp" %>
	
	<div class="noticeContainer">
        <h1>공지사항</h1>
        <div class="noticeList">
            <div class="noticeItem">
                <div class="noticeTitle"><공지사항>공지사항1번</div>
                <div class="noticeContent">
                    <p>공지사항1번 내용</p>
                </div>
            </div>
        </div>
    </div>
	
	<%@ include file="../layout/footer.jsp" %>
    <script type="text/javascript" src="/resources/js/announcement.js"></script>
</body>
</html>