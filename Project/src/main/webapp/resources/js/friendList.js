// ======================== 전역 이벤트 위임 ========================= //
document.addEventListener("click", handleFriendListClick);

function handleFriendListClick(event) {
  const target = event.target;

  // 채팅방 열기
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

        // 이벤트 중복 방지: once: true
        window.addEventListener("chatContextReady", () => {
          window.dispatchEvent(new CustomEvent('openChatRoom', { detail: { roomNo } }));
        }, { once: true });

        const scripts = doc.querySelectorAll("script");
        scripts.forEach(s => s.remove());
        chatContainer.innerHTML = doc.body.innerHTML;

        scripts.forEach(oldScript => {
          const newScript = document.createElement("script");
          if (oldScript.src) {
            if (!document.querySelector(`script[src="${oldScript.src}"]`)) {
              newScript.src = oldScript.src;
              newScript.type = oldScript.type || "text/javascript";
              document.body.appendChild(newScript);
            }
          } else {
            newScript.textContent = oldScript.textContent;
            newScript.type = oldScript.type || "text/javascript";
            document.body.appendChild(newScript);
          }
        });

        if (!document.querySelector('link[href="/resources/css/chatroom.css"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.type = "text/css";
          link.href = "/resources/css/chatroom.css";
          document.head.appendChild(link);
        }

        const existingScript = document.querySelector('script[src="/resources/js/chatroom.js"]');
        if (existingScript) existingScript.remove();

        const script = document.createElement('script');
        script.src = "/resources/js/chatroom.js";
        script.onload = () => {
          if (window.chatContext) {
            window.dispatchEvent(new Event("chatContextReady"));
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
    const memoInput = target.closest(".profile").querySelector(".friend-memo-modify");
    const memo = memoInput.value.trim();

    fetch("/friendlist/saveMemo", {
      method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify({friend_mem_no: friendMemNo, fre_memo: memo})
    })
    .then(res => res.text())
    .then(msg => loadFriendList())
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

  // 탭 전환
  if (target.classList.contains("friend-tab-button")) {
    const targetTab = target.dataset.tab;

    document.querySelectorAll(".friend-tab-button").forEach(btn => btn.classList.remove("active"));
    target.classList.add("active");

    document.querySelectorAll(".friendTabPane").forEach(pane => pane.classList.remove("active"));
    const activePane = document.getElementById(`tab-${targetTab}`);
    if (activePane) activePane.classList.add("active");
  }
}

// ======================== 기능별 로드 함수 ========================= //
function initFriendList() {
	loadRecommendedFriends();
	loadFriendList();
	setupFriendSearch();
	
}

function loadFriendList() {
  fetch("/friendlist/friendListData")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("friendListContainer");
      container.innerHTML = "";

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

        
        let foodEl = '';
        if (friend.foodKateList && friend.foodKateList.length > 0) {
        	foodEl = friend.foodKateList.map(food => `<span>${food}</span><br>`).join('');
        } else {
        	foodEl = '<span>선호음식 없음</span>';
        }
        
        let bookmarkEl = '';
        if (friend.bookMarkList && friend.bookMarkList.length > 0) {
        	bookmarkEl = friend.bookMarkList.slice(0,3).map(bm =>
                `<span class="rest_name">${bm.rest_name}</span>`
            ).join('');
        } else {
        	bookmarkEl = '<span class="rest_name">즐겨찾기 없음</span>';
        }
        
        el.innerHTML = `
          <div class="profile">
            <img src="../resources/upload/${friend.friendMember.mem_img}" alt="프로필" width="80" height="80"
                onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='../resources/images/profile.png'; }">
            <div class="nicknameBox">
              <p><a href="#" class="friend-name" data-friend-no="${friend.friend_mem_no}">${friend.friendMember.mem_nick}</a></p>
            </div>
            <div class="memo_content">
              <span class="friend-memo">${friend.fre_memo||'//-----'}</span>
              <input type="text" class="friend-memo-modify" value="${friend.fre_memo || ''}" placeholder="메모 입력" data-friend-id="${friend.friend_mem_no}" />
        	</div>
        	<button class="modify-memo-btn" data-friend-id="${friend.friend_mem_no}">수정</button>
            <button class="save-memo-btn" data-friend-id="${friend.friend_mem_no}">저장</button>
        	<button class="unfollow-btn" data-friend-id="${friend.friend_mem_no}">언팔로우</button>
          </div>
	      <div class="friend-info">
	    	<span>선호 음식</span>
	    	<div class="cate">
	    		<span>${foodEl}</span>
		    </div>
	    	<span>즐겨찾기</span>
    		<div>${bookmarkEl}</div>
    	  </div>`;
        
        
        container.appendChild(el);
      });
      modifyMemo();
      clickFriendInfo();
    })
    .catch(error => console.error("친구 목록 로드 실패:", error));
}

function loadRecommendedFriends() {
  fetch("/friendlist/friendListRecommendData", { credentials: "include" })
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("friendListRandomContainer");
      container.innerHTML = "";

      data.forEach(friend => {
        const hashtags = (friend.hashtags || []).slice(0, 3).map(fk => `<li>#${fk.food_no}</li>`).join('');
        const favorites = (friend.bookMarkList || [])
          .filter(bm => bm.is_public === "Y" && bm.rest)
          .slice(0, 3)
          .map(bm => `<li>#${bm.rest.rest_name}</li>`).join('');
        const el = document.createElement("div");
        el.classList.add("friend-box");

        let foodEl = '';
        if (friend.foodKateList && friend.foodKateList.length > 0) {
        	foodEl = friend.foodKateList.map(food => `<span>${food}</span><br>`).join('');
        } else {
        	foodEl = '<span>선호음식 없음</span>';
        }
        
        let bookmarkEl = '';
        if (friend.bookMarkList && friend.bookMarkList.length > 0) {
        	bookmarkEl = friend.bookMarkList.slice(0,3).map(bm =>
                `<span class="rest_name">${bm.rest_name}</span>`
            ).join('');
        } else {
        	bookmarkEl = '<span class="rest_name">즐겨찾기 없음</span>';
        }
        
        el.innerHTML = `
	        <div class="profile">
	        	<div class="profileTop">
	            	<img src="../resources/upload/${friend.friendMember.mem_img||'profile.png'}" alt="프로필" width="80" height="80"
	                	onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='../resources/images/profile.png'; }">
	              	<div class="nicknameBox"><p>${friend.friendMember.mem_nick}</p></div>
	              	<div class="followBtn"><button onclick="follow(${friend.mem_no}, this)">팔로우</button></div>
        		</div>
        	</div>
	        <div class="friend-info">
	            <span>선호 음식</span>
		    	<div class="cate"><span>${foodEl}</span></div>
		    	<span>즐겨찾기</span>
	    		<div>${bookmarkEl}</div>
	        </div>
        `;
        container.appendChild(el);
      });
      clickFriendInfo();
    });

}
function setupFriendSearch() {
  const searchBtn = document.getElementById("friendSearchButton");
  const input = document.getElementById("searchInput");
  const resultContainer = document.getElementById("searchResultContainer");

  if (!searchBtn || !input || !resultContainer) return;

  const doSearch = () => {
    const keyword = input.value.trim();
    if (!keyword) {
      resultContainer.classList.remove("show");
      resultContainer.innerHTML = "";
      return;
    }

    fetch(`/friendlist/search?keyword=${encodeURIComponent(keyword)}`)
      .then(res => res.json())
      .then(data => {
        resultContainer.innerHTML = data.length === 0
          ? "<div>검색 결과가 없습니다.</div>"
          : data.map(friend => {
              const imgSrc = friend.mem_img
                ? `/resources/upload/${friend.mem_img}`
                : `/resources/upload/profile.png`;

              return `
                <div class="friend-item">
                  <img src="${imgSrc}" width="47.2" alt="프로필"
                       onerror="this.onerror=null; this.src='../resources/upload/profile.png';">
                  <span>${friend.mem_nick}</span>
                  <div class="followBtn"><button onclick="follow(${friend.mem_no}, this)">팔로우</button></div>
                </div>
              `;
            }).join("");

        resultContainer.classList.add("show");
      })
      .catch(err => console.error("검색 실패:", err));
  };

  searchBtn.addEventListener("click", doSearch);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") doSearch();
  });
}

// ======================== 팔로우 함수 ========================= //
function follow(friendMemNo, button) {
  fetch("/friendlist/follow", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ friend_mem_no: friendMemNo })
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
// ======================== 기능 부여 함수 ========================= //
function modifyMemo() {
	document.querySelectorAll(".modify-memo-btn").forEach(modifyMemo => {
		modifyMemo.addEventListener('click',e=>{
    		modifyMemo.closest(".profile").querySelector(".friend-memo").style.display='none';
    		modifyMemo.closest(".profile").querySelector(".friend-memo-modify").style.display='inline';
    		modifyMemo.closest(".profile").querySelector(".modify-memo-btn").style.display='none';
    		modifyMemo.closest(".profile").querySelector(".save-memo-btn").style.display='inline';
    	});
    });
}
function clickFriendInfo() {
	document.querySelectorAll('.friend-box').forEach(group=>{
		if (group.dataset.hasClickFriendInfo){return;}
	    group.dataset.hasClickFriendInfo = "true";
		group.addEventListener('click',e=>{
			const tag = e.target.tagName.toLowerCase();
			if (['button', 'span', 'img', 'p', 'a', 'input'].includes(tag)) {
				return;
			}
			const info = group.closest('.friend-box').querySelector('.friend-info');
		    const isHidden = window.getComputedStyle(info).display === 'none';
		    info.style.display = isHidden ? 'flex' : 'none';
		});
	});
}



























window.initFriendList = initFriendList;
window.follow = follow;
