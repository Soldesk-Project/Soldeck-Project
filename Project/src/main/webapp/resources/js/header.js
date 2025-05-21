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
    
    if (searchButton) {
  	  searchButton.addEventListener('click', () => {
  		  const keyword = document.getElementById('search').value;
  		  handleSearch(keyword);
  	  });
    }

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
  
  // 알람 모달 여는 함수
  function setupAlarmModal() {
    const alarmBtn = document.getElementById("alarmBtn");
    const modal = document.getElementById("alarmModal");
    const closeBtn = document.querySelector(".modal .close");
    const alarmList = document.getElementById("alarmList");

    if (alarmBtn && modal && closeBtn && alarmList) {
      alarmBtn.addEventListener("click", () => {
        modal.style.display = "block";
        
        // 알림 뱃지 초기화
        alarmCount = 0;
        updateAlarmBadge(alarmCount);

        // 기존 알림 유지, 없으면 문구 표시
        if (alarmList.children.length === 0) {
            alarmList.innerHTML = "<li>새로운 알림이 없습니다.</li>";
        }
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
  
  // 알람 개수 카운트 함수
  function updateAlarmBadge(count) {
	    const badge = document.getElementById("alarmBadge");
	    if (!badge) return;

	    if (count > 0) {
	        badge.textContent = count;
	        badge.style.display = "inline-block";
	    } else {
	        badge.textContent = "";
	        badge.style.display = "none";
	    }
	}