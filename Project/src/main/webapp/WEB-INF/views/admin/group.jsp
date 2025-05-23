<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<link rel="stylesheet" href="../resources/css/header.css">
    <link rel="stylesheet" href="../resources/css/admin.css">
<body>
	<%@ include file="../layout/header.jsp" %>
	<div class="main-menu" style="margin-top: 500px">
		<ul class="side">
			<li class="side-myinfo"><a href="/admin/member" class="a-myinfo">회원 관리</a></li>
			<li class="side-bookmark"><a href="/admin/group"class="a-bookmark">모임 관리</a></li>
			<li class="side-booking"><a href="/admin/restaurant"class="a-booking">매장 관리</a></li>
		</ul>
	</div>
	
	<h2 style="margin-top: 100px;">모임 목록</h2>

	<table border="1" cellpadding="10">
	    <thead>
	        <tr>
	            <th>모임 번호</th>
	            <th>모임 이름</th>
	            <th>모임 생성일</th>
	            <th>모임장 번호</th>
	            <th>삭제</th>
	        </tr>
	    </thead>
	    <tbody>
	        <c:forEach var="group" items="${groupList}">
	            <tr>
	                <td>${group.group_no}</td>
	                <td>${group.chat_title}</td>
	                <td>${group.reg_date}</td>
	                <td>${group.mem_no}</td>
	                <td>
	                    <form action="/admin/deleteGroup" method="post" onsubmit="return confirm('정말 삭제하시겠습니까?');">
	                        <input type="hidden" name="group_no" value="${group.group_no}" />
	                        <button type="submit">삭제</button>
	                    </form>
	                </td>
	            </tr>
	        </c:forEach>
	    </tbody>
</table>
</body>
</html>