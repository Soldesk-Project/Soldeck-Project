<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div class="header">
  <div class="header_inner">
    <div class="logoLayout">
      <a href="/" draggable="false">
        <img src="/resources/images/logo.png" style="width: 100px;" draggable="false">
      </a>
    </div>
    <div class="keywordAsearch">
	    <div id="popular-keywords">
	      <div class="indexTitle_header"># 인기 검색어</div>
	      <div class="keyword-rank" id="keyword-text">불러오는 중...</div>
	    </div>
	
	    <div class="searchLayout">
	      <div class="searchWrapper">
	        <input type="search" placeholder="검색어를 입력하세요." id="search" autocomplete="off">
	        <button id="searchBtn" type="button">
	          <img alt="검색버튼" src="/resources/images/searchImg.png">
	        </button>
	      </div>
	    </div>
	</div>

    <c:if test="${sessionScope.loggedInUser != null}">
      <c:set var="member" value="${sessionScope.loggedInUser}" />
      <div class="profileBox">
        <div class="profileBox1">
          <div class="profile_img_box">
            <img src="/resources/upload/${member.mem_img}" alt="프로필" width="80" height="80"
              onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='/resources/images/profile.png'; }">
          </div>
        </div>
        <div class="profileBox2">
          <div class="nickAndmypage">
            <div class="nickAndF">
              <div class="nickname">${member.mem_nick}님</div>
              <div class="alarmIcon">
                <button id="alarmBtn" type="button">
                  <img alt="요청알림" src="/resources/images/alarmIcon.png">
                  <span id="alarmBadge">0</span>
                </button>
              </div>
              <div class="communityIcon">
                <a href="${pageContext.request.contextPath}/community/communityMain" id="communityBtn">
                  <img alt="커뮤니티" src="/resources/images/communityIcon.png">
                </a>
              </div>
            </div>
            <div class="mypageAndlouout">
			  <c:choose>
			    <c:when test="${sessionScope.loggedInUser.mem_id == 'adminaccount' || sessionScope.loggedInUser.mem_id == 'admin1111'}">
			      <div class="mypage_text"><a href="/admin/member">관리자페이지</a></div>
			    </c:when>
			    <c:otherwise>
			      <div class="mypage_text"><a href="/mypage/myInfo">마이페이지</a></div>
			    </c:otherwise>
			  </c:choose>
			  <form id="logoutForm" action="/login/logout" method="POST" style="display: none;"></form>
			  <div><a href="#" onclick="document.getElementById('logoutForm').submit();">로그아웃</a></div>
			</div>
			</div>
        </div>
      </div>
    </c:if>

    <c:if test="${empty sessionScope.loggedInUser}">
      <a href="javascript:void(0)" id="login">로그인</a>
    </c:if>
  </div>
</div>
<!-- 알림 모달 창 -->
<div id="alarmModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h3>알림 목록</h3>
    <ul id="alarmList"></ul>
  </div>
</div>
<script type="text/javascript" src="/resources/js/header.js"></script>
<script type="text/javascript" src="/resources/js/friendSocket.js"></script>
