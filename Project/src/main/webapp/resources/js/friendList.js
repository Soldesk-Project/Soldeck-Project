// 친구 목록 로드
fetch("/friendlist/friendListData")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("friendListContainer");

    if (data.length === 0) {
      const msg = document.createElement("p");
      msg.textContent = "친구가 없습니다.";
      msg.classList.add("no-friend");
      container.appendChild(msg);
      return;
    }

    data.forEach(friend => {
      const el = document.createElement("div");
      el.classList.add("friend-box");

      el.innerHTML = `
        <div class="profile">
          <img src="../resources/upload/${friend.friendMember.mem_img}" alt="프로필" width="80" height="80"
               onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='../resources/images/profile.png'; }">
          <div class="nicknameBox"><p>${friend.friendMember.mem_nick}</p></div>
          <div class="memo_input">
            <input type="text" name="fre_memo" value="${friend.fre_memo || ''}" placeholder="메모 입력" data-friend-id="${friend.friend_mem_no}" />
            <button class="save-memo-btn" data-friend-id="${friend.friend_mem_no}">저장</button>
            <div class="unfollowBtn">
              <button class="unfollow-btn" data-friend-id="${friend.friend_mem_no}">언팔로우</button>
            </div>
         </div>
        </div>
      `;

      container.appendChild(el);
    });
  })
  .catch(error => console.error("친구 목록 로드 실패:", error));

// 친구 랜덤 추천
fetch("/friendlist/friendListRecommendData", {
  method: "GET",
  credentials: "include"
})
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("friendListRandomContainer");

    data.forEach(friend => {
      const hashtags = (friend.hashtags || [])
        .slice(0, 3)
        .map(fk => `<li>#${fk.food_no}</li>`)
        .join('');
      const favorites = (friend.bookMarkList || [])
        .filter(bm => bm.is_public === "Y" && bm.rest)
        .slice(0, 3)
        .map(bm => `<li>#${bm.rest.rest_name}</li>`)
        .join('');

      const el = document.createElement("div");
      el.classList.add("friend-box");

      el.innerHTML = `
        <div class="profile_random" data-friend-id="${friend.mem_no}">
          <div class="profileTop">
            <img src="../resources/upload/${friend.friendMember.mem_img}" alt="프로필" width="80" height="80"
              onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='../resources/images/profile.png'; }">
            <div class="nicknameBox"><p>${friend.friendMember.mem_nick}</p></div>
            <div class="followBtn">
              <button class="follow-btn" data-friend-id="${friend.mem_no}">팔로우</button>
            </div>
          </div>
          <div class="detailBox" style="display: none;">
            <div class="preference">
              <p class="title">선호도</p>
              <ul class="hashtags">${hashtags}</ul>
            </div>
            <div class="favorites">
              <p class="title">공개된 즐겨찾기 리스트</p>
              <div class="scrollBox">
                <ul>${favorites}</ul>
              </div>
            </div>
          </div>
        </div>
      `;

      container.appendChild(el);
    });
  })
  .catch(error => console.error("랜덤 추천 로드 실패:", error));

// 단일 이벤트 위임: 모든 클릭 이벤트 처리
document.addEventListener("click", function (event) {
  const target = event.target;

  // 디버깅: 클릭된 요소 로깅
  console.log("Clicked element:", target);

  // 저장 버튼
  if (target.classList.contains("save-memo-btn")) {
    const friendMemNo = target.dataset.friendId;
    const memoInput = target.closest(".memo_input").querySelector("input[name='fre_memo']");
    const memo = memoInput.value.trim();

    fetch("/friendlist/saveMemo", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        friend_mem_no: friendMemNo,
        fre_memo: memo
      })
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
      })
      .catch(error => {
        console.error("메모 저장 실패:", error);
        alert("메모 저장 중 오류가 발생했습니다.");
      });
  }

  // 언팔로우 버튼
  if (target.classList.contains("unfollow-btn")) {
    const friendMemNo = target.dataset.friendId;
    if (!confirm("정말 친구를 언팔로우하시겠습니까?")) return;

    fetch("/friendlist/unfollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        friend_mem_no: friendMemNo
      })
    })
      .then(res => {
        if (res.ok) {
          alert("친구목록에서 삭제되었습니다");
          target.closest(".friend-box").remove();
        } else {
          alert("삭제하지 못하였습니다.");
        }
      })
      .catch(error => console.error("언팔로우 실패:", error));
  }

  // 팔로우 버튼
  if (target.classList.contains("follow-btn")) {
    const friendMemNo = target.dataset.friendId;

    fetch("/friendlist/follow", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        friend_mem_no: friendMemNo
      })
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        target.disabled = true;
        target.textContent = "요청됨";
      })
      .catch(error => {
        console.error("친구 요청 실패:", error);
        alert("요청을 처리하는 중 오류가 발생했습니다.");
      });
  }

  // 탭 전환 버튼
  if (target.classList.contains("friend-tab-button")) {
    const targetTab = target.dataset.tab;

    document.querySelectorAll(".friend-tab-button").forEach(btn => btn.classList.remove("active"));
    target.classList.add("active");

    document.querySelectorAll(".friendTabPane").forEach(pane => {
      pane.classList.remove("active");
    });
    document.getElementById(`tab-${targetTab}`).classList.add("active");
  }

  // 검색 버튼
  if (target.id === "friendSearchButton") {
    const input = document.getElementById("searchInput");
    const resultContainer = document.getElementById("searchResultContainer");
    const keyword = input.value.trim();

    if (keyword === "") {
      resultContainer.classList.remove("show");
      resultContainer.innerHTML = "";
      return;
    }

    fetch(`/friendlist/search?keyword=${encodeURIComponent(keyword)}`)
      .then(res => res.json())
      .then(data => {
        console.log("검색 응답 데이터:", data);

        if (!Array.isArray(data)) {
          console.error("배열이 아님:", data);
          resultContainer.innerHTML = "<div>검색 결과가 없습니다.</div>";
          return;
        }

        if (data.length === 0) {
          resultContainer.innerHTML = "<div>검색 결과가 없습니다.</div>";
        } else {
          resultContainer.innerHTML = data.map(friend => {
            const imgSrc = friend.mem_img
              ? `/resources/upload/${friend.mem_img}`
              : `/resources/upload/profile.png`;

            return `
              <div class="friend-item">
                <img src="${imgSrc}" 
                     onerror="this.onerror=null; this.src='../resources/upload/profile.png';" 
                     width="47.2" alt="프로필">
                <span>${friend.mem_nick}</span>
                <div class="followBtn">
                  <button class="follow-btn" data-friend-id="${friend.mem_no}">팔로우</button>
                </div>
              </div>
            `;
          }).join("");
        }

        resultContainer.classList.add("show");
      })
      .catch(err => {
        console.error("검색 실패:", err);
        resultContainer.innerHTML = "<div>검색 중 오류가 발생했습니다.</div>";
      });
  }

  // 상세 창 토글 (profile_random 클릭)
  if (target.closest(".profile_random") && !target.classList.contains("follow-btn")) {
    const profileRandom = target.closest(".profile_random");
    const detailBox = profileRandom.querySelector(".detailBox");

    document.querySelectorAll(".profile_random .detailBox").forEach(detail => {
      if (detail !== detailBox) {
        detail.style.display = "none";
      }
    });

    detailBox.style.display = detailBox.style.display === "none" ? "block" : "none";
    console.log("상세 창 토글:", detailBox.style.display);
  }
});

// DOMContentLoaded: 초기화 및 디버깅
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");
  console.log("friendListContainer:", document.getElementById("friendListContainer"));
  console.log("friendListRandomContainer:", document.getElementById("friendListRandomContainer"));
  console.log("searchButton:", document.getElementById("searchButton"));
  console.log("friend-tab-button:", document.querySelectorAll(".friend-tab-button"));
  console.log("searchResultContainer:", document.getElementById("searchResultContainer"));
});

