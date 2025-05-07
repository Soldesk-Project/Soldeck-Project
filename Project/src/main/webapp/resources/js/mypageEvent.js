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



