//-----CSS 파일 추가-----------------------------------------
const CSS_FILE_PATH = '/resources/css/review.css';
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
//-----버튼 클릭 이벤트----------------------------------------------
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    let type = btn.getAttribute("id");

    if(type == 'removeBtn'){
        openModal();
    }else if(type=='deleteCommentBtn'){
    	removeReview();
    	closeModal();
    }else if(type=='cancelModalBtn'){
    	closeModal();;
    }
  });
});
//-----즐겨찾기 삭제 확인 모달-------------------------------------------
const modal = document.querySelector('.delete-comment-modal');
const innerModal = document.querySelector('.inner-modal');

function openModal(){
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}
//모달 밖 아무곳이나 눌렀을 때 창 닫히기
modal.addEventListener('click', function (e) {
	if (!innerModal.contains(e.target)) {
		closeModal();
	  }
});
//ESC눌렀을 때 창 닫히기 
document.addEventListener('keydown', function (e) {
	  // ESC 키 눌렀을 때
	  if (e.key === 'Escape') {
	    closeModal(); // 기존 닫기 함수 호출
	  }
	});

//-----버튼 누를 때 댓글 번호 가져오기 ------------------------------
function hideAllModals() {
	document.querySelectorAll('.delete-comment-modal').forEach(modal => {
		modal.style.display = 'none';
	});
}

function showModalToLeft(modalSelector, triggerBtn) {
	const modal = document.querySelector(modalSelector);
	if (!modal) return;

	const innerModal = modal.querySelector('.inner-modal');
	if (!innerModal) return;

	const rect = triggerBtn.getBoundingClientRect();
	innerModal.style.top = `${rect.top + window.scrollY}px`;
	innerModal.style.left = `${rect.left + window.scrollX - innerModal.offsetWidth - 8}px`;

	modal.style.display = 'block';
}

document.querySelectorAll('.remove-btn').forEach(removeBtn => {
	removeBtn.addEventListener('click', function (e) {
		e.preventDefault();

		// 댓글 번호 가져오기
		comNo = this.closest(".appraisal-div").querySelector(".com-no").value;

		// 모달 표시 및 위치 설정
		hideAllModals();
		showModalToLeft('.delete-comment-modal', this);
	});
});

let memNo=document.querySelector(".mem-no").value;
//-----댓글 링크 이동 ------------------------------
let restNo;
document.querySelectorAll(".rest-review-info").forEach(moveView => {
	moveView.addEventListener('click',e=>{
		e.preventDefault();
		restNo=moveView.closest(".rest-info").querySelector(".rest-no").value;	
		comNo=moveView.closest(".review-content").querySelector(".com-no").value;	
		location.href='/search/view?rest_no='+restNo+'#comment-'+comNo;
		window.addEventListener('load', () => {
			const target = document.getElementById('comment-' + comNo);
			if (target) {
				target.scrollIntoView({ behavior: 'smooth' });
			}
	    });
	});
})
//-----리뷰 삭제 함수---------------------------------------------------
function removeReview() {
	console.log(comNo);
	console.log(memNo);
	fetch('/mypage/review/del', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json; charset=utf-8'
		  },
		  body: JSON.stringify({com_no: comNo, mem_no: memNo})
		})
		  .then(response => response.json())
		  .then(data=>{
		  	console.log(data);
		  	location.reload();
		  })
		  .catch(e=>console.log(e));
}
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