//-----CSS 파일 추가-----------------------------------------
const CSS_FILE_PATH = '/resources/css/mypageEvent.css';
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
//-----사이드 탭 클릭 후 active 유지--------------------------------------------
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
//-----내 포인트--------------------------------------------
function loadMyPointData() {
	fetch('/event/list/point')
	.then(response => response.json())
	.then(data => {
		const container = document.querySelector(".my-point-div");
		let myPoint = '';
		if (data.point>=0 ){
			myPoint= `
			<p>현재 내 포인트 : <span class="my-point" data-my-Point="${data.point }">${data.point }</span></p>
			`;
		}
		container.innerHTML=myPoint;
	})
	.catch(error => console.error("포인트  로드 실패:", error));
}
window.addEventListener('DOMContentLoaded', () => {
    loadMyPointData();
});
//-----제품 응모 포인트 차감--------------------------------------------
document.querySelectorAll('.point-btn').forEach(btn=>{
	btn.addEventListener('click',()=>{
		let product=btn.dataset.product;
		let point=Number(btn.dataset.point);
		let myPoint=document.querySelector('.my-point').dataset.myPoint;
		//기능 구현 없이 따로 포인트가 차감되는 것만 구현
		if(myPoint>point){
			fetch('/event/savePoint',{
				method : 'post',
				headers : {
					'content-type' : 'application/json; charset=utf-8'
				},
				body : JSON.stringify({point: -point})
			})
			.then(response => response.json())
			.then(result => {
				openModal(product);
				loadMyPointData();
			})
			.catch(err => console.log(err));
		}else{
			alert('포인트가 부족합니다');
			return;
		}
	})
})
//-----모달 관련-------------------------------------------------------------
const modal = document.querySelector('.result-modal');
const instructions =document.querySelector('.modal-instructions');

function openModal(check) {
	let p=`<p>${check} 제품에 응모하였습니다!</p>`;
	instructions.innerHTML=p;	
	modal.style.display = 'block';
	document.body.style.overflow = 'hidden';

}	
function closeModal(){
	modal.style.display = 'none';
	document.body.style.overflow = 'auto';
}
document.querySelector('#closeModalBtn').addEventListener('click',()=>{
	closeModal();
});








