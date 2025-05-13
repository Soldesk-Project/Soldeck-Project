//-----CSS 파일 추가-----------------------------------------
const CSS_FILE_PATH = '/resources/css/mainEvent.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);

//-----이벤트 클릭 이동-------------------------------------------
//document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll(".main-menu a").forEach(event=>{
		event.addEventListener('click', e=>{
			e.preventDefault();
			const contentArea = document.getElementById('communityContent');
			let tab=event.getAttribute('href');
	//		location.href='/event'+tab;
			
			let jsPath = '';
	        let urlKey = '';
	        
	        switch (tab) {
	        case '/list/0001':
	            urlKey = '0001';
	            jsPath = '/resources/js/eventTab/0001.js';
	            break;
	        case '/list/0002':
	            urlKey = '0002';
	            jsPath = '/resources/js/eventTab/0002.js';
	            break;
	        case '/list/0003':
	            urlKey = '0003';
	            jsPath = '/resources/js/eventTab/0003.js';
	            break;
	        case '/list/0004':
	            urlKey = '0004';
	            jsPath = '/resources/js/eventTab/0004.js';
	            break;
	        default:
	            console.error('Unknown category:', tab);
	            return;
	    }
			
			
			fetch("/community/content?url=" + urlKey)
	        .then(response => {
	            if (!response.ok) {
	                throw new Error("HTTP error " + response.status);
	            }
	            return response.text();
	        })
	        .then(data => {
	            contentArea.innerHTML = data;
	
	            // JS 파일 로드
	            if (jsPath) {
	                const script = document.createElement('script');
	                script.src = jsPath;
	                script.onload = () => console.log(jsPath + ' 로드 완료');
	                document.body.appendChild(script);
	            }
	        })
	        .catch(error => {
	            console.error('콘텐츠 로딩 실패:', error);
	            contentArea.innerHTML = '<p>콘텐츠를 로드하는 데 실패했습니다.</p>';
	        });
			
		})
	})
//});