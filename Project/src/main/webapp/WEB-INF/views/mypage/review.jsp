<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
  <jsp:include page="../layout/header.jsp"/>
  
  <div class="container">
	<div class="side-menu">
  		<jsp:include page="../layout/sideMenu.jsp"/>
	</div>
	<div class="main-menu">
		<div class="inner-main">
			<c:forEach var="co" items="${commentList}">
				<div class="review-list">
					<div class="img-div">
						<img alt="" src="${co.rest_img_name}">
					</div>
					<div class="review-content">
						<div class="appraisal">
							<div class="appraisal-div">
								<span class="rest-name">${co.rest_name }</span>
								<span>평점</span>
								<span class="score">${co.com_rate }</span>
								<input type="hidden" class="com-no" value="${co.com_no }">
								<input type="hidden" class="mem-no" value="${co.mem_no }">
								<button type="button" class="remove-btn" id="removeBtn">삭제</button>
							</div>
						</div>
						<div class="review-comment">
							<pre class="comment">${co.com_con }</pre>
						</div>
						<div class="rest-info">
							<input type="hidden" class="rest-no" value="${co.rest_no }">	
							<a href="#" class="rest-review-info">▶ 댓글 위치로 이동</a>
						</div>
					</div>
				</div>
			</c:forEach>

			
		</div>
	</div>
 </div>
 
	<div id="customConfirm" class="delete-comment-modal">
		<div class="inner-modal">
	    	<p>정말 삭제하시겠습니까?</p>
			<div class="modal-content_review">
			    <button class="yes-btn" id="deleteCommentBtn">예</button>
				<button class="cancle-modal-btn" id="cancelModalBtn">아니오</button>
		    </div>
		</div>
	</div>
 
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/review.js"></script>
</body>
</html>