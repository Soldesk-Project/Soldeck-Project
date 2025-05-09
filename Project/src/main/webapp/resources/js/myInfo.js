//-----CSS 파일 추가-----------------------------------------
const CSS_FILE_PATH = '/resources/css/myInfo.css';
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
window.onload = () => {
	  const mnoInput = document.querySelector('input[name="mno"]');
	  
	  if (!mnoInput) {
	    console.error("mno input 요소를 찾을 수 없습니다.");
	    return;
	  }

	  const mem_no = mnoInput.value;

	  document.querySelectorAll('button').forEach(btn => {
	    btn.addEventListener('click', () => {
	      const type = btn.getAttribute("id");

	      if (type === 'modifyBtn') {
	        location.href = '/mypage/modifyInfo?mem_no=' + mem_no;
	      }
	    });
	  });
	};


