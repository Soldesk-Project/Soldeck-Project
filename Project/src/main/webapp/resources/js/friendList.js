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
	  if (!confirm("정말 이 친구를 언팔로우하시겠습니까?")) return;

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
    const hashtags = (friend.hashtags || [])
      .slice(0, 3) // 최대 3개 제한
      .map(fk => `<li>#${fk.food_no}</li>`)
      .join('');
    const favorites = (friend.bookMarkList || [])
      .filter(bm => bm.is_public === "Y" && bm.rest)
      .slice(0, 3) // 최대 3개 제한
      .map(bm => `<li>#\${bm.rest.rest_name}</li>`)
      .join('');

    const el = document.createElement("div");
    el.classList.add("friend-box");

    el.innerHTML =
    `
      <div class="profile_random">
        <div class="profileTop">
          <img src="/images/\${friend.friendMember.mem_img}" alt="프로필" width="80" height="80"
            onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='/images/profile.png'; }">
          <div class="nicknameBox"><p>\${friend.mem_nick}</p></div>
          <div class="followBtn">
            <button onclick="follow(\${friend.friend_mem_no}, this)">팔로우</button>
          </div>
        </div>
        <div class="detailBox" style="display: none;">
          <div class="preference">
            <p class="title">선호도</p>
            <ul class="hashtags">\${hashtags}</ul>
          </div>
          <div class="favorites">
            <p class="title">공개된 즐겨찾기 리스트</p>
            <div class="scrollBox">
              <ul>\${favorites}</ul>
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

//팔로우 버튼
function follow(friendMemNo, button) {
fetch("/friendlist/follow", {
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
    alert("팔로우 완료!");
    button.disabled = true;
    button.textContent = "팔로잉";
  } else {
    alert("팔로우에 실패했습니다.");
  }
});
}