<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div class="header">
  <div class="header_inner">
    <div class="logoLayout">
      <a href="/" draggable="false">
        <img src="/resources/images/logo.png" alt="logo" style="width: 70px;" draggable="false">
      </a>
    </div>

    <div class="searchLayout">
      <div class="searchWrapper">
        <input type="search" placeholder="검색어를 입력하세요." id="search">
        <button id="searchBtn" type="button">
          <img alt="검색버튼" src="/resources/images/searchImg.png">
        </button>
      </div>
    </div>

    <div id="popular-keywords">
      <div class="indexTitle_header"># 인기 검색어</div>
      <div class="keyword-rank" id="keyword-text">불러오는 중...</div>
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
                </button>
              </div>
              <div class="communityIcon">
                <a href="${pageContext.request.contextPath}/community/communityMain" id="communityBtn">
                  <img alt="커뮤니티" src="/resources/images/communityIcon.png">
                </a>
              </div>
            </div>
            <div class="mypageAndlouout">
              <div class="mypage_text"><a href="/mypage/myInfo">마이페이지</a></div>
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

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("searchBtn");
    const loginLink = document.getElementById("login");

    if (searchInput) {
      searchInput.disabled = false;
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.stopPropagation();
          handleSearch();
        }
      });
    }

    if (searchButton) searchButton.addEventListener("click", handleSearch);

    if (loginLink) {
      loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        const currentUrl = encodeURIComponent(window.location.href);
        window.location.href = "/login/loginPage?redirectUrl=" + currentUrl;
      });
    }

    loadPopularKeywords();
    setupAlarmModal();
  });

  function handleSearch(keyword) {
    const input = document.getElementById("search");
    const searchKeyword = keyword || input.value.trim();
    if (!searchKeyword) return alert("검색어를 입력하세요.");

    const encodedKeyword = encodeURIComponent(searchKeyword);
    const params = new URLSearchParams();
    params.append("keyword", searchKeyword);
    navigator.sendBeacon("/search/log", params);

    sessionStorage.setItem("search", encodedKeyword);
    sessionStorage.setItem("actionType", "search");
    window.location.href = "/search/map";
  }

  function loadPopularKeywords() {
    fetch("/search/popular")
      .then((res) => res.json())
      .then((data) => {
        const keywords = data.map((item, idx) => `${idx + 1}위. ${item.keyword}`);
        const textElement = document.getElementById("keyword-text");
        let idx = 0;

        if (keywords.length > 0) {
          const showNext = () => {
            textElement.style.animation = "none";
            void textElement.offsetWidth;
            textElement.style.animation = null;
            textElement.textContent = keywords[idx];
            idx = (idx + 1) % keywords.length;
          };

          showNext();
          setInterval(showNext, 3000);

          textElement.addEventListener("click", () => {
            const clickedKeyword = data[(idx - 1 + data.length) % data.length].keyword;
            handleSearch(clickedKeyword);
          });
        } else {
          textElement.textContent = "데이터 없음";
        }
      })
      .catch((err) => {
        console.error("인기 검색어 로드 실패:", err);
        document.getElementById("keyword-text").textContent = "불러오기 실패";
      });
  }

  function setupAlarmModal() {
    const alarmBtn = document.getElementById("alarmBtn");
    const modal = document.getElementById("alarmModal");
    const closeBtn = document.querySelector(".modal .close");
    const alarmList = document.getElementById("alarmList");

    if (alarmBtn && modal && closeBtn && alarmList) {
      alarmBtn.addEventListener("click", () => {
        modal.style.display = "block";
        alarmList.innerHTML = "<li>불러오는 중...</li>";

        fetch("/alarm/list")
          .then((res) => res.json())
          .then((data) => {
            alarmList.innerHTML = "";
            if (data.length === 0) {
              alarmList.innerHTML = "<li>새로운 알림이 없습니다.</li>";
            } else {
              data.forEach((alarm) => {
                const li = document.createElement("li");
                li.textContent = alarm;
                alarmList.appendChild(li);
              });
            }
          })
          .catch((err) => {
            alarmList.innerHTML = "<li>알림을 불러오지 못했습니다.</li>";
            console.error(err);
          });
      });

      closeBtn.addEventListener("click", () => (modal.style.display = "none"));
      window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.style.display === "block") {
          modal.style.display = "none";
        }
      });
    }
  }
</script>
