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

fetch("/friendlist/friendListRecommendData")
.then(response => response.json())
.then(data => {
  const container = document.getElementById("friendListRandomContainer");

  data.forEach(friend => {
    const el = document.createElement("div");
    el.classList.add("friend-box");

    el.innerHTML = `
      <div class="profile">
        <img src="/images/${friend.friendMember.mem_img}" alt="프로필" width="80" height="80"
             onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='/images/profile.png'; }">
        <div class="nicknameBox"><p>${friend.friendMember.mem_nick}</p></div>
  	  	
  	  	<div class="followBtn">
  	  		<button onclick="follow(${friend.friend_mem_no}, this)">팔로우</button>
  	  	</div>
  	  </div>
      </div>
    `;

    container.appendChild(el);
  });
});