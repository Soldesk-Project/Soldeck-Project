const senderMemNo = parseInt(document.body.dataset.memNo, 10);

console.log(senderMemNo);

let socket = null;

if (senderMemNo) {
    // WebSocket 연결
    socket = new WebSocket("wss://4ea1-14-52-79-21.ngrok-free.app/friendSocket");

    socket.onopen = () => {
        console.log("WebSocket 연결됨");
        socket.send(senderMemNo.toString());  // 서버에 내 mem_no 전달
    };

    // WebSocket 메시지 수신 시 처리
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data); // 서버에서 받은 데이터(JSON 형태로 가정)
        console.log("받은 데이터:", data); 
        displayFriendRequestAlert(data);  // 알림 화면에 표시
    };

    socket.onclose = () => console.log("WebSocket 연결 종료");
    socket.onerror = (err) => console.error("WebSocket 오류", err);
}

//친구 요청 알림을 화면에 표시
function displayFriendRequestAlert(data) {
    const notificationContainer = document.getElementById("notificationContainer");

    const notification = document.createElement("div");
    notification.classList.add("friend-request-notification");
    notification.innerHTML = `
        <p><strong>${data.senderNick}</strong>님이 친구 요청을 보냈습니다.</p>
        <button onclick="acceptFriend(${data.senderMemNo})">수락</button>
        <button onclick="declineFriendRequest(${data.senderMemNo})">거절</button>
    `;

    notificationContainer.appendChild(notification);
}

// 친구 요청 수락
function acceptFriendRequest(senderMemNo) {
    fetch("/friendlist/acceptFriendRequest", {
        method: "POST",
        body: JSON.stringify({ friendMemNo: senderMemNo }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        alert("친구 요청을 수락했습니다!");
    });
}

// 친구 요청 거절
function declineFriendRequest(senderMemNo) {
    fetch("/friendlist/declineFriendRequest", {
        method: "POST",
        body: JSON.stringify({ friendMemNo: senderMemNo }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        alert("친구 요청을 거절했습니다.");
    });
}


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
          <img src="/images/${friend.friendMember.mem_img}" alt="프로필" width="80" height="80"
               onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='/images/profile.png'; }">
          <div class="nicknameBox"><p>${friend.friendMember.mem_nick}</p></div>
          <div class="memo_input">
    	  	<input type="text" id="friend_memo_box" name="fre_memo" value="${friend.fre_memo || ''}" placeholder="메모 입력" data-friend-id="${friend.friend_mem_no}" />

    	  	<!-- ✅ 저장 버튼 -->
    	  	<button onclick="saveMemo(this)">저장</button>
    	  	
    	  	<div class="unfollowBtn">
    	  		<button onclick="unfollow(${friend.friend_mem_no}, this)">언팔로우</button>
    	  	</div>
    	  </div>
        </div>
      `;

      container.appendChild(el);
    });
  });

/* 언팔로우 버튼*/
function unfollow(friendMemNo, button) {
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
	      // UI에서 해당 요소 제거하거나 버튼 비활성화
	      button.closest(".friend-box").remove();  // 목록에서 제거
	    } else {
	      alert("삭제하지 못하였습니다.");
	    }
	  });
	}

/* 친구 랜덤 추천 */

fetch("/friendlist/friendListRecommendData", {
	  method: "GET",
	  credentials: "include"  // 이거 매우 중요!
	})
.then(response => response.json())
.then(data => {
  const container = document.getElementById("friendListRandomContainer");

  data.forEach(friend => {
	  console.log("받은 친구 데이터:", friend);
	  
    const hashtags = (friend.hashtags || [])
      .slice(0, 3) // 최대 3개 제한
      .map(fk => `<li>#${fk.food_no}</li>`)
      .join('');
    const favorites = (friend.bookMarkList || [])
      .filter(bm => bm.is_public === "Y" && bm.rest)
      .slice(0, 3) // 최대 3개 제한
      .map(bm => `<li>#${bm.rest.rest_name}</li>`)
      .join('');

    const el = document.createElement("div");
    el.classList.add("friend-box");

    el.innerHTML =
    `
      <div class="profile_random">
        <div class="profileTop">
          <img src="/images/\${friend.friendMember.mem_img}" alt="프로필" width="80" height="80"
            onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='/images/profile.png'; }">
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
    // 클릭 시 상세 창
    el.querySelector(".profile_random").addEventListener("click", function (e) {
      // 버튼 클릭 시 이벤트 무시
      if (e.target.tagName === "BUTTON") return;

      const allProfiles = document.querySelectorAll(".profile_random");
      allProfiles.forEach(profile => {
        const detail = profile.querySelector(".detailBox");
        if (profile !== this) {
          detail.style.display = "none";
        }
      });

      const detailBox = this.querySelector(".detailBox");
      detailBox.style.display = (detailBox.style.display === "none") ? "block" : "none";
    });

    container.appendChild(el);
  });
});

//팔로우 버튼 클릭 시 친구 요청 보내기
//친구 요청 버튼 클릭 시
function follow(friendMemNo, button) {
    fetch("/friendlist/follow", {
        method: "POST",
        credentials: "include",  // 세션 정보 포함
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            friend_mem_no: friendMemNo
        })
    })
    .then(res => res.text())
    .then(msg => {
        button.disabled = true;
        button.textContent = "요청됨";
    })
    .catch(error => {
        console.error("친구 요청 실패", error);
        alert("요청을 처리하는 중 오류가 발생했습니다.");
    });
}

function acceptFriend(senderMemNo) {
	  fetch("/friendlist/accept", {
	    method: "POST",
	    headers: {
	      "Content-Type": "application/x-www-form-urlencoded"
	    },
	    body: new URLSearchParams({ sender_mem_no: senderMemNo })
	  })
	  .then(res => res.text())
	}

	console.log("보내는 값:", friendMemNo);
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
.then(res => {
  if (res.ok) {
    alert("팔로우 완료!");
    button.disabled = true;
    button.textContent = "팔로잉";
  } else {
    alert("팔로우에 실패했습니다.");
  }
});
}

//친구 검색 결과 창
document.addEventListener("DOMContentLoaded", function () {
	  const searchBtn = document.getElementById("searchButton");
	  const input = document.getElementById("searchInput");
	  const resultContainer = document.getElementById("searchResultContainer");

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
	        console.log("응답 데이터:", data);

	        if (!Array.isArray(data)) {
	          console.error("배열x", data);
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
	                     onerror="this.onerror=null; this.src='/resources/upload/profile.png';" 
	                     width="47.2" alt="프로필">
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
	});
