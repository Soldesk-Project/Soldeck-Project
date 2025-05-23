document.addEventListener('DOMContentLoaded', function () {
    const majorCategoryButtons = document.querySelectorAll('.major-category-button');
    const contentArea = document.getElementById('communityContent');
    const scriptMap = {
        friend: '/resources/js/friendList.js',
        group: '/resources/js/groupList.js',
        event: '/resources/js/mainEvent.js',
        minigame: '/resources/js/mainEvent.js'
    };
    function loadContent(category) {
        const jsPath = scriptMap[category];
        const contentUrl = "/community/content?url=" + category;
        fetch(contentUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.text();
            })
            .then(data => {
                contentArea.innerHTML = data;
                removeDynamicScripts();
                loadScript(jsPath);
            })
            .catch(error => {
                console.error('콘텐츠 로딩 실패:', error);
                contentArea.innerHTML = '<p>콘텐츠를 로드하는 데 실패했습니다.</p>';
            });
    }
    function removeDynamicScripts() {
        const dynamicScripts = document.querySelectorAll('script[data-dynamic="true"]');
        dynamicScripts.forEach(script => script.parentNode.removeChild(script));
    }
    function loadScript(jsPath) {
        if (!jsPath) return;
        const script = document.createElement('script');
        script.src = jsPath;
        script.setAttribute('data-dynamic', 'true'); // 식별용
        script.onload = () => {
            // jsPath에 따라 초기화 함수 호출
            if (jsPath.includes('friendList.js') && typeof initFriendList === 'function') {
                initFriendList();
            } else if (jsPath.includes('groupList.js') && typeof initGroupList === 'function') {
                initGroupList();
            } else if (jsPath.includes('mainEvent.js') && typeof initMainEvent === 'function') {
                initMainEvent();
            } else if (jsPath.includes('minigame.js') && typeof initMinigame === 'function') {
                initMinigame();
            }
        };
        document.body.appendChild(script);
    }
    majorCategoryButtons.forEach(button => {
        button.addEventListener('click', function () {
        	const category = this.dataset.major;
            if (!scriptMap.hasOwnProperty(category)) {
                return;
            }
            loadContent(category);
            // 버튼 UI 상태 업데이트
            majorCategoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    // 기본 버튼 자동 클릭 (없으면 첫 번째 버튼 fallback)
    const defaultButton = document.querySelector('.major-category-button.active')
                       || document.querySelector('.major-category-button');
    if (defaultButton) {
        defaultButton.click();
    }
});




const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const page = urlParams.get('page');

document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
    if (page != null) {
        const btn = document.querySelector('.major-category-button[data-major="event"]');
        if (btn) {
            btn.click();
        }

        setTimeout(() => {
            let links = document.querySelectorAll('.main-menu a');
            let found = false;
            for (let link of links) {
                if (link.getAttribute('href') === '/list/' + page || link.href.endsWith('/list/' + page)) {
                    link.click();
                    found = true;
                    break;
                }
            }
        }, 200);
    	}
	}, 200);
	history.replaceState({}, '', window.location.pathname);	
});


