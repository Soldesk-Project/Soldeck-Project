
//(function() {
//	
//	const CSS_FILE_PATH = '/resources/css/mainEvent.css';
//	let linkEle = document.createElement('link');
//	linkEle.rel = 'stylesheet';
//	linkEle.href = CSS_FILE_PATH;
//	document.head.appendChild(linkEle);
//})();
//-----이벤트 클릭 이동-------------------------------------------
document.querySelectorAll(".main-menu a").forEach(event=>{
	event.addEventListener('click', e=>{
		e.preventDefault();
		const contentArea = document.getElementById('communityContent');
		let tab=event.getAttribute('href');
		
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
				if (!document.querySelector(`script[src="${jsPath}"]`)) {
					const script = document.createElement('script');
					script.src = jsPath;
					script.setAttribute('data-dynamic', 'true');
					document.body.appendChild(script);
				} else {
					deleteScript();
					const script = document.createElement('script');
					script.src = jsPath;
					script.setAttribute('data-dynamic', 'true');
					document.body.appendChild(script);
				}
			}
		})
		.catch(error => {
			console.error('콘텐츠 로딩 실패:', error);
			contentArea.innerHTML = '<p>콘텐츠를 로드하는 데 실패했습니다.</p>';
		});
		
	})
})
function deleteScript() {
	
	const dynamicScripts = document.querySelectorAll('script[data-dynamic="true"]');
    dynamicScripts.forEach(script => script.parentNode.removeChild(script));
//	const scriptPaths = [
//		'/resources/js/eventTab/0001.js',
//		'/resources/js/eventTab/0002.js',
//		'/resources/js/eventTab/0003.js',
//		'/resources/js/eventTab/0004.js'
//		];
//	scriptPaths.forEach(path => {
//		const scriptTag = document.querySelectorAll(`script[src="${path}"]`);
//		if (scriptTag && scriptTag.parentNode) {
//			scriptTag.parentNode.removeChild(scriptTag);
//		}
//	});
}