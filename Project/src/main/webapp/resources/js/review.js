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
function openModal(){
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

//-----버튼 누를 때 댓글 번호 가져오기 ------------------------------
let comNo;
document.querySelectorAll(".remove-btn").forEach(removeBtn => {
	removeBtn.addEventListener('click',e=>{
		e.preventDefault();
		comNo = removeBtn.closest(".appraisal-div").querySelector(".com-no").value;
	});
})
let memNo=document.querySelector(".mem-no").value;
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