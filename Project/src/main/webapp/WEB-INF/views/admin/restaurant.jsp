<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<link rel="stylesheet" href="../resources/css/header.css">
<link rel="stylesheet" href="../resources/css/admin.css">
	<%@ include file="../layout/header.jsp"%>
<body>
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
	<form id="searchForm" method="get" action="/admin/restaurant" class="category-form">
		<select name="category" onchange="resetPageNumAndSubmit()">
			<option value="">전체</option>
			<option value="한식" ${pageMaker.cri.category == '한식' ? 'selected' : ''}>한식</option>
			<option value="중식" ${pageMaker.cri.category == '중식' ? 'selected' : ''}>중식</option>
			<option value="일식" ${pageMaker.cri.category == '일식' ? 'selected' : ''}>일식</option>
			<option value="양식" ${pageMaker.cri.category == '양식' ? 'selected' : ''}>양식</option>
			<option value="베트남식" ${pageMaker.cri.category == '베트남식' ? 'selected' : ''}>베트남식</option>
		</select>
		
		<input type="text" name="keyword" placeholder="매장명 검색" value="${pageMaker.cri.keyword}" oninput="resetPageNum()"/>

		<button type="submit">검색</button>
		
		<input type="hidden" name="pageNum" id="pageNum" value="${pageMaker.cri.pageNum}" />
		<input type="hidden" name="amount" value="${pageMaker.cri.amount}" />
	</form>
	
	<table border="1" cellpadding="10">
		<thead>
			<tr>
				<th>가게 번호</th>
				<th>가게 이름</th>
				<th>삭제</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="restaurant" items="${list}">
				<tr>
					<td>${restaurant.rest_no}</td>
					<td>${restaurant.rest_name}</td>
					<td class="flex">
				        <form action="/admin/deleteGroup" method="post" onsubmit="return confirm('정말 삭제하시겠습니까?');">
				            <input type="hidden" name="rest_no" value="${restaurant.rest_no}">
				            <button type="submit">삭제</button>
				        </form>
					</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
	<!-- page -->
	<div class="page-wrap">
		<ul class="page-nation">
			<c:if test="${pageMaker.prev}">
				<li class="previous">
					<a href="/admin/restaurant?pageNum=${pageMaker.startPage - 1}&amount=${pageMaker.cri.amount}&category=${pageMaker.cri.category}&keyword=${pageMaker.cri.keyword}">&lt;</a>
				</li>
			</c:if>
	
			<c:forEach var="num" begin="${pageMaker.startPage}" end="${pageMaker.endPage}" step="1">
				<li>
					<a href="/admin/restaurant?pageNum=${num}&amount=${pageMaker.cri.amount}&category=${pageMaker.cri.category}&keyword=${pageMaker.cri.keyword}"
		   				class="${pageMaker.cri.pageNum == num ? 'active' : ''}">${num}</a>
				</li>
			</c:forEach>
	
			<c:if test="${pageMaker.next}">
				<li class="next">
					<a href="/admin/restaurant?pageNum=${pageMaker.endPage + 1}&amount=${pageMaker.cri.amount}&category=${pageMaker.cri.category}&keyword=${pageMaker.cri.keyword}">&gt;</a>
				</li>
			</c:if>
		</ul>
	</div>	          
</body>
	<script type="text/javascript" src="/resources/js/admin.js"></script>
</body>
</html>