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
//-----즐겨찾기 버튼-------------------------------------------
let bookmarkBtn=document.querySelectorAll(".bookmark");
bookmarkBtn.forEach(btn=>{
	btn.addEventListener('click',function(){
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
	})
})
// 모달 관련 스크립트
const modal = document.querySelector('#modal');
const clubTilte = document.querySelector("input[name='club-title']");
const clubDesc = document.querySelector("textarea[name='club-desc']");
// 버튼 클릭 이벤트
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    let type = btn.getAttribute("id");

    if(type == 'createClubBtn'){
      openModal();
    }else if(type == 'closeModalBtn'){
      closeModal();
    }else if(type == 'createBtn'){
      createClub();
    }
  });
});

function openModal(){
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function createClub(){
  if(!clubTilte.value){
    alert("모임 이름을 입력해 주세요");
    return;
  }

  if(!clubDesc.value){
    alert("모임 소개를 입력해 주세요");
    return;
  }
}
//-----메모 저장----------------------------------
let saveMemoBtn=document.querySelectorAll(".memo-btn");
saveMemoBtn.forEach((btn,idx)=>{
	btn.addEventListener('click',()=>{
		const memoArea = btn.closest('div').querySelector('.memo-area');
		const memo=memoArea.value;
		localStorage.setItem('memo'+idx, memo);
		console.log('수정됨');
	})
})
window.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.memo-area').forEach((area, idx) => {
		const saveMemo=localStorage.getItem('memo'+idx);
		area.value=saveMemo?saveMemo:"메모";
	});
});






