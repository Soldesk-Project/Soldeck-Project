document.addEventListener('DOMContentLoaded', function() {
    const majorCategoryButtons = document.querySelectorAll('.major-category-button');
    const minorCategoryArea = document.querySelector('.community-minor-category-area');
    const minorCategoryButtonsContainer = document.querySelector('.minor-category-buttons');
    const communityMajorCategoryArea = document.querySelector('.community-major-category-area');
    const searchButton = document.querySelector('.community-search-inline .search-area button');
    var popup = document.getElementById('popup');
    var closeBtn = document.getElementById('popup-close');

    // 대분류 버튼 클릭 이벤트 처리
    majorCategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 활성화된 대분류 버튼 스타일 변경
            majorCategoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const selectedMajor = this.dataset.major;

            // 소분류 영역 초기화 및 표시
            minorCategoryButtonsContainer.innerHTML = '';

            const minorCategories = getMinorCategories(selectedMajor);
            if (minorCategories && minorCategories.length > 0) {
                minorCategories.forEach(minor => {
                    const minorButton = document.createElement('button');
                    minorButton.textContent = minor.name;
                    minorButton.dataset.minor = minor.code;
                    minorButton.addEventListener('click', function() {
                        // TODO: 선택된 소분류에 따른 게시글 목록 업데이트 로직
                        console.log('선택된 소분류:', this.dataset.minor);
                    });
                    minorCategoryButtonsContainer.appendChild(minorButton);
                });
                minorCategoryArea.style.display = 'block';
                communityMajorCategoryArea.style.paddingBottom = '15px'; // community-top-area 확장
            } else {
                minorCategoryArea.style.display = 'none';
                communityMajorCategoryArea.style.paddingBottom = '15px'; // 소분류 없을 때도 유지 (선택 사항)
            }

            // TODO: 선택된 대분류에 따른 게시글 목록 업데이트 (초기 로딩)
            console.log('선택된 대분류:', selectedMajor);
            // updatePostList(selectedMajor, '');
        });
    });

    // 검색 버튼 이벤트 처리 (기존 로직 유지)
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchInput = document.querySelector('.community-search-inline .search-area input[type="text"]');
            if (searchInput) {
                const searchTerm = searchInput.value;
                console.log('검색어:', searchTerm);
                // TODO: 검색어를 이용하여 게시글을 검색하는 로직 추가
            }
        });
    }

    // 임시 소분류 데이터 생성 함수 (실제 서버 통신으로 대체)
    function getMinorCategories(majorCode) {
        switch (majorCode) {
            case 'major1':
                return [{ code: 'minor1-1', name: '소분류 1-1' }, { code: 'minor1-2', name: '소분류 1-2' }];
            case 'major2':
                return [{ code: 'minor2-1', name: '소분류 2-1' }, { code: 'minor2-2', name: '소분류 2-2' }, { code: 'minor2-3', name: '소분류 2-3' }];
            default:
                return [];
        }
    }

    // TODO: 게시글 목록 업데이트 함수 (AJAX 요청 및 화면 갱신 로직)
    // function updatePostList(major, minor) {
    //     console.log('게시글 목록 업데이트 요청:', major, minor);
    //     // 서버에 데이터를 요청하고 응답을 받아 post-list 영역을 업데이트하는 로직 구현
    // }
 // 좋아요 순 게시글 링크 클릭 이벤트
if (popularPostsLink) {
    popularPostsLink.addEventListener('click', function() {
        window.location.href = '/community/communityList?mode=best';
    });
}

// 커뮤니티 게시글 목록 링크 클릭 이벤트
if (communityListLink) {
    communityListLink.addEventListener('click', function() {
        window.location.href = '/community/communityList';
    });
}

    // 팝업 표시 (예시: 페이지 로드 후 1초 뒤에 표시)
    setTimeout(function() {
        popup.style.display = 'block'; // 'flex' 대신 'block' 사용
    }, 1000);

    // 팝업 닫기
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });
});