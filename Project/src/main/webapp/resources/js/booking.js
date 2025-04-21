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
const input = document.querySelector('.res-name');
const size = document.getElementById('input-size');

function inputSize() {
	size.textContent = input.value;
	input.style.width = size.offsetWidth + 30 + 'px';
}
inputSize();
//-----가게 이름 이동------------------------------------------
let a=document.querySelector(".info-text a");
a.addEventListener('click',e=>{
	e.preventDefault();
	location.href="../search/view";
})
//-----버튼들 클릭 이벤트-------------------------------------------
document.querySelectorAll("button").forEach(btn=>{
	btn.addEventListener('click',e=>{
		let type=btn.getAttribute('id');
		
		if(type=='bookingCancelBtn'){
			bookingCancel();
		}else if(type=='bookmarkBtn'){
			bookmark(btn);
		}else if(type=='saveMemoBtn'){
			saveMemo(btn);
		}
	});
});
//-----즐겨찾기 버튼--------------------------------------------
function bookmark(){
	if (!btn.classList.contains('active')) {
		// 즐겨찾기 on (default)
		if (confirm("즐겨찾기를 해제하시겠습니까?")) {
			this.classList.add('active');
			// 자바로 가게 번호 날려서 db에서 bookmark 테이블 update
		}
	} else {
		// 즐겨찾기 off
		if (confirm("즐겨찾기로 등록하시겠습니까?")) {
			this.classList.remove('active');
			// 자바로 가게 번호 날려서 db에서 bookmark 테이블 update
		}
	}
}
//-----메모 저장----------------------------------
function saveMemo(btn){
	const idx = btn.dataset.idx;
	const memoArea = document.querySelector(`.booking-memo[data-idx="${idx}"]`);
	const memo=memoArea.value;
	localStorage.setItem('bookingMemo'+idx, memo);
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.booking-memo').forEach((area, idx) => {
    area.dataset.idx = idx;
  });
  document.querySelectorAll('.booking-memo-btn').forEach((btn, idx) => {
    btn.dataset.idx = idx;
  });

  // 저장된 메모 불러오기
  document.querySelectorAll('.booking-memo').forEach((area, idx) => {
    const saveMemo = localStorage.getItem('bookingMemo' + idx);
    area.value = saveMemo ? saveMemo : "-----//";
  });
});
//-----예약 취소 함수--------
function bookingCancel() {
	console.log('예약 취소 버튼');
}













