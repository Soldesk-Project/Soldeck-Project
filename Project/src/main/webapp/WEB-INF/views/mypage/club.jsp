<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp" />

<div class="container">
  <div class="side-menu">
    <jsp:include page="../layout/sideMenu.jsp" />
  </div>

  <div class="button-div">
    <button type="button" class="create-club-btn" id="createClubBtn">모임만들기</button>
  </div>

  <div class="main-menu">
    <div class="club-main">
      <div class="inner-main">
        <!-- 여기서부터~~~~~ -->
        <c:forEach var="group" items="${groupList}">
          <div class="club-list">
            <div>
              <img src="/resources/images/2.png" alt="클럽사진" class="club-img" />
            </div>
            <div class="club-content">
              <div class="club-info">
                <div>
                  <input type="text" name="name" class="club-name" value="${group.chat_title}" readonly="readonly" />
                  <input type="hidden" id="groupNo" value="${group.group_no}" />
                  <input type="hidden" id="isPublic" value="${group.group_bookmark }">
                  <input type="hidden" id="memNo" value="${group.mem_no }">
                  <button type="button" class="bookmark" id="bookmarkBtn">★</button>
                </div>
                <div>
                	<c:choose>
                		<c:when test="${group.is_public eq 'Y'}">
		                	<input type="text" name="oc" class="club-oc" value="공개 모임" readonly="readonly" />
                		</c:when>
                		<c:otherwise>
		                	<input type="text" name="oc" class="club-oc" value="비공개 모임" readonly="readonly" />
                		</c:otherwise>
                	</c:choose>
                </div>
              </div>
              <div class="club-memo">
                <textarea class="memo-area">${group.group_usermemo }</textarea>
                <button type="button" class="memo-btn" id="saveMemoBtn">저장</button>
              </div>
            </div>
          </div>
        </c:forEach>
        <!-- 여기까지~~~~~~!!! -->
      </div>
    </div>
  </div>
</div>

<!-- 모임 등록 모달 -->
<div id="modal">
	<div class="group-modal-content">
		<div class="modal-title">
			<a>새 모임방 등록</a>
		</div>
		<div class="modal-body">
			<ul>
				<li class="image-container">
					<div class="image-placeholder">이미지</div>
				</li>
				<li>
					<input type="text" name="club-title" placeholder="모임방 이름" class="input-text">
				</li>
				<li>
					<textarea placeholder="모임 소개" name="club-desc" class="input-textarea"></textarea>
				</li>
				<li>
					<label class="input-label">나이 제한</label>
					<div class="age-range-container">
						<input type="number" value="20" name="min-age" class="input-number">
						<span>~</span>
						<input type="number" value="40" name="max-age" class="input-number">
					</div>
				</li>
				<li>
					<label class="input-label">성별</label>
					<div class="gender-container">
						<label><input type="radio" name="gender" value="male" class="gender-radio"> 남성</label>
						<label><input type="radio" name="gender" value="female" class="gender-radio"> 여성</label>
					</div>
				</li>
				<li>
					<label class="input-label">공개 여부</label>
					<input type="checkbox" class="public-checkbox"> 공개
				</li>
			</ul>
		</div>
		<div class="modal-footer">
			<button type="button" id="closeModalBtn" class="btn-cancel">취소</button>
			<button type="button" id="createBtn" class="btn-create">생성</button>
		</div>
	</div>
</div>
	
	
	<div id="customConfirm" class="bookmark-check-modal">
		<div class="inner-modal">
	    	<p>즐겨찾기를 삭제하시겠습니까?</p>
			<div class="bookmark-modal-content">
			    <button class="yes-btn" id="outBookMarkBtn">예</button>
				<button class="cancle-modal-btn" id="cancelModalBtn">아니오</button>
		    </div>
		</div>
	</div>
	<div id="customConfirm" class="bookmark-add-modal">
		<div class="inner-modal">
	    	<p>즐겨찾기를 추가하시겠습니까?</p>
			<div class="bookmark-modal-content">
			    <button class="yes-btn" id="addBookMarkBtn">예</button>
				<button class="add-bookmark-btn" id="cancelModalBtn">아니오</button>
		    </div>
		</div>
	</div>
	<div id="customConfirm" class="save-memo-modal">
		<div class="inner-modal">
	    	<p>메모를 저장하시겠습니까?</p>
			<div class="bookmark-modal-content">
			    <button class="yes-btn" id="memoUpdateBtn">예</button>
				<button class="cancle-booking-btn" id="cancelModalBtn">아니오</button>
		    </div>
		</div>
	</div>

	<jsp:include page="../layout/footer.jsp"/>
	
<script type="text/javascript" src="/resources/js/club.js"></script>
</body>
</html>