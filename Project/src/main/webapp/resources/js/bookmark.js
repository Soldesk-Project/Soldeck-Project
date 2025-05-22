////-----CSS 파일 추가-----------------------------------------
const cssFiles = ['/resources/css/bookmark.css', '/resources/css/header.css', '/resources/css/footer.css', '/resources/css/common.css'];
cssFiles.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = path;
    document.head.appendChild(link);
});

//----- 전역변수 ----------------
let restNo = 0;
let isPublic = '';
const memberNo = document.getElementById('login-data').dataset.mem_no || '';
const modal = document.querySelector('.bookmark-check-modal');
let currentRegion = '';

//----- 공통 함수 ----------------
function allViews() {
    document.querySelectorAll('.view').forEach(view => {
        view.style.display = '';
    });
}

function clearBtn() {
    document.querySelectorAll('.btn, #all').forEach(btn => btn.classList.remove('active'));
}

function resizeInput(input) {
	const size = input.nextElementSibling;
	size.textContent = input.value;
	size.style.font = window.getComputedStyle(input).font;
	input.style.width = size.offsetWidth + 'px';
}

function openModal(relativeToButton) {
	  const modal = document.querySelector('.bookmark-check-modal');

	  if (modal.style.display === 'block') {
	    closeModal(); // 이미 열려 있으면 닫기
	    return;
	  }

	  modal.style.visibility = 'hidden';
	  modal.style.display = 'block';

	  const rect = relativeToButton.getBoundingClientRect();
	  const modalHeight = modal.offsetHeight;

	  // 2. 위치 계산: 버튼 오른쪽 + 약간의 간격
	  const top = window.scrollY + rect.top;
	  const left = window.scrollX + rect.right + 10; // 버튼 오른쪽 + 10px 여유

	  modal.style.top = `${top}px`;
	  modal.style.left = `${left}px`;

	  modal.style.visibility = 'visible';
	  document.body.style.overflow = 'hidden';
	}

function closeModal(){
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  restNo=0;
}

//----- 즐겨찾기 목록 비동기 로드 ------------------------
function fetchBookmarkList() {
    fetch('/mypage/getBookmark')
        .then(response => {
            if (response.status === 401) throw new Error('Unauthorized');
            return response.json();
        })
        .then(renderBookmarks)
        .catch(error => console.error('Error fetching bookmarks:', error));
}

function renderBookmarks(data) {
    const publicContainer = document.getElementById('public-bookmarks');
    const privateContainer = document.getElementById('private-bookmarks');
    publicContainer.innerHTML = '';
    privateContainer.innerHTML = '';

    data.forEach(bm => {
        const container = bm.is_public === 'Y' ? publicContainer : privateContainer;
        const view = document.createElement('div');
        view.className = 'view';
        view.dataset.adr = bm.rest_loc;
        
        const imgListHTML = bm.rest.map(rest => {
            let rawUrl = rest.rest_img_name || '';
            let thumbnailUrl = rawUrl;

            if (rawUrl.includes('cthumb')) {
                thumbnailUrl = rawUrl.replace(/C\d+x\d+\.q\d+/, 'C200x200.q60');
            }

            return `
                <div class="view-img">
                    <img alt="res img" src="${thumbnailUrl}" class="view-res-image" onerror="this.src='/resources/images/noImage.png';">
                </div>
            `;
        }).join('');
        
        view.innerHTML = `
            <div class="view-info">
                <div><button type="button" class="bookmark">★</button></div>
                <div class="info-text">
                    <a href="#" draggable="false">
                        <input type="text" class="res-name" value="${bm.rest_name}" readonly>
                        <span class="input-size"></span>
                    </a>
                    <input type="text" class="res-cate" value="${bm.rest_cate}" readonly>
                    <input type="hidden" id="restNo" value="${bm.rest_no}">
                    <input type="hidden" class="is-public" value="${bm.is_public}">
                    <input type="hidden" class="rest-adr" value="${bm.rest_loc}">
                </div>
            </div>
            <div class="view-img-list">${imgListHTML}</div>
        `;
        container.appendChild(view);
        resizeInput(view.querySelector('.res-name'));
    });

    if (currentRegion) {
        const views = document.querySelectorAll('.view');
        views.forEach(view => {
            view.style.display = (view.dataset.adr === currentRegion) ? '' : 'none';
        });
        document.querySelector(`.btn[value="${currentRegion}"]`).classList.add('active');
    } else {
        allViews();
        document.getElementById('all').classList.add('active');
    }
}

//----- 즐겨찾기 삭제 -------------------------------------------------
function outBookmark() {
    if (!restNo) return;
    
    fetch(`/mypage/favorites/remove/${restNo}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mem_no: memberNo, rest_no: restNo })
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
        	fetchBookmarkList();
            closeModal();
        }
    })
    .catch(error => console.error('Error deleting bookmark:', error));
}

//----- 즐겨찾기 공개/비공개 전환 ------------------
function updateBookmarkVisibility(toPublic) {
    if (!restNo) return alert('가게가 선택되지 않았습니다');

    if ((toPublic && isPublic === 'Y') || (!toPublic && isPublic === 'N')) {
        alert(toPublic ? '이미 공개 즐겨찾기입니다' : '이미 비공개 즐겨찾기입니다');
        return;
    }

    const url = toPublic ? '/mypage/bookmark/public' : '/mypage/bookmark/private';

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mem_no: memberNo, rest_no: restNo })
    })
    .then(res => res.json())
    .then(success => {
        if (success) fetchBookmarkList();
    })
    .catch(err => console.error('Error updating bookmark:', err));
}

//----- 이벤트 바인딩 ------------------------------
document.addEventListener('DOMContentLoaded', () => {
	fetchBookmarkList();
	
    const allBtn = document.getElementById('all');
    const filterBtns = document.querySelectorAll('.btn');

    // 전체 버튼 이벤트
    allBtn.addEventListener('click', () => {
        clearBtn();
        allBtn.classList.add('active');
        allViews();
        currentRegion = '';
    });

    // 지역 버튼 이벤트
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const views = document.querySelectorAll('.view'); // 동적으로 views 갱신
            if (this.classList.contains('active')) {
                clearBtn();
                allBtn.classList.add('active');
                allViews();
                currentRegion = '';
                return;
            }
            clearBtn();
            this.classList.add('active');
            currentRegion = this.value;
            views.forEach(view => {
                view.style.display = (view.dataset.adr === this.value) ? '' : 'none';
            });
        });
    });
    
    //-----버튼 클릭 이벤트---------------------------------------------
    document.querySelector('.bookmark-list').addEventListener('click', (e) => {
        const target = e.target;
        const view = target.closest('.view');

        if (!view) return;

        const newRestNo = view.querySelector('#restNo').value;
        const newIsPublic = view.querySelector('.is-public').value;

        // 북마크 삭제 모달, 가게 이름 클릭 이동
        if (target.classList.contains('bookmark')) {
            e.preventDefault();
<<<<<<< Updated upstream
            restNo = newRestNo;
            isPublic = newIsPublic;
            openModal();
=======
            openModal(target);
>>>>>>> Stashed changes
        } else if (target.closest('.info-text a')) {
            e.preventDefault();
            if (!newRestNo) {
                alert('유효한 가게를 선택하세요');
                return;
            }
            location.href = `../search/view?rest_no=${newRestNo}`;
        } else {
            if (restNo === newRestNo) {
                // 이미 선택된 가게면 해제
                restNo = 0;
                isPublic = '';
                document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            } else {
                // 새 가게 선택
                restNo = newRestNo;
                isPublic = newIsPublic;
                document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
                view.classList.add('active');
            }
        }
    });
    
    // 모달 버튼 이벤트
    document.getElementById('outBookMarkBtn').addEventListener('click', outBookmark);
    document.getElementById('cancelModalBtn').addEventListener('click', closeModal);

    // 공개/비공개 전환 버튼
    document.getElementById('leftBtn').addEventListener('click', () => updateBookmarkVisibility(true));
    document.getElementById('rightBtn').addEventListener('click', () => updateBookmarkVisibility(false));
    
    // 사이드바 탭 active 유지
    const currentPath = window.location.pathname.replace(/\/$/, '').toLowerCase();
    document.querySelectorAll('.side li a').forEach(link => {
        const href = new URL(link.href).pathname.replace(/\/$/, '').toLowerCase();
        if (href === currentPath) link.classList.add('active');
    });
});
