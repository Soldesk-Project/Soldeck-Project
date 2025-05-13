document.addEventListener('DOMContentLoaded', function () {
    const majorCategoryButtons = document.querySelectorAll('.major-category-button');
    const contentArea = document.getElementById('communityContent');

    majorCategoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const major = this.dataset.major;
            let jsPath = '';
            let urlKey = '';

            console.log('Selected category:', major); // 선택된 카테고리 로그

            switch (major) {
                case 'friend':
                    urlKey = 'friend';
                    jsPath = '/resources/js/friendList.js';
                    break;
                case 'group':
                    urlKey = 'group';
                    jsPath = '/resources/js/groupList.js';
                    break;
                case 'chat':
                    urlKey = 'chat';
                    jsPath = '/resources/js/chatroom.js';
                    break;
                case 'event':
                    urlKey = 'event';
                    jsPath = '/resources/js/mainEvent.js';
                    break;
                case 'minigame':
                    urlKey = 'minigame';
                    jsPath = '/resources/js/minigame.js';
                    break;
                default:
                    console.error('Unknown category:', major);
                    return;
            }

            // 서버에서 JSP 조각을 가져와서 communityContent에 삽입
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

            // 버튼 UI 처리
            majorCategoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 페이지 로딩 시 기본 카테고리(친구) 자동 클릭
    const defaultButton = document.querySelector('.major-category-button.active');
    if (defaultButton) {
        defaultButton.click();
    }
});
