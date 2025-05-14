function initFriendList() {
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
      console.log(myNo);
      console.log(friendNo);

      if (!myNo || !friendNo) {
        alert("사용자 정보가 없습니다.");
        return;
      }

      const roomNo = Number(myNo) < Number(friendNo)
        ? `${myNo}${friendNo}`
        : `${friendNo}${myNo}`;

      location.href = `/chat/privateRoom/${roomNo}`;
      return;
    }

    // 저장
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
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
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
  });

  console.log("friendList 초기화 완료");
}

window.initFriendList = initFriendList;
