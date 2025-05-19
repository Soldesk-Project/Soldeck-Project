// CSS 파일 추가
const CSS_FILE_PATH = '/resources/css/view.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);

// 전역 변수 정의
const loginData = document.getElementById('login-data');
const mem_no = loginData.dataset.mem_no || '';
let restNo = null;
let currentIndex = 0;
const visibleSlides = 4;
let selectedDate = null;
let selectedTime = null;
let selectedPersonnel = null;
let selectedMonth = new Date().getMonth() + 1; // 초기 월을 현재 월로 설정
let isFavorite = false; // 초기 즐겨찾기 상태
let favoriteBtnElement = null;
let ratingValue = 0;

// DOM 요소 참조 (중복 방지)
const reservationModal = document.getElementById('reservationModal');
const reservationBtn = document.getElementById('reservationBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const confirmReservationBtn = document.getElementById('confirmReservationBtn');
const commentBtn = document.querySelector("#commentBtn");
const monthSelect = document.getElementById('monthSelect');
const calendarDays = document.getElementById('calendarDays');
const favoriteModal = document.getElementById('favoriteModal');
const publicFavoriteBtn = document.getElementById('publicFavoriteBtn');
const privateFavoriteBtn = document.getElementById('privateFavoriteBtn');
const closeFavoriteModalBtn = document.getElementById('closeFavoriteModalBtn');
const imageWrapper = document.querySelector('.image-wrapper');
const images = imageWrapper.querySelectorAll('.image');
const panelbody = document.querySelector('.panel-body');
const moreBtn = panelbody.querySelector('.more-btn');
const modal = document.querySelector('.modal2');
const modalImageContainer = modal.querySelector('.modal-image-container');
const closeBtn = modal.querySelector('.close-btn');
// JSP에서 시간 슬롯 가져오기
const timeButtons = document.querySelectorAll('.time-options .time-btn');
const timeSlots = Array.from(timeButtons).map(button => button.textContent.trim());
const personnelButtons = document.querySelectorAll('.personnel-options .personnel-btn');
const stars = document.querySelectorAll('#starRating .star');

//별점 클릭 및 표시 업데이트
stars.forEach(star => {
    star.addEventListener('click', () => {
        ratingValue = parseInt(star.dataset.value);
        updateStars(ratingValue);
    });
});
function updateStars(rating) {
    stars.forEach(star => {
        const value = parseInt(star.dataset.value);
        star.classList.toggle('filled', value <= rating);
    });
}

//시간 및 인원 초기화
function resetTimeAndPersonnel() {
    selectedTime = null;
    selectedPersonnel = null;
    timeButtons.forEach(btn => {
        btn.classList.remove('selected', 'disabled');
        btn.disabled = false;
    });
    personnelButtons.forEach(btn => btn.classList.remove('selected'));
}

//모달 외부 클릭 시 닫기 헬퍼 함수
function addModalCloseHandler(modalElement) {
    modalElement.addEventListener('click', e => {
        if (e.target === modalElement) {
            modalElement.style.display = 'none';
        }
    });
}

// 문서 로드 후 이벤트 바인딩
document.addEventListener("DOMContentLoaded", function () {
	// page-header에서 restNo 가져오기
    const pageHeader = document.querySelector(".page-header");
    restNo = pageHeader ? pageHeader.dataset.rest_no : null;
    if (!restNo) {
        console.error("page-header 요소를 찾을 수 없습니다.");
    }

    showCommentsImage();

    // 중복 store-details 제거
    const storeDetailsElements = document.querySelectorAll('.store-details');
    storeDetailsElements.forEach((el, i) => i > 0 && el.remove());

    // 가게 정보 로딩
    if (restNo) {
        fetchStoreDetails();
    } else {
        console.error("restNo가 없으므로 fetchStoreDetails를 호출할 수 없습니다.");
        const storeDetails = document.querySelector('.store-details');
        if (storeDetails) {
            storeDetails.querySelector('table').innerHTML = '<tr><td colspan="2">가게 정보를 불러올 수 없습니다.</td></tr>';
        }
    }

    // 모달 관련 처리
    addModalCloseHandler(modal);
    addModalCloseHandler(reservationModal);
    addModalCloseHandler(favoriteModal);

    // 예약 관련 처리
    reservationBtn.addEventListener('click', () => {
        if (mem_no == 0) return alert("로그인을 해주세요.");
        reservationModal.style.display = 'flex';
        selectedMonth = new Date().getMonth() + 1;
        monthSelect && (monthSelect.value = selectedMonth);
        renderCalendar(selectedMonth);
    });
    
    closeModalBtn.addEventListener('click', () => {
        reservationModal.style.display = 'none';
        resetSelections();
    });
    
    monthSelect.addEventListener('change', (e) => {
        selectedMonth = parseInt(e.target.value);
        resetTimeAndPersonnel();
        renderCalendar(selectedMonth);
    });
    
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.disabled) return; // 비활성화된 버튼은 클릭 무시
            timeButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedTime = btn.textContent;
        });
    });
    
    const personnelButtons = document.querySelectorAll('.personnel-btn');
    personnelButtons.forEach(btn => {
    	btn.addEventListener('click', () => {
    		if (btn.disabled) return; // 비활성화된 버튼은 클릭 무시
    		personnelButtons.forEach(b => b.classList.remove('selected'));
    		btn.classList.add('selected');
    		selectedPersonnel = btn.textContent;
    	});
    });

    confirmReservationBtn.addEventListener('click', () => {
        if (!selectedDate || !selectedTime || !selectedMonth || !selectedPersonnel) {
            return alert('날짜와 시간, 인원을 선택해주세요.');
        }

        const resDate = `2025-${selectedMonth}-${selectedDate}`;
        if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(resDate)) {
            return alert('유효한 날짜 형식이 아닙니다.');
        }

        const reservationData = {
            rest_no: restNo,
            mem_no: mem_no,
            res_date: resDate,
            res_time: selectedTime,
            res_personnel: selectedPersonnel,
            res_memo: '예약 메모'
        };

        fetch('/search/reservations/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(reservationData)
        })
        .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err.message || '서버 오류')))
        .then(() => {
            alert(`예약이 완료되었습니다!\n날짜: 2025년 ${selectedMonth}월 ${selectedDate}일\n시간: ${selectedTime}\n인원 : ${selectedPersonnel}`);
            reservationModal.style.display = 'none';
            resetSelections();
            updateTimeSlots(restNo, resDate);
        })
        .catch(err => alert('예약 실패: ' + err));
    });
    
    // 버튼 관련 처리
    closeFavoriteModalBtn.addEventListener('click', () => favoriteModal.style.display = 'none');
    publicFavoriteBtn.addEventListener('click', () => addFavorite(true));
    privateFavoriteBtn.addEventListener('click', () => addFavorite(false));
    commentBtn.addEventListener('click', uploadComment);

    checkInitialFavoriteStatus(); // 초기 상태 확인
});

//가게 상세 정보 전역 변수
let store_name = '';
let store_latitude = '';
let store_longitude = '';
let menuLoaded = false;

// 가게 상세 정보 가져오기 및 렌더링
function fetchStoreDetails() {
    get(data => {
        renderStoreDetails(data);
        fetchComments();
        showViewList();
        showAvgRate();
        showCommentsImage();
        storeMenu();
        initMap(store_latitude, store_longitude, store_name);
    });
}

function renderStoreDetails(data) {
    const storeDetails = document.querySelector('.store-info');
    if (!storeDetails) return console.error('가게 상세 정보 컨테이너(.store-info)를 찾을 수 없습니다.');

    const storeData = Array.isArray(data) && data.length > 0 ? data[0] : data;
    if (!storeData || Object.keys(storeData).length === 0) {
        storeDetails.innerHTML = '<tr><td colspan="2">가게 정보를 찾을 수 없습니다.</td></tr>';
        return;
    }
    ({ rest_name: store_name,
       latitude: store_latitude,
       longitude: store_longitude } = storeData);
    
    storeDetails.innerHTML = `
    	<div class="info-item" id="rest_name">
            <div class="info-label">가게 이름 :</div>
            <div class="info-value">${storeData.rest_name || '정보 없음'}</div>
        </div>
        <div class="info-item">
            <div class="info-label">가게 종류 :</div>
            <div class="info-value">${storeData.rest_cate || '정보 없음'}</div>
        </div>
        <div class="info-item">
            <div class="info-label">영업 시간 :</div>
            <div class="info-value">${storeData.rest_bh || '정보 없음'}</div>
        </div>
    	<div class="info-item">
	    	<div class="info-label">가게 연락처 :</div>
	    	<div class="info-value">${storeData.rest_phone || '정보 없음'}</div>
    	</div>
        <div class="info-item" id="rest_add">
            <div class="info-label">가게 주소 :</div>
            <div class="info-value">${storeData.rest_adr || '정보 없음'}</div>
        </div>
        <div class="tabel_favor">
    		<div class="bookmark-container">
    			<button type="button" class="bookmark" id="bookmarkBtn">★</button>
    		</div>
        </div>
    `;

    const newBookmarkBtnElement = document.getElementById('bookmarkBtn');
    if (newBookmarkBtnElement) {
    	newBookmarkBtnElement.addEventListener('click', handleFavoriteClick); // 익명 함수 제거, handleFavoriteClick 직접 할당
    	BookmarkBtnElement = newBookmarkBtnElement;
        updateInitialBookmarkUI();
    } else {
        console.error("renderStoreDetails에서 bookmarkBtn 요소를 찾을 수 없습니다.");
    }
}

function get(callback) {
	if (!restNo) return console.error("restNo가 정의되지 않았습니다."), callback({});
	
	fetch(`/search/view/${restNo}`, {
        headers: { 'Accept': 'application/json' }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => callback(data || {}))
    .catch(err => console.error("Fetch error:", err.message), callback({}));
}

function storeMenu() {
    const storeMenus = document.querySelector('.store-menu');
    if (!storeMenus) return console.error('가게 메뉴 정보(.store-menu)를 찾을 수 없습니다.');
    if (menuLoaded) return;
    
    getMenu(menuItems => {
        storeMenus.innerHTML = menuItems.map(({ menu_name, menu_price }) => `
            <div class="menu">
                <span class="menu_name">${menu_name}</span>
                <span class="menu_price">${menu_price}</span>
            </div>`).join('');
        menuLoaded = true;
    });
}

function getMenu(callback) {
    if (!restNo) return console.error("restNo가 정의되지 않았습니다."), callback([]);

    fetch(`/search/view/menu/${restNo}`, {
        headers: { 'Accept': 'application/json' }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => callback(data || []))
    .catch(err => console.error("Fetch error:", err.message), callback([]));
}

function showViewList() {
    const imageUL = document.querySelector(".slides-wrapper");
    if (!imageUL) return console.error('슬라이드 컨테이너(.slides-wrapper)를 찾을 수 없습니다.');

    getList(images => {
        for (let i = images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]];
        }
        imageUL.innerHTML = images.map(({ rest_img_name }) => `
            <div class="slide">
                <img src="${rest_img_name || '/resources/images/noImage.png'}" alt="이미지 없음" onerror="this.src='/resources/images/noImage.png';">
            </div>`).join('');
        initializeSlides();
    });
}

function getList(callback) {
    if (!restNo) return console.error("restNo가 정의되지 않았습니다."), callback([]);

    fetch(`/search/view/${restNo}`, {
        headers: { 'Accept': 'application/json' }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => callback(data || []))
    .catch(err => console.error("Fetch error:", err.message), callback([]));
}

function initializeSlides() {
    const wrapper = document.querySelector('.slides-wrapper');
    let slides = [...document.querySelectorAll('.slide')];
    if (slides.length === 0) return wrapper.innerHTML = '<div class="slide">이미지 준비중 입니다.</div>';

    const validVisibleSlides = Math.min(visibleSlides, slides.length);
    slides.slice(0, validVisibleSlides).forEach(slide => wrapper.appendChild(slide.cloneNode(true)));
    slides.slice(-validVisibleSlides).forEach(slide => wrapper.insertBefore(slide.cloneNode(true), wrapper.querySelector('.slide')));

    currentIndex = validVisibleSlides;
    const offset = currentIndex * (100 / validVisibleSlides);
    wrapper.style.transform = `translateX(-${offset}%)`;
    wrapper.style.transition = 'none';
    setTimeout(() => wrapper.style.transition = 'transform 0.5s ease-in-out', 0);
}

function moveSlide(direction) {
    const wrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const total = slides.length - 2 * visibleSlides;
    const allSlides = slides.length;

    // visibleSlides 유효성 검증
    if (visibleSlides <= 0 || total <= visibleSlides) return;

    currentIndex += direction * visibleSlides;

    let resetTransition = false;
    if (currentIndex >= allSlides - visibleSlides) {
        currentIndex = visibleSlides;
        resetTransition = true;
    } else if (currentIndex < visibleSlides) {
        currentIndex = allSlides - 2 * visibleSlides;
        resetTransition = true;
    }

    const offset = currentIndex * (100 / visibleSlides);
    wrapper.style.transform = `translateX(-${offset}%)`;
    if (resetTransition) {
        wrapper.style.transition = 'none';
        setTimeout(() => wrapper.style.transition = 'transform 0.5s ease-in-out', 0);
    }
}

function getAvgRate(callback) {
	if (!restNo) return console.error("restNo가 정의되지 않았습니다."), callback(null);
	
	fetch(`/comment/rate/${restNo}`, {
		method: 'GET',
		headers: { 'Accept': 'application/json' }
	})
	.then(res => res.ok ? res.json() : Promise.reject(res))
	.then(callback)
	.catch(err => {
		callback(null);
	});
}

function getAgeAvgRate(callback) {
    fetch(`/comment/ageRate/${restNo}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(callback)
    .catch(err => {
        callback(null);
    });
}

function showAvgRate() {
    const avgRateEl = document.querySelector(".store-list");
    if (!avgRateEl) return;

    getAvgRate(avg => {
        const average = (typeof avg === 'number' && !isNaN(avg)) ? avg.toFixed(1) : '0.0';

        let html = `
            <div class="store-item">
                <span class="name">가게 총 평점</span>
                <span class="rating">${average}</span>
            </div>
            <div class="store-item" id="age_rate">
                <span class="name">&lt;연령별 평점&gt;</span>
                <span class="rating"></span>
            </div>
        `;

        // 연령대별 평점 이어 붙이기
        getAgeAvgRate(data => {
            html += renderAgeRateHtml(data);
            avgRateEl.innerHTML = html;
        });
    });
}

function renderAgeRateHtml(data) {
    const ageGroups = [10, 20, 30, 40];
    return ageGroups.map(age => {
        const item = Array.isArray(data) ? data.find(d => d.age_group === age) : null;
        const rating = item ? parseFloat(item.avg_rating).toFixed(1) : '0.0';
        return `
            <div class="store-item">
                <span class="name">${age}대</span>
                <span class="rating">${rating}</span>
            </div>
        `;
    }).join('');
}

// 탭 전환 처리
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.store-tap button');
    const contents = document.querySelectorAll('.store-info, .store-menu');

    const showTab = id => {
        contents.forEach(c => c.style.display = 'none');
        buttons.forEach(b => b.classList.remove('active'));

        document.querySelector(`.${id}`).style.display = 'block';
        document.querySelector(`[data-target="${id}"]`).classList.add('active');

        if (id === 'store-menu') storeMenu();
    };

    buttons.forEach(btn => btn.addEventListener('click', () => showTab(btn.dataset.target)));
    showTab('store-info');
});

function initMap(lat, lng, storeName) {
    const container = document.getElementById('map');
    const pos = new kakao.maps.LatLng(lat, lng);
    const map = new kakao.maps.Map(container, { center: pos, level: 3 });
    
    const marker = new kakao.maps.Marker({ position: pos, map });
    new kakao.maps.InfoWindow({ content: `<div style="padding:5px;font-size:13px;">${storeName}</div>`, position: pos }).open(map, marker);
}

// 예약 - 달력 기능
function renderCalendar(month) {
    if (!calendarDays) return;
    calendarDays.innerHTML = '';

    const fragment = document.createDocumentFragment();
    const year = new Date().getFullYear();
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
    const prevMonthStart = daysInPrevMonth - firstDay + 1;

    const isPast = (y, m, d) => new Date(y, m - 1, d).setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);

    // 이전 달 날짜 채우기
    for (let i = 0; i < firstDay; i++) {
        const day = createDayCell(prevMonthStart + i, ['disabled']);
        fragment.appendChild(day);
    }

    // 현재 달 날짜
    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = year === todayYear && month === todayMonth && i === todayDate;
        const disabled = isPast(year, month, i);
        const day = createDayCell(i, disabled ? ['disabled'] : []);

        if (!disabled) {
            day.addEventListener('click', () => {
                document.querySelectorAll('.day:not(.disabled)').forEach(d => d.classList.remove('selected'));
                day.classList.add('selected');
                selectedDate = i.toString();
                resetTimeAndPersonnel();
                updateTimeSlots(restNo, `2025-${month}-${selectedDate}`);
            });

            if (isToday) {
                day.classList.add('selected');
                selectedDate = i.toString();
                resetTimeAndPersonnel();
                updateTimeSlots(restNo, `2025-${month}-${selectedDate}`);
            }
        }

        fragment.appendChild(day);
    }

    // 다음 달 날짜로 빈 칸 채우기
    const totalCells = firstDay + daysInMonth;
    const remaining = 42 - totalCells;
    for (let i = 1; i <= remaining; i++) {
        const day = createDayCell(i, ['disabled']);
        fragment.appendChild(day);
    }

    calendarDays.appendChild(fragment);
}

function createDayCell(text, classes = []) {
    const day = document.createElement('div');
    day.classList.add('day', ...classes);
    day.textContent = text;
    return day;
}

function resetSelections() {
    selectedDate = selectedTime = selectedPersonnel = null;
    selectedMonth = new Date().getMonth() + 1;
    if (monthSelect) monthSelect.value = selectedMonth.toString();

    document.querySelectorAll('.day.selected').forEach(d => d.classList.remove('selected'));
    document.querySelectorAll('.time-btn.selected').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('.personnel-btn.selected').forEach(b => b.classList.remove('selected'));

    resetTimeAndPersonnel();
    renderCalendar(selectedMonth);
}

function updateTimeSlots(restNo, resDate) {
    fetch(`/search/reservations/times?rest_no=${restNo}&res_date=${resDate}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message || '서버 오류'); });
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            const reserved = data.reservedTimes || [];
            timeButtons.forEach(button => {
                const time = button.textContent.trim();
                const isReserved = reserved.includes(time);
                button.disabled = isReserved;
                button.classList.toggle('disabled', isReserved);
                button.title = isReserved ? '이미 예약된 시간입니다.' : '';
            });
        } else {
            throw new Error(data.message || '예약된 시간 조회 실패');
        }
    })
    .catch(err => {
        console.error('예약된 시간 조회 실패:', err.message);
        console.log('에러 상세:', err);
        timeButtons.forEach(button => {
            button.disabled = false;
            button.classList.remove('disabled');
        });
    });
}

// 코멘트 목록 조회 -------------------------------------------
function fetchComments() {
	  const commentList = document.querySelector(".panel-footer-body ul.chat");
	  if (!commentList) return console.error('코멘트 목록 컨테이너(.panel-footer-body ul.chat)를 찾을 수 없습니다.');

	  getComments(data => {
	    const seen = new Set();
	    commentList.innerHTML = data.map(comment => {
	      if (seen.has(comment.com_no)) return '';
	      seen.add(comment.com_no);

	      const rate = Number(comment.com_rate) || 0;
	      const stars = Array.from({ length: 5 }, (_, i) => `<div class="star ${i < rate ? 'filled' : ''}"></div>`).join('');

	      const attachList = Array.isArray(comment.com_attachList) ? comment.com_attachList : [];
	      const attachHtml = attachList.length ? `
	        <div class="comment-attachments">
	          ${attachList.map(a => {
	            const fileName = `${a.att_uuid}_${a.att_name}`;
	            const imageUrl = `${a.att_path}/${encodeURIComponent(fileName)}`;
	            return `<div class="attachment"><img src="${imageUrl}" alt="${a.att_name}" class="comment-image"></div>`;
	          }).join('')}
	        </div>` : '';

	      const memberData = comment.com_memberData || {};
	      const profileImg = memberData.mem_img
	        ? `/resources/upload/${memberData.mem_img}`
	        : '/resources/images/profile_1.png';
	      const nickName = memberData.mem_nick || memberData.mem_name || '익명';
	      const isOwn = Number(mem_no) === Number(comment.mem_no);

	      return `
	        <li data-com_no="${comment.com_no}">
	          <div class="chat-full" id="comment-${comment.com_no}">
	            <div class="chat-header">
	              <img src="${profileImg}" alt="프로필" class="profile-img" onerror="this.src='/resources/images/profile.png'">
	              <strong>${nickName}</strong>
	              <div class="header-right">
	                <small class="pull-right">${formatDate(comment.com_date)}</small>
	                <div class="comment-rating">${stars}</div>
	              </div>
	              ${isOwn ? `<button class="comment-delete-btn" data-com_no="${comment.com_no}" aria-label="코멘트 삭제">X</button>` : ''}
	            </div>
	            <div class="chat-body">${attachHtml}</div>
	            <div class="chat-footer"><p>${comment.com_con || '내용 없음'}</p></div>
	          </div>
	        </li>`;
	    }).join('');

	    commentList.addEventListener('click', handleCommentDelete);
	  });
	}

function getComments(callback) {
  fetch(`/comment/pages/${restNo}`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(callback)
    .catch(err => {
      console.error("댓글 조회 오류:", err);
      callback([]);
    });
}

function showCommentsImage() {
	  const imageUL = document.querySelector(".image-wrapper");
	  if (!imageUL) return console.error('이미지 컨테이너(.image-wrapper)를 찾을 수 없습니다.');

	  getComments(data => {
	    const seen = new Set();
	    let html = '';

	    data.forEach(comment => {
	      if (seen.has(comment.com_no)) return;
	      seen.add(comment.com_no);

	      const attachList = Array.isArray(comment.com_attachList) ? comment.com_attachList : [];
	      attachList.forEach(attach => {
	        if (!attach.att_uuid || !attach.att_name || !attach.att_path) return; // 속성 검증
	        const fileName = `${attach.att_uuid}_${attach.att_name}`;
	        const imageUrl = `${attach.att_path}/${encodeURIComponent(fileName)}`;
	        html += `
	          <div class="image">
	            <div class="attachment">
	              <img src="${imageUrl}" alt="${attach.att_name}" class="comment-image-show">
	            </div>
	          </div>`;
	      });
	    });

	    imageUL.innerHTML = html;
	    const images = imageUL.querySelectorAll('.image');
	    const moreBtn = document.querySelector('.more-btn');

	    if (images.length > 4 && moreBtn) {
	      moreBtn.style.display = 'block';
	      moreBtn.addEventListener('click', () => {
	        if (!modalImageContainer || !modal) return; // 모달 요소 검증
	        modalImageContainer.innerHTML = '';
	        images.forEach(img => {
	          const clone = img.querySelector('img').cloneNode(true);
	          const div = document.createElement('div');
	          div.classList.add('image'); // 기존 클래스 유지
	          div.appendChild(clone);
	          modalImageContainer.appendChild(div);
	        });
	        modal.style.display = 'flex';
	      });
	    }
	  });
	}

function handleCommentDelete(e) {
  const btn = e.target.closest('.comment-delete-btn');
  if (!btn) return;

  const comNo = btn.dataset.com_no;
  if (!comNo || !mem_no || mem_no === '0') return alert('로그인이 필요합니다.');
  if (!confirm('정말로 이 코멘트를 삭제하시겠습니까?')) return;

  btn.disabled = true;
  btn.textContent = '삭제 중...';

  fetch(`/comment/delete/${comNo}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
    .then(res => res.ok ? res.json() : res.text().then(txt => Promise.reject(txt)))
    .then(() => {
      fetchComments();
      showAvgRate();
      showCommentsImage();
    })
    .catch(err => {
      console.error('삭제 실패:', err);
      alert('코멘트 삭제에 실패했습니다.');
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = 'X';
    });
}

function uploadComment() {
	  const commentInput = document.querySelector("#comment");
	  if (!mem_no || Number(mem_no) === 0) return alert("로그인을 해주세요.");
	  if (!commentInput) return console.error("코멘트 입력 필드(#comment)를 찾을 수 없습니다.");

	  const content = commentInput.value.trim();
	  if (!content) return alert("코멘트를 입력해주세요.");
	  if (!restNo) {
	    console.error("restNo가 정의되지 않았습니다.");
	    return alert("가게 정보를 불러올 수 없습니다.");
	  }
	  if (!ratingValue || Number(ratingValue) === 0) return alert("평점을 선택해주세요");

	  const attachList = (window.uploadedFiles || []).map(f => ({
	    att_uuid: f.att_uuid,
	    att_path: f.att_path,
	    att_name: f.att_name
	  }));

	  const data = {
	    rest_no: restNo,
	    com_con: content,
	    mem_no: Number(mem_no),
	    com_rate: Number(ratingValue),
	    com_attachList: attachList
	  };

	  fetch('/comment/add', {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json; charset=utf-8',
	      'Accept': 'application/json'
	    },
	    body: JSON.stringify(data)
	  })
	    .then(res => {
	      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
	      return res.json();
	    })
	    .then(() => {
	      fetchComments();
	      showAvgRate();
	      showCommentsImage();
	      commentInput.value = '';
	      ratingValue = 0;
	      updateStars(0);
	      window.uploadedFiles = [];
	      const uploadResult = document.querySelector('.uploadResult ul');
	      if (uploadResult) uploadResult.innerHTML = '';
	    })
	    .catch(err => {
	      console.error("코멘트 등록 실패:", err.message);
	      alert("코멘트 등록에 실패했습니다.");
	    });
	}

//댓글 입력 제한 ----------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('comment');
  const maxChars = 500;
  const maxLines = 20;
  const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight) || 20;

  textarea.setAttribute('rows', maxLines);

  textarea.addEventListener('input', () => {
    textarea.value = textarea.value.slice(0, maxChars);

    let lines = textarea.value.split('\n');
    if (lines.length > maxLines) {
      textarea.value = lines.slice(0, maxLines).join('\n');
    }

    while (Math.floor(textarea.scrollHeight / lineHeight) > maxLines && textarea.value.length > 0) {
      textarea.value = textarea.value.slice(0, -1);
    }
  });

  textarea.addEventListener('keydown', e => {
    if (e.key === 'Enter' && textarea.value.split('\n').length >= maxLines) {
      e.preventDefault();
    }
  });
});

function formatDate(dateString) {
  return dateString ? new Date(dateString).toISOString().split('T')[0] : '날짜 없음';
}

// 즐겨찾기 처리
function handleFavoriteClick() {
//    console.log("handleFavoriteClick isFavorite:", window.isFavorite);
    const bookmarkBtnElement = document.getElementById('bookmarkBtn');
    const favoriteModal = document.getElementById('favoriteModal');

    if (mem_no == 0) {
        alert("즐겨찾기 기능은 로그인 후 가능합니다.")
        const currentUrl = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = `/login/loginPage?redirectUrl=${currentUrl}`;
        return;
    }

    if (window.isFavorite) {
        removeFavorite();
        if (bookmarkBtnElement) {
        	bookmarkBtnElement.classList.remove('active'); // 즐겨찾기 해제 시 회색 별
        	window.isFavorite = false;
        } else {
            console.error("bookmarkBtnElement를 찾을 수 없습니다.");
        }
    } else {
        if (favoriteModal) {
            favoriteModal.style.display = 'block';
        } else {
            console.error("favoriteModal을 찾을 수 없습니다.");
        }
    }
}

function checkInitialFavoriteStatus() {
	// 서버에 현재 사용자가 해당 식당을 즐겨찾기했는지 요청
	if (mem_no == 0) return;
    fetch(`/mypage/favorites/status/${restNo}`, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        window.isFavorite = data; // 서버 응답 값을 직접 할당
        updateInitialBookmarkUI(); // 초기 상태 반영
    });
}

function addFavorite(isPublic) {
    const favoriteModal = document.getElementById('favoriteModal');
    fetch(`/mypage/favorites/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mem_no: mem_no, rest_no: restNo, is_public: isPublic })
    })
    .then(response => response.json())
    .then(data => {
        if (data) { // 서버 응답 데이터(boolean)가 true인지 확인
            window.isFavorite = true; // 전역 변수 업데이트
            updateBookmarkUI();
//            console.trace("updateFavoriteButtonUI 호출 스택 (addFavorite)");
            if (favoriteModal) {
                favoriteModal.style.display = 'none';
            }
        } else {
            alert('즐겨찾기 추가에 실패했습니다.');
        }
    });
}


function removeFavorite() {
    fetch(`/mypage/favorites/remove/${restNo}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data == true) {
            isFavorite = false;
            updateBookmarkUI();
//            console.trace("updateFavoriteButtonUI 호출 스택(removeFavorite)");
        } else {
            alert('즐겨찾기 해제에 실패했습니다.');
        }
    });
}

function updateInitialBookmarkUI() {
	const bookmarkBtnElement  = document.getElementById('bookmarkBtn');
    if (bookmarkBtnElement) {
    	if (window.isFavorite) {
    		bookmarkBtnElement.classList.add('active'); // 즐겨찾기 O: 노란색 별 (active 클래스 제거)
    	} else {
    		bookmarkBtnElement.classList.remove('active');    // 즐겨찾기 X: 회색 별 (active 클래스 추가)
    	}
	} else {
		console.error("updateInitialBookmarkUI에서 bookmarkBtn 요소를 찾을 수 없습니다.");
    }
}

//북마크 UI 업데이트 (즐겨찾기 상태에 따라 별 색상 변경)
function updateBookmarkUI() {
	const bookmarkBtnElement = document.getElementById('bookmarkBtn');
	if (bookmarkBtnElement) {
		if (window.isFavorite) {
			bookmarkBtnElement.classList.add('active'); // 즐겨찾기 O: 노란색 별
		} else {
			bookmarkBtnElement.classList.remove('active');    // 즐겨찾기 X: 회색 별
		}
	} else {
		console.error("updateBookmarkUI에서 bookmarkBtn 요소를 찾을 수 없습니다.");
	}
}

setTimeout(function() {
	if (location.hash) {
		const target = document.getElementById(location.hash.substring(1));
		if (target) {
		  target.scrollIntoView({ behavior: 'smooth' });
		}
	}
}, 300);