document.addEventListener('DOMContentLoaded', function() {
    const majorCategoryButtons = document.querySelectorAll('.major-category-button');
    const contentArea = document.getElementById('communityContent');
    
    majorCategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const major = this.dataset.major;
            let url = '';

            switch (major) {
                case 'friend':
                    url = '/friendlist/main';
                    break;
                case 'group':
                    url = '/grouplist/main';
                    break;
                case 'chat':
                    url = '/chat/main';
                    break;
                case 'event':
                    url = '/event/eventMain';
                    break;
                case 'minigame':
                	url = '/event/eventMain';
                    break;
            }

            if (url) {
                // AJAX 요청을 통해 해당 URL의 내용을 가져와 contentArea에 삽입
                fetch(url)
                    .then(response => response.text())
                    .then(data => {
                        contentArea.innerHTML = data;
                        // 필요한 경우 추가적인 JavaScript 로직 처리 (예: 이벤트 바인딩)
                    })
                    .catch(error => {
                        console.error('콘텐츠 로딩 실패:', error);
                        contentArea.innerHTML = '<p>콘텐츠를 로드하는 데 실패했습니다.</p>';
                    });
            }

            // 클릭된 버튼을 활성화하고 다른 버튼 비활성화
            majorCategoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 팝업 처리
    var popup = document.getElementById('popup');
    var closeBtn = document.getElementById('popup-close');

    setTimeout(function() {
        popup.style.display = 'block';
    }, 1000);

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });
});