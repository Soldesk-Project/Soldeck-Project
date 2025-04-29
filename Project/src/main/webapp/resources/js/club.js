//-----CSS 파일 추가-----------------------------------------
const CSS_FILE_PATH = '/resources/css/club.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);

const CSS_FILE_PATH2 = '/resources/css/header.css';
let linkEle2 = document.createElement('link');
linkEle2.rel = 'stylesheet';
linkEle2.href = CSS_FILE_PATH2;
document.head.appendChild(linkEle2);

const CSS_FILE_PATH3 = '/resources/css/footer.css';
let linkEle3 = document.createElement('link');
linkEle3.rel = 'stylesheet';
linkEle3.href = CSS_FILE_PATH3;
document.head.appendChild(linkEle3);

// 버튼 클릭 이벤트
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    let type = btn.getAttribute("id");

    if(type == 'createClubBtn'){
        openModal();
    }else if(type == 'closeModalBtn'){
        closeModal();
    }else if(type == 'cancelModalBtn'){
    	closeModal();
    }else if(type == 'createBtn'){
        createClub();
    }else if(type == 'outBookMarkBtn'){
    	deleteBookmark();
	}else if(type == 'addBookMarkBtn'){
		addBookmark();
	}else if(type == 'memoUpdateBtn'){
		saveMemo();
	}
  });
});
//-----페이지 로딩시 즐겨찾기 판단-----------------------------
document.addEventListener('DOMContentLoaded', ()=> {
	const bookmarkButtons = document.querySelectorAll('.bookmark');
	const isPublicInputs = document.querySelectorAll('input[id="isPublic"]');
	bookmarkButtons.forEach((btn, index) => {
		const isPublic = isPublicInputs[index].value;
		if (isPublic === 'Y') {
			btn.classList.remove('active');
		} else {
			btn.classList.add('active');
		}
	});
});
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.bookmark').forEach(btn => {
		btn.addEventListener('click', function() {
			if (btn.classList.contains('active')) {
				openAddBookmarkModal();
			} else {
				openDeleteBookmarkModal();
			}
		});
	});
});
//-----즐겨찾기 버튼-------------------------------------------
//즐겨찾기 버튼 -> 그룹 번호
let groupNo;
document.querySelectorAll(".bookmark").forEach(bookmarkBtn => {
	bookmarkBtn.addEventListener('click',e=>{
		e.preventDefault();
		groupNo = bookmarkBtn.closest(".club-info").querySelector("#groupNo").value;
	});
})
//메모저장 버튼 -> 그룹 번호, 메모 내용
let memo;
document.querySelectorAll(".memo-btn").forEach(saveMemo => {
	saveMemo.addEventListener('click',e=>{
		e.preventDefault();
		groupNo = saveMemo.closest(".club-content").querySelector("#groupNo").value;
		memo=saveMemo.closest(".club-content").querySelector(".memo-area").value;
		checkMemo();
	});
})
let memberNo=document.querySelector("#memNo").value;
//-----그룹 이름 클릭 시 채팅방으로 이동--------------------------------------------
document.querySelectorAll(".club-name").forEach(moveChatRoom => {
	moveChatRoom.addEventListener('click',e=>{
		e.preventDefault();
		// 현재 input 기준으로 가장 가까운 div에서 groupNo를 찾기
		const groupNo = moveChatRoom.closest(".club-list").querySelector("#groupNo").value;
		location.href="../chat/chatRoom/" + groupNo;
	});
})



//----- 모달 관련 스크립트---------------------------------------------------------------
const modal = document.querySelector('#modal');
const modal2 = document.querySelector('.save-memo-modal');
const modal3 = document.querySelector('.bookmark-check-modal');
const modal4 = document.querySelector('.bookmark-add-modal');
const clubTilte = document.querySelector("input[name='club-title']");
const clubDesc = document.querySelector("textarea[name='club-desc']");
const minAge = document.querySelector("input[name='min-age']");
const maxAge = document.querySelector("input[name='max-age']");
const isPublic = document.querySelector(".public-checkbox").checked ? 'Y' : 'N';

function openModal(){
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}
//메모 저장
function openSaveMemoModal() {
	modal2.style.display = 'block';
	document.body.style.overflow = 'hidden';
}
//즐겨찾기 삭제
function openDeleteBookmarkModal(){
	modal3.style.display = 'block';
	document.body.style.overflow = 'hidden';
}
//즐겨찾기 추가
function openAddBookmarkModal() {
	modal4.style.display = 'block';
	document.body.style.overflow = 'hidden';
}
function closeModal(){
  modal.style.display = 'none';
  modal2.style.display = 'none';
  modal3.style.display = 'none';
  modal4.style.display = 'none';
  document.body.style.overflow = 'auto';
}
//----- --------------------------------------------------------------



function createClub(){
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

  fetch(`/mypage/createGroup`, {
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
//-----메모 저장----------------------------------
function checkMemo() {
	const checkMemo=/^.{0,200}$/;
	if (!checkMemo.test(memo)) {
		alert("200자 미만으로 작성");
		return;
	}else{
		openSaveMemoModal();
	}
}
function saveMemo() {
	console.log(groupNo);
	console.log(memberNo);
	console.log(memo);
	
	fetch('/mypage/club/memoUpdate', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json; charset=utf-8'
		  },
		  body: JSON.stringify({mem_no: memberNo, group_no: groupNo, group_usermemo: memo})
		})
		  .then(response => response.json())
		  .then(data=>{
		  	console.log(data);
		  	location.reload();
		  })
		  .catch(e=>console.log(e));
	

}
//----- 즐겨찾기 삭제 함수-------------------------------------------------
function deleteBookmark() {
	console.log(groupNo);
	console.log(memberNo);
	
	fetch('/mypage/groupBookmark/del', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json; charset=utf-8'
		  },
		  body: JSON.stringify({mem_no: memberNo, group_no: groupNo})
		})
		  .then(response => response.json())
		  .then(data=>{
		  	console.log(data);
		  	location.reload();
		  })
		  .catch(e=>console.log(e));
}
//-----즐겨찾기 추가 함수----------------------------------------------------
function addBookmark() {
	console.log(groupNo);
	console.log(memberNo);
	
	fetch('/mypage/groupBookmark/add', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json; charset=utf-8'
		  },
		  body: JSON.stringify({mem_no: memberNo, group_no: groupNo})
		})
		  .then(response => response.json())
		  .then(data=>{
		  	console.log(data);
		  	location.reload();
		  })
		  .catch(e=>console.log(e));
}





