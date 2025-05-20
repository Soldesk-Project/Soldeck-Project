// 검색 관련 스크립트 (sendBeacon 사용)
function handleSearch(keyword) {
  const input = document.getElementById("search");
  if (!input && !keyword) return alert("검색창을 찾을 수 없습니다.");

  const searchKeyword = keyword || input.value.trim(); // clickedKeyword 또는 입력값 사용
  if (!searchKeyword) return alert("검색어를 입력하세요.");

  const encodedKeyword = encodeURIComponent(searchKeyword);

  // ✅ 검색 로그 백그라운드로 전송
  const params = new URLSearchParams();
  params.append("keyword", searchKeyword);
  navigator.sendBeacon("/search/log", params);

  // ✅ 검색 상태 저장 후 이동
  sessionStorage.setItem("search", encodedKeyword);
  sessionStorage.setItem("actionType", "search");
  window.location.href = "/search/map";
}
//function handleSearch() {
//  const input = document.getElementById("search");
//  if (!input) return alert("검색창을 찾을 수 없습니다.");
//
//  const keyword = input.value.trim();
//  if (!keyword) return alert("검색어를 입력하세요.");
//
//  const encodedKeyword = encodeURIComponent(keyword);
//
//  // ✅ 검색 로그 백그라운드로 전송
//  const params = new URLSearchParams();
//  params.append("keyword", keyword);
//  navigator.sendBeacon("/search/log", params);
//
//  // ✅ 검색 상태 저장 후 이동
//  sessionStorage.setItem("search", encodedKeyword);
//  sessionStorage.setItem("actionType", "search");
//  window.location.href = "/search/map";
//}

// DOM이 완전히 로드된 후 실행
window.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const searchButton = document.getElementById("searchBtn");
  const loginLink = document.getElementById("login");

  if (searchInput) {
    searchInput.disabled = false;
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.stopPropagation();
        handleSearch();
      }
    });
  }

  if (searchButton) {
    searchButton.addEventListener("click", handleSearch);
  }

  if (loginLink) {
    loginLink.addEventListener("click", (event) => {
      event.preventDefault();
      const currentUrl = encodeURIComponent(window.location.href);
      window.location.href = "/login/loginPage?redirectUrl=" + currentUrl;
    });
  }

  loadPopularKeywords();
  setupAlarmModal();
});

// 인기 검색어 로딩
let keywords = [];
let dataItems = []; // 원본 data를 저장해 item.keyword 접근

function cycleKeyword() {
  const textElement = document.getElementById('keyword-text');
  let idx = 0;

  const showNext = () => {
    textElement.style.animation = 'none';
    void textElement.offsetWidth;
    textElement.style.animation = null;
    textElement.textContent = keywords[idx];
    idx = (idx + 1) % keywords.length;
  };

  showNext();
  setInterval(showNext, 3000);
  
//클릭 이벤트: 현재 표시된 키워드의 item.keyword 가져오기
  textElement.addEventListener('click', () => {
    const clickedKeyword = dataItems[(idx - 1 + keywords.length) % keywords.length].keyword;
    handleSearch(clickedKeyword);
  });
}

fetch("/search/popular")
  .then(res => res.json())
  .then(data => {
	dataItems = data; // 원본 데이터 저장
    keywords = data.map((item, idx) => `${idx + 1}위. ${item.keyword}`);
    if (keywords.length > 0) cycleKeyword();
    else document.getElementById('keyword-text').textContent = "데이터 없음";
  })
  .catch(err => {
    console.error("인기 검색어 로드 실패:", err);
    document.getElementById('keyword-text').textContent = "불러오기 실패";
  });

// 알림 모달 세팅
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