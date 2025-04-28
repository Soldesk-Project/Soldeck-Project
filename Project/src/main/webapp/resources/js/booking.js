//-----CSS 파일 추가-----------------------------------------
const CSS_FILE_PATH = '/resources/css/booking.css';
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
//-----가게 이름 이동------------------------------------------
document.querySelectorAll(".info-text a").forEach(moveRestView => {
	moveRestView.addEventListener('click',e=>{
		e.preventDefault();
		const view = moveRestView.closest(".booking-info").querySelector("#restNo").value;
		location.href="../search/view?rest_no="+view;
	});
})
document.querySelectorAll(".booking-img img").forEach(moveRestView => {
	moveRestView.addEventListener('click',e=>{
		e.preventDefault();
		const view = moveRestView.closest(".booking-list").querySelector("#restNo").value;
		location.href="../search/view?rest_no="+view;
	});
})
//-----페이지 로딩시 즐겨찾기 유무 판단 / 즐겨찾기 유무에 따라 이벤트 부여----------------------------------------------
document.addEventListener('DOMContentLoaded', ()=> {
	const bookmarkButtons = document.querySelectorAll('.bookmark');
	const isPublicInputs = document.querySelectorAll('input[id="isPublic"]');
	bookmarkButtons.forEach((btn, index) => {
		const isPublic = isPublicInputs[index].value;
		if (isPublic === 'Y'||isPublic==='N') {
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

//-----버튼 누를 때 데이터 가져오기 ------------------------------
// 즐겨찾기 버튼 -> 가게 번호
let restNo;
document.querySelectorAll(".bookmark").forEach(bookmarkBtn => {
	bookmarkBtn.addEventListener('click',e=>{
		e.preventDefault();
		restNo = bookmarkBtn.closest(".booking-info").querySelector("#restNo").value;
	});
})
// 예약취소 버튼 -> 예약 번호
let resNo;
document.querySelectorAll(".booking-cancel-btn").forEach(bookingCancelBtn => {
	bookingCancelBtn.addEventListener('click',e=>{
		e.preventDefault();
		resNo = bookingCancelBtn.closest(".booking-schedule").querySelector(".reserve-no").value;
	});
})
// 메모저장 버튼 -> 예약 번호
let memo;
document.querySelectorAll(".booking-memo-btn").forEach(saveMemo => {
	saveMemo.addEventListener('click',e=>{
		e.preventDefault();
		resNo = saveMemo.closest(".sec-2").querySelector(".reserve-no").value;
		memo=saveMemo.closest(".sec-2").querySelector(".booking-memo").value;
	});
})
//-----버튼들 클릭 이벤트-------------------------------------------
document.querySelectorAll("button").forEach(btn=>{
	btn.addEventListener('click',e=>{
		let type=btn.getAttribute('id');
		
		if(type=='bookingCancelBtn'){
			openBookingCancelModal();
		}else if(type=='saveMemoBtn'){
			openSaveMemoModal();
	    }else if(type=='outBookMarkBtn'){
	    	deleteBookmark();
	    	closeModal();
	    }else if(type=='addBookMarkBtn'){
	    	addBookmark();
	    	closeModal();
		}else if(type=='cancelBookingBtn'){
			bookingCancel();
			closeModal();
		}else if(type=='memoUpdateBtn'){
			saveMemo();
			closeModal();
		}else if(type=='cancelModalBtn'){
			closeModal();
		}
	});
});
//-----모달 창 띄우기-------------------------------------------
const modal1 = document.querySelector('.bookmark-check-modal');
const modal2 = document.querySelector('.bookmark-add-modal');
const modal3 = document.querySelector('.booking-cancel-modal');
const modal4 = document.querySelector('.save-memo-modal');
//즐겨찾기 삭제
function openDeleteBookmarkModal(){
	modal1.style.display = 'block';
	document.body.style.overflow = 'hidden';
}
//즐겨찾기 추가
function openAddBookmarkModal() {
	modal2.style.display = 'block';
	document.body.style.overflow = 'hidden';
}
//예약 취소
function openBookingCancelModal() {
	modal3.style.display = 'block';
	document.body.style.overflow = 'hidden';
}
//메모 저장
function openSaveMemoModal() {
	modal4.style.display = 'block';
	document.body.style.overflow = 'hidden';
}
//모달 창 닫기
function closeModal(){
	modal1.style.display = 'none';
	modal2.style.display = 'none';
	modal3.style.display = 'none';
	modal4.style.display = 'none';
	document.body.style.overflow = 'auto';
}
//-----모달 작동 함수------------------------------------------------------------


const params = new URLSearchParams(window.location.search);
const memberNo=118;
//----- 즐겨찾기 삭제 함수-------------------------------------------------
function deleteBookmark() {
//	let memberNo=params.get("mem_no");
	console.log(restNo);
	console.log(memberNo);
	
	fetch('/mypage/bookmark/del', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json; charset=utf-8'
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
//-----즐겨찾기 추가 함수----------------------------------------------------
function addBookmark() {
//	let memberNo=params.get("mem_no");
	console.log(restNo);
	console.log(memberNo);
	
	fetch('/mypage/bookmark/add', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json; charset=utf-8'
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
//-----예약 취소 함수--------
function bookingCancel() {
	console.log(resNo);
	fetch('/mypage/booking/del', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json; charset=utf-8'
		  },
		  body: JSON.stringify({res_no: resNo})
		})
		  .then(response => response.json())
		  .then(data=>{
		  	console.log(data);
		  	location.reload();
		  })
		  .catch(e=>console.log(e));
	
}
//-----메모 저장----------------------------------
function saveMemo() {
	console.log(memo);
	console.log(resNo);
	fetch('/mypage/booking/memoUpdate', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json; charset=utf-8'
		  },
		  body: JSON.stringify({res_no: resNo, res_memo: memo})
		})
		  .then(response => response.json())
		  .then(data=>{
		  	console.log(data);
		  	location.reload();
		  })
		  .catch(e=>console.log(e));
}









