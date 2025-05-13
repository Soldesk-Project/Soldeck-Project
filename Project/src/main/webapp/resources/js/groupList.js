fetch("/grouplist/groupListData")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("groupListContainer");

    if (data.length === 0) {
      const msg = document.createElement("p");
      msg.textContent = "속한 모임이 없습니다.";
      msg.classList.add("no-group");
      container.appendChild(msg);
      return;
    }

    data.forEach(group => {
      const el = document.createElement("div");
      el.classList.add("group-box");

      el.innerHTML = `
        <div class="group_profile">
          <img src="../resources/upload/${group.group_img}" alt="모임프로필" width="80" height="80"
               onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='../resources/images/group_default_profile.png'; }">
          <div class="groupnameBox"><p>${group.chat_title}</p></div>
          <div class="memo_input">
            <input type="text" id="group_memo_box" name="gro_memo" value="${group_mem.group_usermemo || ''}" placeholder="메모 입력" data-group-id="${group_mem.group_no}" />

            <!-- 메모 저장 버튼 -->
            <button onclick="saveMemo(this)">저장</button>
            
            <div class="unfollowBtn">
               <button onclick="unfollow(${group_mem.group_no}, this)">언팔로우</button>
            </div>
         </div>
        </div>
      `;

      container.appendChild(el);
    });
  });

/* 언팔로우 버튼*/
function unfollow(groupMemNo, button) {
     if (!confirm("이 대화방을 나가시겠습니까?")) return;

     fetch("/grouplist/unfollow", {
       method: "POST",
       headers: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
       body: new URLSearchParams({
         group_no: groupMemNo
       })
     })
     .then(res => {
       if (res.ok) {
         alert("모임목록에서 삭제되었습니다");
         // UI에서 해당 요소 제거하거나 버튼 비활성화
         button.closest(".group-box").remove();  // 목록에서 제거
       } else {
         alert("삭제하지 못하였습니다.");
       }
     });
   }

/* 모임 랜덤 추천 */

fetch("/grouplist/groupListRecommendData", {
	  method: "GET",
	  credentials: "include"  // 매우 중요!
	})
	.then(response => {
	  if (!response.ok) {
	    throw new Error("서버 응답 오류: " + response.status);
	  }
	  return response.json();
	})
	.then(data => {
	  const container = document.getElementById("groupListRandomContainer");
	  container.innerHTML = ""; // 이전 내용 초기화

	  if (!Array.isArray(data) || data.length === 0) {
	    container.innerHTML = "<p>추천할 모임이 없습니다.</p>";
	    return;
	  }

	  data.forEach(group => {
	    //fallback 값 설정
	    const hashtags = (group.hashtags || []).slice(0, 3)
	      .map(tag => `<li>#${tag}</li>`)
	      .join('');

	    const introduce = group.group_memo || "";
	    
	    const groupNo = group.group_no;

	    const el = document.createElement("div");
	    el.classList.add("friend-box");

	    el.innerHTML = `
	      <div class="group_profile_random">
	        <div class="group_profileTop">
	          <img src="../resources/upload/${group.group_img}" alt="모임프로필" width="80" height="80"
	            onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='../resources/images/group_default_profile.png'; }">
	          <div class="groupnameBox"><p>${group.chat_title}</p></div>
	          <div class="followBtn">
	            <button onclick="follow(${group.group_no}, this)">팔로우</button>
	          </div>
	        </div>
	        <div class="detailBox" style="display: none;">
	          <div class="preference">
	            <p class="title">선호도</p>
	            <ul class="hashtags">${hashtags}</ul>
	          </div>
	          <div class="introduce">
	            <p class="title">소개글</p>
	            <div class="scrollBox">
	              <ul>${introduce}</ul>
	            </div>
	          </div>
	        </div>
	      </div>
	    `;

	    container.appendChild(el);
	  });
	})
	.catch(error => {
	  console.error("추천 모임 가져오기 실패:", error);
	  const container = document.getElementById("groupListRandomContainer");
	  container.innerHTML = "<p style='color: red;'>추천 그룹 로딩 중 오류가 발생했습니다.</p>";
	});


//그룹 참여 요청 버튼 클릭 시
//function follow(groupMemNo, button) {
//	const senderMemNo = document.body.dataset.memNo;
//    fetch("/grouplist/follow", {
//        method: "POST",
//        credentials: "include",  // 세션 정보 포함
//        headers: {
//            "Content-Type": "application/x-www-form-urlencoded"
//        },
//        body: new URLSearchParams({
//        	senderMemNo: senderMemNo
//        })
//    })
//    .then(res => res.text())
//    .then(msg => {
//    	alert(msg);
//        button.disabled = true;
//        button.textContent = "요청됨";
//    })
//    .catch(error => {
//        console.error("그룹 요청 실패", error);
//        alert("요청을 처리하는 중 오류가 발생했습니다.");
//    });
//}

//팔로우 버튼 클릭 시 친구 요청 보내기
//function acceptFriend(senderMemNo) {
//     fetch("/friendlist/accept", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//       },
//       body: new URLSearchParams({ sender_mem_no: senderMemNo })
//     })
//     .then(res => res.text())
//     .then(res => {
//        if (res.ok) {
//           alert("팔로우 완료!");
//           button.disabled = true;
//           button.textContent = "팔로잉";
//        } else {
//           alert("팔로우에 실패했습니다.");
//        }
//     });
//   }


//모임 검색 결과 창
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

       fetch(`/grouplist/search?keyword=${encodeURIComponent(keyword)}`)
         .then(res => res.json())
         .then(data => {

           if (!Array.isArray(data)) {
             return;
           }

           if (data.length === 0) {
             resultContainer.innerHTML = "<div>검색 결과가 없습니다.</div>";
           } else {
             resultContainer.innerHTML = data.map(group => {
               const imgSrc = group.group_img
                 ? `/resources/upload/${group.mem_img}`
                 : `/resources/upload/group_default_profile.png`;

               return `
                 <div class="group-item">
                   <img src="${imgSrc}" 
                        onerror="this.onerror=null; this.src='../resources/upload/group_default_profile.png';" 
                        width="47.2" alt="프로필">
                   <span>${group.chat_title}</span>
                   
                   <div class="followBtn">
                     <button onclick="follow(${group.group_no}, this)">팔로우</button>
                  </div>
                 </div>
               `;
             }).join("");
           }

           resultContainer.classList.add("show");
         })
         .catch(err => {
         });
     });
   });
