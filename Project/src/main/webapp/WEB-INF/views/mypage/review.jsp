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
						<c:choose>
							<c:when test="${not empty co.com_attachList}">
								<img alt="" src="${co.com_attachList[0].att_path}/${co.com_attachList[0].att_uuid}_${fn:replace(co.com_attachList[0].att_name, ' ', '%20')}">
							</c:when>
							<c:otherwise>
								<img alt="" src="../resources/images/noImage.png">
							</c:otherwise>
						</c:choose>
					</div>
					<div class="review-content">
						<div class="appraisal">
							<div class="appraisal-div">
								<span>평점</span>
								<input type="text" name="score" class="score" value="${co.com_rate }" readonly="readonly">
								<input type="hidden" class="com-no" value="${co.com_no }">
								<input type="hidden" class="mem-no" value="${co.mem_no }">
								<button type="button" class="remove-btn" id="removeBtn">삭제</button>
							</div>
						</div>
						<div class="review-comment">
							<textarea name="comment" class="comment" readonly="readonly">${co.com_con }</textarea>
						</div>
						<span>▶ 댓글 위치로 이동</span>
						<!-- 
						<details>
							<summary>사진 전체 보기</summary>
								<div class="comment-img-all">
									<c:choose>
										<c:when test="${not empty co.com_attachList}">
											<c:forEach var="attach" items="${co.com_attachList}" varStatus="status">
												<c:if test="${status.index < 3 }">
												    <div class="comment-img">
												         <img alt="첨부 이미지" src="${attach.att_path}/${attach.att_uuid}_${fn:replace(attach.att_name, ' ', '%20')}">
												    </div>
												</c:if>
											</c:forEach>
											<c:if test="${fn:length(co.com_attachList) > 3}">
											    <div class="more-img">
											         <span>· · ·</span>
											    </div>
											</c:if>
										</c:when>
										<c:otherwise>
										    <div class="comment-img">
												<img alt="" src="../resources/images/noImage.png">
										    </div>
										</c:otherwise>
									</c:choose>
								</div>
						</details>
						 -->
					</div>
				</div>
			</c:forEach>

			
		</div>
	</div>
 </div>
 
	<div id="customConfirm" class="delete-comment-modal">
		<div class="inner-modal">
	    	<p>댓글을 삭제하시겠습니까?</p>
			<div class="modal-content">
			    <button class="yes-btn" id="deleteCommentBtn">예</button>
				<button class="cancle-modal-btn" id="cancelModalBtn">아니오</button>
		    </div>
		</div>
	</div>
 
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/review.js"></script>
</body>
</html>