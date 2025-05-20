function initFriendList() {
  // 친구 목록 로드
  fetch("/friendlist/friendListData")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("friendListContainer");
      container.innerHTML = "";  // 초기화

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
            <div class="nicknameBox">
              <p><a href="#" class="friend-name" data-friend-no="${friend.friend_mem_no}">${friend.friendMember.mem_nick}</a></p>
            </div>
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

  // 단일 이벤트 위임
  document.addEventListener("click", function (event) {
    const target = event.target;

    // 채팅방 이동
    if (target.classList.contains("friend-name")) {
      event.preventDefault();

      const friendNo = target.dataset.friendNo;
      const myNo = document.body.getAttribute('data-mem-no');

      if (!myNo || !friendNo) {
        alert("사용자 정보가 없습니다.");
        return;
      }

      const roomNo = Number(myNo) < Number(friendNo)
        ? `${myNo}${friendNo}`
        : `${friendNo}${myNo}`;

      console.log(roomNo);

      // AJAX로 채팅 페이지 가져오기
      fetch(`/chat/privateRoom/${roomNo}`)
      .then(response => {
        if (!response.ok) throw new Error("채팅방 요청 실패");
        return response.text();
      })
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const chatContainer = document.getElementById("chat-container") || (() => {
          const div = document.createElement("div");
          div.id = "chat-container";
          document.body.appendChild(div);
          return div;
        })();
        
        window.addEventListener("chatContextReady", () => {
        	  const event = new CustomEvent('openChatRoom', { detail: { roomNo } });
        	  window.dispatchEvent(event);
        	});

        // 1. body 내용 중 스크립트 제거하고 innerHTML에 넣기
        const scripts = doc.querySelectorAll("script");
        scripts.forEach(s => s.remove());
        chatContainer.innerHTML = doc.body.innerHTML;

        // 2. 스크립트 태그들 별도 실행
        scripts.forEach(oldScript => {
          const newScript = document.createElement("script");
          if (oldScript.src) {
            // 외부 스크립트 중복 검사 후 추가
            if (!document.querySelector(`script[src="${oldScript.src}"]`)) {
              newScript.src = oldScript.src;
              newScript.type = oldScript.type || "text/javascript";
              document.body.appendChild(newScript);
            }
          } else {
            // 인라인 스크립트 강제 실행
            // (eval 대신 동적 스크립트 삽입으로 브라우저가 처리)
            newScript.textContent = oldScript.textContent;
            newScript.type = oldScript.type || "text/javascript";
            document.body.appendChild(newScript);
          }
        });

        // 3. CSS 중복 체크 후 추가
        if (!document.querySelector('link[href="/resources/css/chatroom.css"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.type = "text/css";
          link.href = "/resources/css/chatroom.css";
          document.head.appendChild(link);
        }

        // 4. chatroom.js는 항상 새로 로드해서 최신 상태 유지
        const existingScript = document.querySelector('script[src="/resources/js/chatroom.js"]');
        if (existingScript) existingScript.remove();

        const script = document.createElement('script');
        script.src = "/resources/js/chatroom.js";
        script.onload = () => {
          // chatroom.js가 로드되면 chatContextReady 이벤트 발생시킴
          if (window.chatContext) {
            const event = new Event("chatContextReady");
            window.dispatchEvent(event);
          } else {
            console.warn("chatContext가 아직 준비되지 않았습니다.");
          }
        };
        
        document.body.appendChild(script);

      })
      .catch(error => {
        console.error("채팅방 로드 실패:", error);
        alert("채팅방을 불러오지 못했습니다.");
      });

      return;
    }

    // 메모 저장
    if (target.classList.contains("save-memo-btn")) {
      const friendMemNo = target.dataset.friendId;
      const memoInput = target.closest(".memo_input").querySelector("input[name='fre_memo']");
      const memo = memoInput.value.trim();

      fetch("/friendlist/saveMemo", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ friend_mem_no: friendMemNo, fre_memo: memo })
      })
        .then(res => res.text())
        .then(msg => alert(msg))
        .catch(error => {
          console.error("메모 저장 실패:", error);
          alert("메모 저장 중 오류가 발생했습니다.");
        });
    }

    // 언팔로우
    if (target.classList.contains("unfollow-btn")) {
      const friendMemNo = target.dataset.friendId;
      if (!confirm("정말 친구를 언팔로우하시겠습니까?")) return;

      fetch("/friendlist/unfollow", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ friend_mem_no: friendMemNo })
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

    // 탭 전환 버튼
    if (target.classList.contains("friend-tab-button")) {
      const targetTab = target.dataset.tab;

      document.querySelectorAll(".friend-tab-button").forEach(btn => btn.classList.remove("active"));
      target.classList.add("active");

      document.querySelectorAll(".friendTabPane").forEach(pane => pane.classList.remove("active"));
      const activePane = document.getElementById(`tab-${targetTab}`);
      if (activePane) activePane.classList.add("active");
    }
  });

  // 친구 랜덤 추천 데이터 로드
  fetch("/friendlist/friendListRecommendData", {
    method: "GET",
    credentials: "include"
  })
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("friendListRandomContainer");
      container.innerHTML = ""; // 초기화

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
          <div class="profile_random">
            <div class="profileTop">
              <img src="../resources/upload/${friend.friendMember.mem_img}" alt="프로필" width="80" height="80"
                onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='../resources/images/profile.png'; }">
              <div class="nicknameBox"><p>${friend.friendMember.mem_nick}</p></div>
              <div class="followBtn">
                <button onclick="follow(${friend.mem_no}, this)">팔로우</button>
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

        // 프로필 클릭 시 상세 정보 토글
        el.querySelector(".profile_random").addEventListener("click", function (e) {
          if (e.target.tagName === "BUTTON") return;

          document.querySelectorAll(".profile_random").forEach(profile => {
            if (profile !== this) {
              profile.querySelector(".detailBox").style.display = "none";
            }
          });

          const detailBox = this.querySelector(".detailBox");
          detailBox.style.display = detailBox.style.display === "none" ? "block" : "none";
        });

        container.appendChild(el);
      });
    });

  // 친구 검색 기능
  const searchBtn = document.getElementById("friendSearchButton");
  const input = document.getElementById("searchInput");
  const resultContainer = document.getElementById("searchResultContainer");

  if (searchBtn && input && resultContainer) {
    searchBtn.addEventListener("click", function () {
      const keyword = input.value.trim();

      if (keyword === "") {
        resultContainer.classList.remove("show");
        resultContainer.innerHTML = "";
        return;
      }

      fetch(`/friendlist/search?keyword=${encodeURIComponent(keyword)}`)
        .then(res => res.json())
        .then(data => {
          if (!Array.isArray(data)) {
            console.error("배열이 아님:", data);
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
                  <img src="${imgSrc}" width="47.2" alt="프로필"
                       onerror="this.onerror=null; this.src='../resources/upload/profile.png';">
                  <span>${friend.mem_nick}</span>
                  <div class="followBtn">
                    <button onclick="follow(${friend.mem_no}, this)">팔로우</button>
                  </div>
                </div>
              `;
            }).join("");
          }

          resultContainer.classList.add("show");
        })
        .catch(err => {
          console.error("검색 실패:", err);
        });
    });
  }
}

// 팔로우 요청 함수
function follow(friendMemNo, button) {
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
      button.disabled = true;
      button.textContent = "요청됨";
    })
    .catch(error => {
      console.error("친구 요청 실패", error);
      alert("요청을 처리하는 중 오류가 발생했습니다.");
    });
}

window.initFriendList = initFriendList;
window.follow = follow;
