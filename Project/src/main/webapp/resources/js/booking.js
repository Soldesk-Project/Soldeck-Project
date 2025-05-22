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

const CSS_FILE_PATH4 = '/resources/css/common.css';
let linkEle4 = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);
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
// --- 과거 여부 판단 ---
document.addEventListener('DOMContentLoaded', function() {
    const bookingLists = document.querySelectorAll('.booking-list');
    const currentDateTime = new Date(); // 현재 시간

    bookingLists.forEach(function(bookingList) {
        const resDateInput = bookingList.querySelector('.booking-date.date');
        const resTimeInput = bookingList.querySelector('.booking-date.time');
        
        // 날짜 형식 변환: "yyyy - MM - dd" -> "yyyy-MM-dd" (fmt:formatDate 패턴 고려)
        const resDateStr = resDateInput.value.replace(/\s/g, ''); 
        const resTimeStr = resTimeInput.value; // "HH:MM" 형식

        const [year, month, day] = resDateStr.split('-').map(Number);
        const [hour, minute] = resTimeStr.split(':').map(Number);
        const bookingDateTime = new Date(year, month - 1, day, hour, minute); // 월은 0부터 시작

        const cancelButton = bookingList.querySelector('.booking-cancel-btn');
        const memoButton = bookingList.querySelector('.booking-memo-btn'); // '수정' 버튼
        const memoModifyInput = bookingList.querySelector('.booking-memo-modify'); // 수정 입력창
        const saveMemoBtn = bookingList.querySelector('.check-memo'); // '저장' 버튼

        if (bookingDateTime < currentDateTime) {
            // 과거 예약인 경우
            bookingList.classList.add('past-booking'); // .past-booking 클래스 추가

            if (cancelButton) {
                cancelButton.textContent = '예약완료'; // 텍스트 변경
                cancelButton.disabled = true; // 버튼 비활성화
            }

            // 메모 관련 기능 비활성화 및 숨김
            if (memoButton) {
                memoButton.style.display = 'none'; // 수정 버튼 숨김
            }
            if (memoModifyInput) {
                memoModifyInput.style.display = 'none'; // 수정 입력창 숨김
                memoModifyInput.readOnly = true; // 읽기 전용
            }
            if (saveMemoBtn) {
                saveMemoBtn.style.display = 'none'; // 저장 버튼 숨김
            }
        }
    });
});

//-----페이지 로딩시 즐겨찾기 유무 판단 / 즐겨찾기 유무에 따라 이벤트 부여----------------------------------------------
document.addEventListener('DOMContentLoaded', ()=> {
	const bookmarkButtons = document.querySelectorAll('.bookmark');
	const isPublicInputs = document.querySelectorAll('input[id="isPublic"]');
	bookmarkButtons.forEach((btn, index) => {
		const isPublic = isPublicInputs[index].value;
		if (isPublic === 'Y'||isPublic==='N') {
			btn.classList.remove('active');
			
			btn.classList.add('bookmarked'); // 북마크된 상태 표시
		} else {
			btn.classList.add('active');
			btn.classList.remove('bookmarked'); // 북마크 해제 상태 표시
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
document.querySelectorAll(".booking-memo-btn").forEach(modifyMemo => {
	modifyMemo.addEventListener('click',e=>{
		e.preventDefault();
		modifyMemo.closest(".booking-info").querySelector(".booking-memo").style.display='none';
		modifyMemo.closest(".booking-info").querySelector(".booking-memo-modify").style.display='inline';
		modifyMemo.closest(".booking-info").querySelector(".booking-memo-btn").style.display='none';
		modifyMemo.closest(".booking-info").querySelector(".check-memo").style.display='inline';
	});
})
document.querySelectorAll(".check-memo").forEach(saveMemo => {
	saveMemo.addEventListener('click',e=>{
		e.preventDefault();
		resNo = saveMemo.closest(".booking-info").querySelector(".reserve-no").value;
		memo = saveMemo.closest(".booking-info").querySelector(".booking-memo-modify").value;
		checkMemo();
	});
})
let memberNo;
document.addEventListener("DOMContentLoaded", ()=>{
	memberNo=document.querySelector(".member-no").value;
});
//-----버튼들 클릭 이벤트-------------------------------------------
document.querySelectorAll("button").forEach(btn=>{
	btn.addEventListener('click',e=>{
		let type=btn.getAttribute('id');
		
		if(type=='bookingCancelBtn'){
			openBookingCancelModal();
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
//----- 즐겨찾기 삭제 함수-------------------------------------------------
function deleteBookmark() {
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
		  	document.querySelectorAll('.bookmark').forEach(btn => {
				const targetRestNo = btn.closest('.booking-info').querySelector('#restNo').value;
				if (targetRestNo === restNo) {
					btn.classList.remove('bookmarked');
					btn.classList.add('active'); // 다시 추가 가능한 상태
				}
			});
		  	location.reload();
		  })
		  .catch(e=>console.log(e));
}
//-----즐겨찾기 추가 함수----------------------------------------------------
const publicFavoriteBtn = document.getElementById('publicFavoriteBtn');
const privateFavoriteBtn = document.getElementById('privateFavoriteBtn');
const closeFavoriteModalBtn = document.getElementById('closeFavoriteModalBtn');
const isPublicInput = document.getElementById('isPublic'); // hidden input 요소 가져오기

if (closeFavoriteModalBtn) {
	closeFavoriteModalBtn.addEventListener('click', () => favoriteModal.style.display = 'none');
}
if (publicFavoriteBtn) {
	publicFavoriteBtn.addEventListener('click', () => {
		isPublicInput.value = 'true'; // public 버튼 클릭 시 hidden input 값 설정
		addBookmark();
	});
}
if (privateFavoriteBtn) {
	privateFavoriteBtn.addEventListener('click', () => {
		isPublicInput.value = 'false'; // private 버튼 클릭 시 hidden input 값 설정
		addBookmark();
	});
}

function addBookmark() {
	console.log("restNo:", restNo);
	console.log("memberNo:", memberNo);
	console.log("isPublic from input:", isPublicInput.value); // hidden input 값 확인

	fetch('/mypage/bookmark/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify({ mem_no: memberNo, rest_no: restNo, is_public: isPublicInput.value })
	})
	.then(response => response.json())
	.then(data => {
		console.log("서버 응답:", data);
		document.querySelectorAll('.bookmark').forEach(btn => {
			const targetRestNo = btn.closest('.booking-info').querySelector('#restNo').value;
			if (targetRestNo === restNo) {
				btn.classList.remove('active');
				btn.classList.add('bookmarked');
			}
		});
		location.reload();
	})
	.catch(error => console.error("에러 발생:", error));
}
//-----예약 취소 함수--------------------------------------
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
function checkMemo() {
	const checkMemo=/^.{0,45}$/;
	if (!checkMemo.test(memo)) {
		alert("45자 미만으로 작성");
		return;
	}else{
		openSaveMemoModal();
	}
}
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

//버튼위치마다 모달 창이 옆에 뜨게끔 하는 js
function showModalToLeft(modalSelector, triggerBtn) {
	  const modal = document.querySelector(modalSelector);
	  if (!modal) return;

	  const rect = triggerBtn.getBoundingClientRect();
	  modal.style.top = `${rect.top + window.scrollY}px`;
	  modal.style.left = `${rect.left + window.scrollX - modal.offsetWidth - 8}px`; // 왼쪽에 띄움
	  modal.style.display = 'block';
	}

	document.addEventListener('DOMContentLoaded', function () {
	  // 모달 닫기 함수
	  function hideAllModals() {
	    document.querySelectorAll('.modal-popup').forEach(modal => {
	      modal.style.display = 'none';
	    });
	  }

	  // 예약취소 버튼
	  document.querySelectorAll('#bookingCancelBtn').forEach(btn => {
	    btn.addEventListener('click', function (e) {
	      e.preventDefault();
	      hideAllModals();
	      showModalToLeft('.booking-cancel-modal', this);
	    });
	  });

	  // 즐겨찾기 버튼
	  document.querySelectorAll('#bookmarkBtn').forEach(btn => {
	    btn.addEventListener('click', function (e) {
	      e.preventDefault();
	      hideAllModals();
	      const isBookmarked = this.classList.contains('bookmarked');
	      const modalClass = isBookmarked ? '.bookmark-check-modal' : '.bookmark-add-modal';
	      showModalToLeft(modalClass, this);
	    });
	  });

	  // 메모 저장 버튼
	  document.querySelectorAll('#saveMemoBtn').forEach(btn => {
	    btn.addEventListener('click', function (e) {
	      e.preventDefault();
	      hideAllModals();
	      showModalToLeft('.save-memo-modal', this);
	    });
	  });

	  // 모달 외부 클릭 시 닫기
	  document.addEventListener('click', function (e) {
	    const isModalClick = e.target.closest('.modal-popup');
	    const isTrigger = e.target.closest('#bookingCancelBtn, #bookmarkBtn, #saveMemoBtn');
	    if (!isModalClick && !isTrigger) {
	      hideAllModals();
	    }
	  });

	  // 아니오 버튼 닫기 처리
	  document.querySelectorAll('#cancelModalBtn').forEach(btn => {
	    btn.addEventListener('click', () => {
	      hideAllModals();
	    });
	  });
	});
	//사이드 탭 클릭 후 active 유지
	window.addEventListener('DOMContentLoaded', () => {

		  const links = document.querySelectorAll('.side li a');
		  const currentPath = window.location.pathname.replace(/\/$/, '').toLowerCase();

		  links.forEach(link => {
		    const href = link.getAttribute('href');
		    const absoluteHref = new URL(href, window.location.origin).pathname.replace(/\/$/, '').toLowerCase();

		    if (currentPath === absoluteHref) {
		      link.classList.add('active');
		    }
		  });
		});
