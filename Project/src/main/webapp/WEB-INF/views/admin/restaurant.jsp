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
			<li class="side-restaurant"><a>매장 관리</a></li>
		</ul>
	</div><div class="restaurant-menu" style="margin-top: 500px; display: none;">
		<ul class="side">
			<li class="side-booking"><a href="/admin/restaurant"class="a-booking">매장 목록</a></li>
			<li class="side-add"><a href="/admin/add"class="a-add">매장 등록</a></li>
		</ul>
	</div>
	
	<h2 style="margin-top: 100px;">매장 목록</h2>

	<table border="1" cellpadding="10">
	    <thead>
	        <tr>
	            <th>가게 번호</th>
	            <th>가게 이름</th>
	            <th>삭제</th>
	        </tr>
	    </thead>
	    <tbody>
	        <c:forEach var="restaurant" items="${restaurantList}">
	            <tr>
	                <td>${restaurant.rest_no}</td>
	                <td>${restaurant.rest_name}</td>
	                <td>
	                    <form action="/admin/deleteGroup" method="post" onsubmit="return confirm('정말 삭제하시겠습니까?');">
	                        <input type="hidden" name="rest_no" value="${restaurant.rest_no}" />
	                        <button type="submit">삭제</button>
	                    </form>
	                </td>
	            </tr>
	        </c:forEach>
	    </tbody>
</table>
	
	<script>
        document.addEventListener('DOMContentLoaded', function() {
            const storeManagementLink = document.querySelector('.main-menu .side-restaurant');
            const restaurantMenu = document.querySelector('.restaurant-menu');

            storeManagementLink.addEventListener('click', function(event) {
                event.preventDefault(); // 기본 링크 동작 방지
                restaurantMenu.style.display = restaurantMenu.style.display === 'none' ? 'block' : 'none';
            });
        });
    </script>
</body>
</html>