//-----CSS 파일 추가-----------------------------------------
const CSS_FILE_PATH = '/resources/css/sideMenu.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);

//-----사이드메뉴 클릭-------------------------------------------
//let aEles=document.querySelectorAll("tbody a");
//aEles.forEach(a=>{
//	a.addEventListener('click',e=>{
//		let menu=a.getAttribute('href');
//		location.href='/mypage/'+menu;
//	});
//});
