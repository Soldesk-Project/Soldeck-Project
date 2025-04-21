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
//-----가게 이름 이동------------------------------------------
let a=document.querySelector(".info-text a");
a.addEventListener('click',e=>{
	e.preventDefault();
	location.href="../search/view";
})
//-----가게 이름 글자수에 맞게 input태그 길이 변경---------------------
const input = document.querySelector('.res-name');
const size = document.getElementById('input-size');

function inputSize() {
  size.textContent = input.value;
  input.style.width = size.offsetWidth + 30 + 'px';
}
inputSize();

