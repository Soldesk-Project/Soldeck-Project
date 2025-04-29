//-----CSS 파일 추가-----------------------------------------
const CSS_FILE_PATH = '/resources/css/bookmark.css';
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
//-----버튼 클릭 이벤트---------------------------------------------
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    let type = btn.getAttribute("id");

    if(type == 'bookmarkBtn'){
    	openModal();
    }else if(type == 'outBookMarkBtn'){
    	outBookmark();
    	closeModal();
    }else if(type == 'cancelModalBtn'){
    	closeModal();
    }
  });
});
//-----가게 이름 이동------------------------------------------
document.querySelectorAll(".info-text a").forEach(moveRestView => {
	moveRestView.addEventListener('click',e=>{
		e.preventDefault();
		const view = moveRestView.closest(".view").querySelector("#restNo").value;
		location.href="../search/view?rest_no="+view;
	});
})
document.querySelectorAll(".view-img img").forEach(moveRestView => {
	moveRestView.addEventListener('click',e=>{
		e.preventDefault();
		const view = moveRestView.closest(".view").querySelector("#restNo").value;
		location.href="../search/view?rest_no="+view;
	});
})
//-----가게 이름 글자수에 맞게 input태그 길이 변경---------------------
window.addEventListener('load', ()=>{
	document.querySelectorAll('.res-name').forEach(input => resizeInput(input));
});
function resizeInput(input) {
	const size = input.nextElementSibling;
	size.textContent = input.value;
	size.style.font = window.getComputedStyle(input).font;
	input.style.width = size.offsetWidth + 'px';
}
//-----즐겨찾기 삭제 확인 모달-------------------------------------------
const modal = document.querySelector('.bookmark-check-modal');
function openModal(){
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

//-----즐겨찾기 버튼 누를 때 가게 번호 가져오기 ------------------------------
let restNo;
document.querySelectorAll(".bookmark").forEach(bookmarkBtn => {
	bookmarkBtn.addEventListener('click',e=>{
		e.preventDefault();
		restNo = bookmarkBtn.closest(".view-info").querySelector("#restNo").value;
	});
})
//멤버 번호 가져오기
let memberNo=document.querySelector("#memNo").value;

//----- 즐겨찾기 삭제 함수-------------------------------------------------
function outBookmark() {
	console.log(restNo);
	console.log(memberNo);

	fetch(`/mypage/favorites/remove/${restNo}`, {
		  method: 'DELETE',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({mem_no: memberNo, rest_no: restNo})
		})
		  .then(response => response.json())
		  .then(data=>{
		  	console.log(data);
		  	location.reload();
		  })
		  .catch(e=>console.log(e));
}







