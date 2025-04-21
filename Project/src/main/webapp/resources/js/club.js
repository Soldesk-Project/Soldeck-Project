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
    }else if(type == 'createBtn'){
      createClub();
    }else if(type == 'bookmarkBtn'){
      bookmark(btn);
    }else if(type == 'saveMemoBtn'){
      saveMemo(btn);
    }
  });
});

//-----메모 저장----------------------------------
function saveMemo(btn){
	const idx = btn.dataset.idx;
  const memoArea = document.querySelector(`.memo-area[data-idx="${idx}"]`);
  const memo=memoArea.value;
  localStorage.setItem('memo'+idx, memo);
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.memo-area').forEach((area, idx) => {
    area.dataset.idx = idx;
  });
  document.querySelectorAll('.memo-btn').forEach((btn, idx) => {
    btn.dataset.idx = idx;
  });

  // 저장된 메모 불러오기
  document.querySelectorAll('.memo-area').forEach((area, idx) => {
    const saveMemo = localStorage.getItem('memo' + idx);
    area.value = saveMemo ? saveMemo : "메모";
  });
});

//-----즐겨찾기 버튼-------------------------------------------
function bookmark(btn){
  if (!btn.classList.contains('active')) {
    if (confirm("즐겨찾기를 해제하시겠습니까?")) {
      btn.classList.add('active');
      // 서버로 즐겨찾기 해제 요청
    }
  } else {
    if (confirm("즐겨찾기로 등록하시겠습니까?")) {
      btn.classList.remove('active');
      // 서버로 즐겨찾기 등록 요청
    }
  }
}

// 모달 관련 스크립트
const modal = document.querySelector('#modal');
const clubTilte = document.querySelector("input[name='club-title']");
const clubDesc = document.querySelector("textarea[name='club-desc']");
const minAge = document.querySelector("input[name='min-age']");
const maxAge = document.querySelector("input[name='max-age']");
const isPublic = document.querySelector(".public-checkbox").checked ? 'Y' : 'N';

function openModal(){
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

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
      window.location.href = result.redirect;
    })
    .catch(err => console.log(err));
}






