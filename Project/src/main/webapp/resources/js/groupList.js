
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
	          <div class="groupnameBox">
							<p><a href="#" class="chat-title" data-group-no="${group.group_no}">${group.chat_title}</a></p>
						</div>
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
		    			<span>성별 제한</span>
		    			<div>${group.lim_gender}</div>
		    			<span>나이 제한</span>
		    			<div>없음</div>
		    			<span>공개 여부</span>
		    			<div>${group.is_public}</div>
		    		</div>`
		    }else{
		    	el.innerHTML+=
		    		`<div class="group-info">
		    			<span>성별 제한</span>
		    			<div>${group.lim_gender}</div>
	    	    		<span>나이 제한</span>
	    	    		<div>${group.min_age}~${group.max_age}</div>
			    		<span>공개 여부</span>
			    		<div>${group.is_public}</div>
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
	
		const foodMap = {
			    1: "한식",
			    2: "일식",
			    3: "중식",
			    4: "양식",
			    5: "베트남요리"
			};
		data.forEach(group => {
		    const hashtags = (group.foodList || []).slice(0, 3)
	        .map(no => `<li>${foodMap[no] || '기타'}</li>`)
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
				    	${hashtags}
			    	</ul>
		    	  </div>
		          <div class="follow-btn">
		            <button onclick="follow(${group.group_no}, this)">팔로우</button>
		          </div>
		        </div>
		      </div>
		    	<div class="group-info">
		    		<p class="title">소개글</p>
		    		<span class="group-introduce">${introduce}</span>
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
    		modifyMemo.closest(".group_profile").querySelector(".group-memo").style.display='none';
    		modifyMemo.closest(".group_profile").querySelector(".group-memo-modify").style.display='inline';
    		modifyMemo.closest(".group_profile").querySelector(".group-modify-btn").style.display='none';
    		modifyMemo.closest(".group_profile").querySelector(".group-save-btn").style.display='inline';
    		modifyMemo.closest(".group-box").querySelector(".group-info").style.display='flex';
    	});
    });
	document.querySelectorAll(".group-save-btn").forEach(modifyMemo => {
		modifyMemo.addEventListener('click',e=>{
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
			if (['button', 'span', 'img', 'p', 'a', 'li'].includes(tag)) {
				return;
			}
			const info = group.closest('.group-box').querySelector('.group-info');
		    const isHidden = window.getComputedStyle(info).display === 'none';
		    info.style.display = isHidden ? 'flex' : 'none';
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
(function() {
//----- 모달 관련 스크립트---------------------------------------------------------------
const groupModal = document.querySelector('#modal');
function openModal(){
	groupModal.style.display = 'block';
	document.body.style.overflow = 'hidden';
}
function closeModal(){
	groupModal.style.display = 'none';
	document.body.style.overflow = 'auto';
}
//-----모임 만들기-------------------------------------------------------------------
function createGroup() {
	const gender = document.querySelector("input[name='gender']:checked");
	const isPublic = document.querySelector(".public-checkbox").checked ? 'Y' : 'N';
	const checked = document.querySelectorAll('input[name="food"]:checked');
	const count = checked.length;
	const clubTilte = document.querySelector("input[name='club-title']");
	const clubDesc = document.querySelector("textarea[name='club-desc']");
	const minAge = document.querySelector("input[name='min-age']");
	const maxAge = document.querySelector("input[name='max-age']");
	const checkMemo=/^.{0,200}$/;
	
	const foodList = Array.from(checked).map(food => Number(food.value));	
	
	
	
	if(!clubTilte.value){
		alert("모임 이름을 입력해 주세요");
	    return;
	}
	if (!checkMemo.test(clubDesc.value)) {
		alert("200자 미만으로 작성");
		return;
	}
	if (count < 1 || count > 3) {
		alert('선호 음식은 1개 이상, 3개 이하로 선택해주세요.');
		return;
	}
	
	const formData = new FormData();
    formData.append('chat_title', clubTilte.value);
    formData.append('group_memo', clubDesc.value);
    formData.append('lim_gender', gender.value);
    formData.append('min_age', minAge.value);
    formData.append('max_age', maxAge.value);
    formData.append('is_public', isPublic);
    // foodList는 배열이므로 반복문으로 추가
    foodList.forEach(food => formData.append('foodList', food));
    // 이미지 파일 추가
    const fileInput = document.getElementById('profileImageInput');
    if (fileInput.files[0]) {
        formData.append('group_img', fileInput.files[0]);
    }
	
	fetch(`/grouplist/createGroup`, {
	    method : 'post',
	    body: formData	
	})
	.then(response => response.text())
	.then(result => {
		alert('그룹 및 채팅방 생성 성공');
	    closeModal();
	    loadGroupList();
	})
	.catch(err => console.log(err));
}
//-----프로필 미리보기----------------------------------------------------------------------
const profileImageInput = document.getElementById('profileImageInput');
const previewImage = document.getElementById('profileImage');

profileImageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 선택해주세요.');
            this.value = '';
            previewImage.src = '#';
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.src = '#';
    }
});
//-----엔터 esc 클릭 이벤트-------------------------------------------------------------------
document.addEventListener('keydown', e=> {
	if (e.keyCode===27) {
		closeModal();
	}
	if (e.keyCode === 13) {
		const isModalHidden = window.getComputedStyle(groupModal).display === 'none';
		if (isModalHidden) {
			document.getElementById("groupSearchButton").click();
		} else {
			createGroup();
		}
	}
});
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
		}else if(type == 'uploadBtn'){
			profileImageInput.click();
		}
	});
});


})();


//-----채팅방 열기-------------------------------------------------------------------
document.addEventListener("click", function(event) {
	if (event.target.classList.contains("chat-title")) {
		moveChatRoom(event);
	}
});

function moveChatRoom(event){
	const target = event.target;

	if(target.classList.contains("chat-title")){
		event.preventDefault();
		
		const roomNo = target.dataset.groupNo;
		
		
		fetch(`/chat/chatRoom/${roomNo}`)
			.then(response => {
				if(!response.ok) throw new Error("채팅방 요청 실패");
				return response.text();
			})
			.then(html => {
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, "text/html");
				
				const chatContainer = document.getElementById("chat-container") || (() => {
					const div = document.createElement("div");
					div.id =  "chat-container";
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
				console.error("채팅방 열기 중 에러 발생:", error);
			})
	}
}






loadGroupList();



