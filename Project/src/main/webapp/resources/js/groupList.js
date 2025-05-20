
//-----내 모임 목록-----------------------------------------------------------------
function loadGroupList() {
	fetch("/grouplist/groupListData")
	  .then(response => response.json())
	  .then(data => {
	    const container = document.getElementById("groupListContainer");
	
	    container.innerHTML = "";
	    document.querySelector('.groupTitle').innerHTML=`<h2>내가 속한 모임 목록</h2>`;
	    
	    if (data.length === 0) {
	      const msg = document.createElement("p");
	      msg.textContent = "속한 모임이 없습니다.";
	      msg.classList.add("no-group");
	      container.appendChild(msg);
	      return;
	    }
	    
	    data.forEach(group => {
	    	let el = document.createElement("div");
	    	el.classList.add("group-box");
	
	      el.innerHTML += `
	    	<div class="group_profile">
	    	  <img src="../resources/upload/${group.group_img?group.group_img:'group_default_img.png'}" alt="모임프로필" width="80" height="80"
	               onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='../resources/images/group_default_profile.png'; }">
	          <div class="groupnameBox"><p>${group.chat_title}</p></div>
	          <div class="memo_input">
	          	<span class="group-memo">${group.group_usermemo||'//-----'}</span>
	            <input type="text" class="group-memo-modify" value="${group.group_usermemo || ''}" placeholder="메모 입력" data-group-id="${group.group_no}" display="none">
	    	    <input type="hidden" class="group-no" value="${group.group_no}">
	    	  </div>
	
	            <!-- 메모 저장 버튼 -->
	            <button class="group-modify-btn">수정</button>
	    	    <button class="group-save-btn">완료</button>
	            
	            <div class="unfollowBtn">
	               <button onclick="unfollow(${group.group_no}, this)">탈퇴</button>
	            </div>
	        </div>`;
		    if(group.min_age==0||group.max_age==0){
		    	el.innerHTML+=
		    		`<div class="group-info">
		    			<span>성별 제한 : ${group.lim_gender}</span>
		    			<span>나이 제한 : 없음</span>
		    			<span>공개 여부 : ${group.is_public}</span>
		    		</div>`
		    }else{
		    	el.innerHTML+=
		    		`<div class="group-info">
		    			<span>성별 제한 : ${group.lim_gender}</span>
	    	    		<span>나이 제한 : ${group.min_age}~${group.max_age}</span>
			    		<span>공개 여부 : ${group.is_public}</span>
	    	    	</div>`
		    }
	
	      container.appendChild(el);
	    });
	    modifyMemo();
	    clickGroupInfo();
	});
}
//-----랜덤 모임 목록-----------------------------------------------------------------
function loadRandomGroupList() {
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
		const container = document.getElementById("groupListContainer");
		container.innerHTML = ""; // 이전 내용 초기화
		document.querySelector('.groupTitle').innerHTML=`<h2>모임 추천 목록</h2>`;
		  
		if (!Array.isArray(data) || data.length === 0) {
			container.innerHTML = "<p>추천할 모임이 없습니다.</p>";
		    return;
		}
	
		data.forEach(group => {
			//fallback 값 설정
		    const hashtags = (group.hashtags || []).slice(0, 3)
		    .map(tag => `<li>#${tag}</li>`)
		    .join('');
	
		    const introduce = group.group_memo || "소개글이 없습니다";
	
		    const el = document.createElement("div");
		    el.classList.add("group-box");
		    
		    el.innerHTML = `
		      <div class="group_profile">
		        <div class="group_profileTop">
		          <img src="../resources/upload/${group.group_img?group.group_img:'group_default_img.png'}" alt="모임프로필" width="80" height="80"
		            onerror="if (!this.dataset.error) { this.dataset.error = true; this.src='../resources/images/group_default_profile.png'; }">
		          <div class="groupnameBox"><p>${group.chat_title}</p></div>
		    	  <div><p class="title">선호도</p></div>
		    	  <div class="preference">
			    	<ul class="hashtags">
				    	<li>한식</li>
				    	<li>베트남식</li>
			    	</ul>
		    	  </div>
		          <div class="follow-btn">
		            <button onclick="follow(${group.group_no}, this)">팔로우</button>
		          </div>
		        </div>
		      </div>
		    	<div class="group-info">
		    		<p class="title">소개글</p>
		    		<span>${introduce}</span>
		    	</div>
		    `;
		    container.appendChild(el);
		});
		clickGroupInfo();
	})
	.catch(error => {
		console.error("추천 모임 가져오기 실패:", error);
		const container = document.getElementById("groupListRandomContainer");
		container.innerHTML = "<p style='color: red;'>추천 그룹 로딩 중 오류가 발생했습니다.</p>";
	});
}
//-----메모 수정 버튼 클릭 시 변경사항, 클릭시 정보나타내기-------------------------------------------------------------------
function modifyMemo() {
	document.querySelectorAll(".group-modify-btn").forEach(modifyMemo => {
		modifyMemo.addEventListener('click',e=>{
    		console.log('수정 버튼');
    		modifyMemo.closest(".group_profile").querySelector(".group-memo").style.display='none';
    		modifyMemo.closest(".group_profile").querySelector(".group-memo-modify").style.display='inline';
    		modifyMemo.closest(".group_profile").querySelector(".group-modify-btn").style.display='none';
    		modifyMemo.closest(".group_profile").querySelector(".group-save-btn").style.display='inline';
    		modifyMemo.closest(".group-box").querySelector(".group-info").style.display='flex';
    	});
    });
	document.querySelectorAll(".group-save-btn").forEach(modifyMemo => {
		modifyMemo.addEventListener('click',e=>{
			console.log('수정 완료 버튼');
			let memo=modifyMemo.closest(".group-box").querySelector(".group-memo-modify").value;
			let groupNo=modifyMemo.closest(".group-box").querySelector(".group-no").value;
			saveGroupMemo(memo, groupNo);
		});
	});
}
function clickGroupInfo() {
	document.querySelectorAll('.group-box').forEach(group=>{
		group.addEventListener('click',e=>{
			const tag = e.target.tagName.toLowerCase();
			const modifyBtn=group.closest('.group-box').querySelector('.group-modify-btn');
			if (modifyBtn) {
				if (modifyBtn.style.display=='none') {
					return;
				}
			}
			if (['button', 'span', 'img', 'p', 'li'].includes(tag)) {
				return;
			}
			if(group.closest('.group-box').querySelector('.group-info').style.display=='none'){
				group.closest('.group-box').querySelector('.group-info').style.display='flex';
			}else{
				group.closest('.group-box').querySelector('.group-info').style.display='none';
			}
		});
	});
}
//----메모 저장-------------------------------------------------------------------
function saveGroupMemo(memo, groupNo) {
	const checkMemo=/^.{0,200}$/;
	if (!checkMemo.test(memo)) {
		alert("200자 미만으로 작성");
		return;
	}else{
		fetch('/mypage/club/memoUpdate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({group_no: groupNo, group_usermemo: memo})
		})
		.then(response => response.json())
		.then(data=>{
			loadGroupList();
		})
		.catch(e=>console.log(e));
	}
}
//-----언팔 버튼-------------------------------------------------------------------
function unfollow(groupNo, button) {
	if (!confirm("이 대화방을 나가시겠습니까?")) return;

    fetch("/grouplist/unfollow", {
    	method: "POST",
        headers: {
        	"Content-Type": "application/x-www-form-urlencoded"
        	},
        body: new URLSearchParams({
        	group_no: groupNo
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
//-----그룹 참여 버튼-------------------------------------------------------------------
function follow(groupNo, button) {
	fetch("/grouplist/follow", {
		method: "POST",
        credentials: "include",  // 세션 정보 포함
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
        	group_no: groupNo
        })
    })
    .then(res => res.text())
    .then(msg => {
    	alert(msg);
        button.disabled = true;
        button.textContent = "요청됨";
    })
    .catch(error => {
        console.error("그룹 요청 실패", error);
        alert("요청을 처리하는 중 오류가 발생했습니다.");
    });
}
//-----수락 시 상호작용-------------------------------------------------------------------
function acceptFriend(senderMemNo) {
    fetch("/friendlist/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({ sender_mem_no: senderMemNo })
    })
    .then(res => res.text())
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
//-----모임 검색 결과-------------------------------------------------------------------
function searchGroupList() {
    const searchBtn = document.getElementById("groupSearchButton");
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
    				const imgSrc =`../resources/upload/${group.group_img?group.group_img:'group_default_img.png'}`;

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
        .catch(err=>console.error("그룹 요청 실패", error));
    });
}
//-----모임 만들기-------------------------------------------------------------------
function createGroup() {
	  const gender = document.querySelector("input[name='gender']:checked");
	  if(!clubTilte.value){
	    alert("모임 이름을 입력해 주세요");
	    return;
	  }
	
	  if(!clubDesc.value){
	    alert("모임 소개를 입력해 주세요");
	    return;
	  }
	
	  const data = {
	    chatTitle : clubTilte.value,
	    groupMemo : clubDesc.value,
	    minAge : minAge.value,
	    maxAge : maxAge.value,
	    limGender : gender.value,
	    isPublic: isPublic ? 'Y' : 'N'
	  }
	
	  console.log(data);
	
	  fetch(`/grouplist/createGroup`, {
	    method : 'post',
	    body : JSON.stringify(data),
	    headers : {
	      'content-type' : 'application/json; charset=utf-8'
	    }
	  })
	    .then(response => response.json())
	    .then(result => {
	      console.log(result);
	      alert('그룹 및 채팅방 생성 성공');
	      window.location.href = result.redirect;
	    })
	    .catch(err => console.log(err));
}
//----- 모달 관련 스크립트---------------------------------------------------------------

(function() {


const groupModal = document.querySelector('#modal');
const clubTilte = document.querySelector("input[name='club-title']");
const clubDesc = document.querySelector("textarea[name='club-desc']");
const minAge = document.querySelector("input[name='min-age']");
const maxAge = document.querySelector("input[name='max-age']");
const isPublic = document.querySelector(".public-checkbox").checked ? 'Y' : 'N';
function openModal(){
	groupModal.style.display = 'block';
	document.body.style.overflow = 'hidden';
}
function closeModal(){
	groupModal.style.display = 'none';
	document.body.style.overflow = 'auto';
}



//-----버튼 클릭 이벤트-------------------------------------------------------------------
document.querySelectorAll('button').forEach(btn => {
	btn.addEventListener('click', () => {
	    let type = btn.getAttribute("id");

	    if(type == 'myGroupBtn'){
	    	loadGroupList();
		}else if(type == 'randomGroupBtn'){
			loadRandomGroupList();
		}else if(type == 'groupSearchButton'){
			searchGroupList();
		}else if(type == 'createGroupBtn'){
			openModal();
		}else if(type == 'createBtn'){
			createGroup();
		}else if(type == 'closeModalBtn'){
			closeModal();
		}
	});
});


loadGroupList();
})();











