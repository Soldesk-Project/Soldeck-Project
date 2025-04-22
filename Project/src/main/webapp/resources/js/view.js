// CSS 파일 추가
const CSS_FILE_PATH = '/resources/css/view.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);

// 전역 변수 정의
let restNo = null;
let currentIndex = 0;
const visibleSlides = 4;

// DOM 요소 참조 (중복 쿼리 방지)
const viewModal = document.getElementById('viewModal');
const reservationModal = document.getElementById('reservationModal');
const viewBtn = document.getElementById('viewBtn');
const reservationBtn = document.getElementById('reservationBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const confirmReservationBtn = document.getElementById('confirmReservationBtn');
const commentBtn = document.querySelector("#commentBtn");
const monthSelect = document.getElementById('monthSelect');
const calendarDays = document.getElementById('calendarDays');
let selectedDate = null;
let selectedTime = null;
let selectedMonth = 4;

const stars = document.querySelectorAll('#starRating .star');
let ratingValue = 0;

stars.forEach(star => {
    star.addEventListener('click', () => {
        ratingValue = parseInt(star.getAttribute('data-value'));
        updateStars(ratingValue);
        console.log('선택된 별점:', ratingValue); // 변환된 데이터 확인
    });
});

function updateStars(rating) {
    stars.forEach(star => {
        const value = parseInt(star.getAttribute('data-value'));
        if (value <= rating) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
}

// 초기화 및 이벤트 리스너 설정
document.addEventListener("DOMContentLoaded", function () {
    // page-header에서 restNo 가져오기
    const pageHeader = document.querySelector(".page-header");
    if (pageHeader) {
        restNo = pageHeader.dataset.restNo;
        console.log("Rest No: ", restNo);
    } else {
        console.error("page-header 요소를 찾을 수 없습니다.");
        restNo = null;
    }

    // 중복된 store-details 요소 정리
    const storeDetailsElements = document.querySelectorAll('.store-details');
    if (storeDetailsElements.length > 1) {
        console.warn('store-details 요소가 중복으로 발견되었습니다. 첫 번째 요소만 유지합니다.');
        for (let i = 1; i < storeDetailsElements.length; i++) {
            storeDetailsElements[i].remove();
        }
    }

    // restNo가 존재하면 데이터 로드
    if (restNo) {
        fetchStoreDetails();
    } else {
        console.error("restNo가 없으므로 fetchStoreDetails를 호출할 수 없습니다.");
        const storeDetails = document.querySelector('.store-details');
        if (storeDetails) {
            storeDetails.querySelector('table').innerHTML = '<tr><td colspan="2">가게 정보를 불러올 수 없습니다.</td></tr>';
        }
    }

    // 모달 창 외부 클릭 감지 (viewModal)
    if (viewModal) {
        viewModal.addEventListener('click', function (event) {
            if (event.target === viewModal) {
                viewModal.style.display = 'none';
                console.log(1);
            }
        });
    }

    // 더보기 버튼 (viewModal 열기)
    if (viewBtn) {
        viewBtn.addEventListener('click', () => {
            viewModal.style.display = 'flex';
        });
    }

    // 예약 버튼 (reservationModal 열기)
    if (reservationBtn) {
        reservationBtn.addEventListener('click', () => {
            reservationModal.style.display = 'flex';
            renderCalendar(selectedMonth);
        });
    }

    // 예약 모달 닫기 버튼
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            reservationModal.style.display = 'none';
            resetSelections();
        });
    }

    // 월 선택 (달력 업데이트)
    if (monthSelect) {
        monthSelect.addEventListener('change', (e) => {
            selectedMonth = parseInt(e.target.value);
            renderCalendar(selectedMonth);
        });
    }

    // 시간 선택 버튼
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            timeButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedTime = btn.textContent;
        });
    });

    // 예약 확인 버튼
    if (confirmReservationBtn) {
        confirmReservationBtn.addEventListener('click', () => {
            if (!selectedDate || !selectedTime) {
                alert('날짜와 시간을 선택해주세요.');
                return;
            }
            alert(`예약이 완료되었습니다!\n날짜: 2025년 ${selectedMonth}월 ${selectedDate}일\n시간: ${selectedTime}`);
            reservationModal.style.display = 'none';
            resetSelections();
        });
    }

    // 코멘트 업로드 버튼
    if (commentBtn) {
        commentBtn.addEventListener('click', uploadComment);
    }
});

// 가게 상세 정보 가져오기 및 렌더링
function fetchStoreDetails() {
    const storeDetails = document.querySelector('.store-details');
    if (storeDetails) {
        storeDetails.querySelector('table').innerHTML = '<tr><td colspan="2">로딩 중...</td></tr>';
    }

    get(data => {
        renderStoreDetails(data);
        showViewList();
        fetchComments();
    });
}

// 가게 상세 정보 렌더링
function renderStoreDetails(data) {
    const storeDetails = document.querySelector('.store-details table tbody');
    if (!storeDetails) {
        console.error('가게 상세 정보 컨테이너(.store-details table tbody)를 찾을 수 없습니다.');
        return;
    }

    const storeData = Array.isArray(data) && data.length > 0 ? data[0] : data;
    if (!storeData || Object.keys(storeData).length === 0) {
        storeDetails.innerHTML = '<tr><td colspan="2">가게 정보를 찾을 수 없습니다.</td></tr>';
        return;
    }

    storeDetails.innerHTML = `
        <tr>
            <td colspan="2">
                <button class="favorite-btn">즐겨찾기</button>
            </td>
        </tr>
        <tr>
            <td>가게 이름 :</td>
            <td>${storeData.rest_name || '정보 없음'}</td>
        </tr>
        <tr>
            <td>가게 종류 :</td>
            <td>${storeData.rest_cate || '정보 없음'}</td>
        </tr>
        <tr>
            <td>가게 시간 :</td>
            <td>${storeData.rest_bh || '정보 없음'}</td>
        </tr>
        <tr>
            <td>가게 주소 :</td>
            <td>${storeData.rest_adr || '정보 없음'}</td>
        </tr>
        <tr>
            <td>가게 연락처 :</td>
            <td>${storeData.rest_phone || '정보 없음'}</td>
        </tr>
    `;
}

// 데이터 가져오기 공통 함수
function get(callback) {
    if (!restNo) {
        console.error("restNo가 정의되지 않았습니다.");
        callback({});
        return;
    }

    const url = `/search/view/${restNo}`;
    console.log("Fetching URL:", url);
    fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Received data:", data);
        callback(data || {});
    })
    .catch(err => {
        console.error("Fetch error:", err.message);
        callback({});
    });
}

// 관련 가게 슬라이드 표시
function showViewList() {
    const imageUL = document.querySelector(".slides-wrapper");
    if (!imageUL) {
        console.error('슬라이드 컨테이너(.slides-wrapper)를 찾을 수 없습니다.');
        return;
    }

    getList(jsonArray => {
        if (!jsonArray || jsonArray.length === 0) {
            imageUL.innerHTML = '<div class="slide">관련 가게가 없습니다.</div>';
            initializeSlides();
            return;
        }

        for (let i = jsonArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [jsonArray[i], jsonArray[j]] = [jsonArray[j], jsonArray[i]];
        }

        let msg = '';
        jsonArray.forEach(json => {
            msg += `<div class="slide">`;
            msg += `<img src="${json.rest_img_name || '/resources/images/noImage.png'}" alt="이미지 없음" onerror="this.src='/resources/images/noImage.png';">`;
            msg += `<p>${json.rest_name}</p>`;
            msg += `</div>`;
        });

        imageUL.innerHTML = msg;
        initializeSlides();
    });
}

function getList(callback) {
    if (!restNo) {
        console.error("restNo가 정의되지 않았습니다.");
        callback([]);
        return;
    }

    const url = `/search/view/${restNo}`;
    fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Related stores data:", data);
        callback(data || []);
    })
    .catch(err => {
        console.error("Fetch error:", err.message);
        callback([]);
    });
}

// 슬라이드 기능
function initializeSlides() {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (totalSlides === 0) {
        slidesWrapper.innerHTML = '<div class="slide">관련 가게가 없습니다.</div>';
        return;
    }

    slidesWrapper.style.transform = `translateX(0%)`;
}

function moveSlide(direction) {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (totalSlides <= visibleSlides) {
        return;
    }

    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > totalSlides - visibleSlides) {
        currentIndex = totalSlides - visibleSlides;
    }
    const offset = currentIndex * (100 / visibleSlides);
    slidesWrapper.style.transform = `translateX(-${offset}%)`;
}

// 달력 및 예약 기능
function renderCalendar(month) {
    if (!calendarDays) return;
    calendarDays.innerHTML = '';

    const year = 2025;
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();
    const prevMonth = month === 4 ? 3 : month - 1;
    const daysInPrevMonth = new Date(year, prevMonth, 0).getDate();
    const prevMonthStart = daysInPrevMonth - firstDay + 1;

    for (let i = 0; i < firstDay; i++) {
        const day = document.createElement('div');
        day.classList.add('day', 'disabled');
        day.textContent = prevMonthStart + i;
        calendarDays.appendChild(day);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.textContent = i;

        const today = new Date(2025, 3, 16);
        const currentDate = new Date(year, month - 1, i);
        if (currentDate < today) {
            day.classList.add('disabled');
        } else {
            day.addEventListener('click', () => {
                const days = document.querySelectorAll('.day:not(.disabled)');
                days.forEach(d => d.classList.remove('selected'));
                day.classList.add('selected');
                selectedDate = day.textContent;
            });
        }

        calendarDays.appendChild(day);
    }

    const totalDays = firstDay + daysInMonth;
    const remainingDays = (7 - (totalDays % 7)) % 7;
    for (let i = 1; i <= remainingDays; i++) {
        const day = document.createElement('div');
        day.classList.add('day', 'disabled');
        day.textContent = i;
        calendarDays.appendChild(day);
    }
}

function resetSelections() {
    selectedDate = null;
    selectedTime = null;
    selectedMonth = 4;
    if (monthSelect) monthSelect.value = '4';
    const days = document.querySelectorAll('.day:not(.disabled)');
    days.forEach(day => day.classList.remove('selected'));
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(btn => btn.classList.remove('selected'));
    renderCalendar(selectedMonth);
}

// 코멘트 목록 조회 및 표시
function fetchComments() {
    const commentList = document.querySelector(".panel-footer-body ul.chat");
    if (!commentList) {
        console.error('코멘트 목록 컨테이너(.panel-footer-body ul.chat)를 찾을 수 없습니다.');
        return;
    }

    getComments(data => {
        if (!data || data.length === 0) {
            commentList.innerHTML = '<li><div class="chat-full">코멘트가 없습니다.</div></li>';
            return;
        }

        let msg = '';
        data.forEach(comment => {
            msg += `
                <li data-com_no="${comment.com_no}">
                    <div class="chat-full">
                        <div class="chat-header">
                            <strong>${comment.mem_no}</strong>
                            <small class="pull-right">${formatDate(comment.com_date)}</small>
                        </div>
                        <div class="chat-body"></div>
                        <div class="chat-footer">
                            <p>${comment.com_con || '내용 없음'}</p>
                        </div>
                    </div>
                </li>
            `;
        });

        commentList.innerHTML = msg;
    });
}

function getComments(callback) {
    if (!restNo) {
        console.error("restNo가 정의되지 않았습니다.");
        callback([]);
        return;
    }

    const url = `/comment/pages/${restNo}`;
    console.log("Fetching comments URL:", url);
    fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Received comments data:", data);
        callback(data || []);
    })
    .catch(err => {
        console.error("Fetch error:", err.message);
        callback([]);
    });
}

// 코멘트 등록
function uploadComment() {
    const commentInput = document.querySelector("#comment");
    if (!commentInput) {
        console.error("코멘트 입력 필드(#comment)를 찾을 수 없습니다.");
        return;
    }

    const commentContent = commentInput.value.trim();
    if (!commentContent) {
        alert("코멘트를 입력해주세요.");
        return;
    }

    if (!restNo) {
        console.error("restNo가 정의되지 않았습니다.");
        alert("가게 정보를 불러올 수 없습니다.");
        return;
    }

    const commentData = {
        rest_no: restNo,
        com_con: commentContent,
        mem_no: 1
    };

    fetch('/comment/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify(commentData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Comment uploaded:", data);
        fetchComments();
        commentInput.value = '';
        alert("코멘트가 등록되었습니다.");
    })
    .catch(err => {
        console.error("Upload error:", err.message);
        alert("코멘트 등록에 실패했습니다.");
    });
}

// 날짜 포맷팅 함수
function formatDate(dateString) {
    if (!dateString) return '날짜 없음';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}
/*// CSS 파일 추가
const CSS_FILE_PATH = '/resources/css/view.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);

// restNo를 전역 변수로 정의
let restNo;

document.addEventListener("DOMContentLoaded", function() {
	const modal = document.getElementById('viewModal');

    // 모달창 외부 클릭 감지
    modal.addEventListener('click', function (event) {
        // 클릭된 요소가 모달창 외부인지 확인
        if (event.target === modal) {
        	viewModal.style.display = 'none';
            console.log(1);
        }
    });
    
    const storeDetailsElements = document.querySelectorAll('.store-details');
    if (storeDetailsElements.length > 1) {
        console.warn('store-details 요소가 중복으로 발견되었습니다. 첫 번째 요소만 유지합니다.');
        for (let i = 1; i < storeDetailsElements.length; i++) {
            storeDetailsElements[i].remove();
        }
    }

    // 기존 코드 계속
    const pageHeader = document.querySelector(".page-header");
    if (pageHeader) {
        restNo = pageHeader.dataset.restNo;
        console.log("Rest No: ", restNo);
    } else {
        console.error("page-header 요소를 찾을 수 없습니다.");
        restNo = null;
    }

    if (restNo) {
        fetchStoreDetails();
    } else {
        console.error("restNo가 없으므로 fetchStoreDetails를 호출할 수 없습니다.");
        const storeDetails = document.querySelector('.store-details');
        if (storeDetails) {
            storeDetails.querySelector('table').innerHTML = '<tr><td colspan="2">가게 정보를 불러올 수 없습니다.</td></tr>';
        }
    }
});

// 가게 상세 정보 가져오기 및 렌더링
function fetchStoreDetails() {
    const storeDetails = document.querySelector('.store-details');
    if (storeDetails) {
        storeDetails.querySelector('table').innerHTML = '<tr><td colspan="2">로딩 중...</td></tr>';
    }

    get(data => {
        renderStoreDetails(data);
        // renderRatings(data); // 평점 데이터가 없으므로 주석 처리
        showViewList();
    });
}

// 가게 상세 정보 렌더링
function renderStoreDetails(data) {
    const storeDetails = document.querySelector('.store-details table tbody');
    if (!storeDetails) {
        console.error('가게 상세 정보 컨테이너(.store-details table tbody)를 찾을 수 없습니다.');
        return;
    }

    // 배열이면 첫 번째 객체만 사용
    const storeData = Array.isArray(data) && data.length > 0 ? data[0] : data;

    if (!storeData || Object.keys(storeData).length === 0) {
        storeDetails.innerHTML = '<tr><td colspan="2">가게 정보를 찾을 수 없습니다.</td></tr>';
        return;
    }

    storeDetails.innerHTML = `
        <tr>
            <td colspan="2">
                <button class="favorite-btn">즐겨찾기</button>
            </td>
        </tr>
        <tr>
            <td>가게 이름 :</td>
            <td>${storeData.rest_name || '정보 없음'}</td>
        </tr>
        <tr>
            <td>가게 종류 :</td>
            <td>${storeData.rest_cate || '정보 없음'}</td>
        </tr>
        <tr>
            <td>가게 시간 :</td>
            <td>${storeData.rest_bh || '정보 없음'}</td>
        </tr>
        <tr>
            <td>가게 주소 :</td>
            <td>${storeData.rest_adr || '정보 없음'}</td>
        </tr>
        <tr>
            <td>가게 연락처 :</td>
            <td>${storeData.rest_phone || '정보 없음'}</td>
        </tr>
    `;
}

function get(callback) {
    if (!restNo) {
        console.error("restNo가 정의되지 않았습니다.");
        callback({});
        return;
    }

    const url = `/search/view/${restNo}`;
    console.log("Fetching URL:", url);
    fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Received data:", data);
        callback(data || {});
    })
    .catch(err => {
        console.error("Fetch error:", err.message);
        callback({});
    });
}

function showViewList() {
    const imageUL = document.querySelector(".slides-wrapper");
    if (!imageUL) {
        console.error('슬라이드 컨테이너(.slides-wrapper)를 찾을 수 없습니다.');
        return;
    }

    let msg = '';
    getList(jsonArray => {
        if (!jsonArray || jsonArray.length === 0) {
            imageUL.innerHTML = '<div class="slide">관련 가게가 없습니다.</div>';
            initializeSlides();
            return;
        }

        for (let i = jsonArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [jsonArray[i], jsonArray[j]] = [jsonArray[j], jsonArray[i]];
        }

        jsonArray.forEach(json => {
            msg += `<div class="slide">`;
            msg += `<img src="${json.rest_img_name || '/resources/images/noImage.png'}" alt="이미지 없음" onerror="this.src='/resources/images/noImage.png';">`;
            msg += `<p>${json.rest_name}</p>`;
            msg += `</div>`;
        });

        imageUL.innerHTML = msg;
        initializeSlides();
    });
}

function getList(callback) {
    if (!restNo) {
        console.error("restNo가 정의되지 않았습니다.");
        callback([]);
        return;
    }

    const url = `/search/view/${restNo}`;
    fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Related stores data:", data);
        callback(data || []);
    })
    .catch(err => {
        console.error("Fetch error:", err.message);
        callback([]);
    });
}

// 슬라이드 관련 코드
let currentIndex = 0;
const visibleSlides = 4;

function initializeSlides() {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (totalSlides === 0) {
        slidesWrapper.innerHTML = '<div class="slide">관련 가게가 없습니다.</div>';
        return;
    }

    slidesWrapper.style.transform = `translateX(0%)`;
}

function moveSlide(direction) {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    if (totalSlides <= visibleSlides) {
        return;
    }

showViewList();
function showViewList(){
	const imageUL = document.querySelector(".slides-wrapper");
	let msg = '';
	msg +=`<div class="slide">`
	msg +=`<img src="https://img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E" alt="이미지 1">`
	msg +=`</div>`
	msg +=`<div class="slide">`
	msg +=`<img src="https://img1.kakaocdn.net/cthumb/local/C264x196.q50/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2F42F0E8B92BBD4145B7B7F3A8C66092AD" alt="이미지 1">`
	msg +=`</div>`
	msg +=`<div class="slide">`
	msg +=`<img src="https://img1.kakaocdn.net/cthumb/local/C640x960.q50/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2FF5F4393C6D35419B9545F2F230E5D334" alt="이미지 1">`
	msg +=`</div>`
	msg +=`<div class="slide">`
	msg +=`<img src="https://img1.kakaocdn.net/cthumb/local/C640x960.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2Fcf3b48884e2c3bf3f7b9bec246ac3f3925e3f921%3Foriginal" alt="이미지 1">`
	msg +=`</div>`
			imageUL.innerHTML = msg;
}

let currentIndex = 0;
const slidesWrapper = document.querySelector('.slides-wrapper');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const visibleSlides = 4;

function moveSlide(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > totalSlides - visibleSlides) {
        currentIndex = totalSlides - visibleSlides;
    }
    const offset = currentIndex * (100 / visibleSlides);
    slidesWrapper.style.transform = `translateX(-${offset}%)`;
}

// 모달 창 열기 (더보기)
const viewBtn = document.getElementById('viewBtn');
const viewModal = document.getElementById('viewModal');

if (viewBtn) {
    viewBtn.addEventListener('click', () => {
        viewModal.style.display = 'flex';
    });
}

// 모달 창 열기 (예약)
const reservationBtn = document.getElementById('reservationBtn');
//모달 창 열기 (더보기)
const viewBtn = document.getElementById('viewBtn');
const viewModal = document.getElementById('viewModal');

viewBtn.addEventListener('click', () => {
	viewModal.style.display = 'flex';
	});

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('viewModal');

    // 모달창 외부 클릭 감지
    modal.addEventListener('click', function (event) {
        // 클릭된 요소가 모달창 외부인지 확인
        if (event.target === modal) {
        	viewModal.style.display = 'none';
            console.log(1);
        }
    });

    // 예시: 모달창을 여는 함수 (필요 시 호출)
    function openModal() {
        modal.classList.add('show');
    }
});

//모달 창 열기 (예약)
const uploadBtn = document.getElementById('uploadBtn');
const reservationModal = document.getElementById('reservationModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const confirmReservationBtn = document.getElementById('confirmReservationBtn');
const monthSelect = document.getElementById('monthSelect');
const calendarDays = document.getElementById('calendarDays');

let selectedDate = null;
let selectedTime = null;
let selectedMonth = 4;

if (reservationBtn) {
	reservationBtn.addEventListener('click', () => {
        reservationModal.style.display = 'flex';
        renderCalendar(selectedMonth);
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        reservationModal.style.display = 'none';
        resetSelections();
    });
}

if (monthSelect) {
    monthSelect.addEventListener('change', (e) => {
        selectedMonth = parseInt(e.target.value);
        renderCalendar(selectedMonth);
    });
}

function renderCalendar(month) {
    if (!calendarDays) return;
    calendarDays.innerHTML = '';

    const year = 2025;
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();

    const prevMonth = month === 4 ? 3 : month - 1;
    const daysInPrevMonth = new Date(year, prevMonth, 0).getDate();
    const prevMonthStart = daysInPrevMonth - firstDay + 1;

    for (let i = 0; i < firstDay; i++) {
        const day = document.createElement('div');
        day.classList.add('day', 'disabled');
        day.textContent = prevMonthStart + i;
        calendarDays.appendChild(day);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.textContent = i;

        const today = new Date(2025, 3, 16);
        const currentDate = new Date(year, month - 1, i);
        if (currentDate < today) {
            day.classList.add('disabled');
        } else {
            day.addEventListener('click', () => {
                const days = document.querySelectorAll('.day:not(.disabled)');
                days.forEach(d => d.classList.remove('selected'));
                day.classList.add('selected');
                selectedDate = day.textContent;
            });
        }

        calendarDays.appendChild(day);
    }

    const totalDays = firstDay + daysInMonth;
    const remainingDays = (7 - (totalDays % 7)) % 7;
    for (let i = 1; i <= remainingDays; i++) {
        const day = document.createElement('div');
        day.classList.add('day', 'disabled');
        day.textContent = i;
        calendarDays.appendChild(day);
    }
}

const timeButtons = document.querySelectorAll('.time-btn');
timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        timeButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedTime = btn.textContent;
    });
});

if (confirmReservationBtn) {
    confirmReservationBtn.addEventListener('click', () => {
        if (!selectedDate || !selectedTime) {
            alert('날짜와 시간을 선택해주세요.');
            return;
        }
        alert(`예약이 완료되었습니다!\n날짜: 2025년 ${selectedMonth}월 ${selectedDate}일\n시간: ${selectedTime}`);
        reservationModal.style.display = 'none';
        resetSelections();
    });
}

function resetSelections() {
    selectedDate = null;
    selectedTime = null;
    selectedMonth = 4;
    if (monthSelect) monthSelect.value = '4';
    const days = document.querySelectorAll('.day:not(.disabled)');
    days.forEach(day => day.classList.remove('selected'));
    timeButtons.forEach(btn => btn.classList.remove('selected'));
    renderCalendar(selectedMonth);
}
//평점 정보 렌더링
//function renderRatings(data) {
//  const storeList = document.querySelector('.store-list');
//  if (!storeList) {
//      console.error('평점 컨테이너(.store-list)를 찾을 수 없습니다.');
//      return;
//  }
//
//  if (!data || Object.keys(data).length === 0) {
//      // 기본값 유지 (HTML에 하드코딩된 값)
//      return;
//  }
//
//  storeList.innerHTML = `
//      <div class="store-item">
//          <span class="name">가게 총 평점</span>
//          <span class="rating">★ ${data.total_rating || 'N/A'} (${data.total_reviews || 0}개)</span>
//      </div>
//      <div class="store-item">
//          <span class="name">&lt;연령별 평점&gt;</span>
//      </div>
//      <div class="store-item">
//          <span class="name">10대</span>
//          <span class="rating">★ ${(data.ratings_by_age && data.ratings_by_age['10s']?.rating) || 'N/A'} (${(data.ratings_by_age && data.ratings_by_age['10s']?.count) || 0}개)</span>
//      </div>
//      <div class="store-item">
//          <span class="name">20대</span>
//          <span class="rating">★ ${(data.ratings_by_age && data.ratings_by_age['20s']?.rating) || 'N/A'} (${(data.ratings_by_age && data.ratings_by_age['20s']?.count) || 0}개)</span>
//      </div>
//      <div class="store-item">
//          <span class="name">30대</span>
//          <span class="rating">★ ${(data.ratings_by_age && data.ratings_by_age['30s']?.rating) || 'N/A'} (${(data.ratings_by_age && data.ratings_by_age['30s']?.count) || 0}개)</span>
//      </div>
//      <div class="store-item">
//          <span class="name">40대</span>
//          <span class="rating">★ ${(data.ratings_by_age && data.ratings_by_age['40s']?.rating) || 'N/A'} (${(data.ratings_by_age && data.ratings_by_age['40s']?.count) || 0}개)</span>
//      </div>
//      <div class="store-item">
//          <span class="name">친구들 평점</span>
//          <span class="rating">★ ${data.friends_rating || 'N/A'} (${data.friends_reviews || 0}개)</span>
//      </div>
//  `;
//}}

//코멘트 목록 조회 및 표시
function fetchComments() {
    const commentList = document.querySelector(".panel-footer-body ul.chat");
    if (!commentList) {
        console.error('코멘트 목록 컨테이너(.panel-footer-body ul.chat)를 찾을 수 없습니다.');
        return;
    }

    getComments(data => {
        if (!data || data.length === 0) {
            commentList.innerHTML = '<li><div class="chat-full">코멘트가 없습니다.</div></li>';
            return;
        }

        let msg = '';
        data.forEach(comment => {
            msg += `
                <li data-com_no="${comment.com_no}">
                    <div class="chat-full">
                        <div class="chat-header">
                            <strong>${comment.mem_no}</strong>
                            <small class="pull-right">${formatDate(comment.com_date)}</small>
                        </div>
                        <div class="chat-body">
                            <!-- 첨부 파일은 이번 구현에서 제외 -->
                        </div>
                        <div class="chat-footer">
                            <p>${comment.com_con || '내용 없음'}</p>
                        </div>
                    </div>
                </li>
            `;
        });

        commentList.innerHTML = msg;
    });
}

// 코멘트 데이터 가져오기
function getComments(callback) {
    if (!restNo) {
        console.error("restNo가 정의되지 않았습니다.");
        callback([]);
        return;
    }

    const url = `/comment/pages/${restNo}`;
    console.log("Fetching comments URL:", url);
    fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Received comments data:", data);
        callback(data || []);
    })
    .catch(err => {
        console.error("Fetch error:", err.message);
        callback([]);
    });
}

// 코멘트 등록
function uploadComment() {
    const commentInput = document.querySelector("#comment");
    if (!commentInput) {
        console.error("코멘트 입력 필드(#COMMENT)를 찾을 수 없습니다.");
        return;
    }

    const commentContent = commentInput.value.trim();
    if (!commentContent) {
        alert("코멘트를 입력해주세요.");
        return;
    }

    if (!restNo) {
        console.error("restNo가 정의되지 않았습니다.");
        alert("가게 정보를 불러올 수 없습니다.");
        return;
    }

    const commentData = {
        rest_no: restNo,
        com_con: commentContent,
        mem_no: 1
    };

    fetch('/comment/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify(commentData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Comment uploaded:", data);
        fetchComments(); // 코멘트 목록 갱신
        commentInput.value = ''; // 입력 필드 초기화
        alert("코멘트가 등록되었습니다.");
    })
    .catch(err => {
        console.error("Upload error:", err.message);
        alert("코멘트 등록에 실패했습니다.");
    });
}

// 날짜 포맷팅 함수
function formatDate(dateString) {
    if (!dateString) return '날짜 없음';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
}

// 기존 fetchStoreDetails 수정: 코멘트 목록 조회 추가
function fetchStoreDetails() {
    const storeDetails = document.querySelector('.store-details');
    if (storeDetails) {
        storeDetails.querySelector('table').innerHTML = '<tr><td colspan="2">로딩 중...</td></tr>';
    }

    get(data => {
        renderStoreDetails(data);
        showViewList();
        fetchComments(); // 코멘트 목록 조회
    });
}

// 업로드 버튼 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", function() {
	// 기존 코드 유지
	const modal = document.getElementById('viewModal');
	modal.addEventListener('click', function (event) {
		if (event.target === modal) {
			viewModal.style.display = 'none';
			console.log(1);
		}
	});
	
	const storeDetailsElements = document.querySelectorAll('.store-details');
	if (storeDetailsElements.length > 1) {
		console.warn('store-details 요소가 중복으로 발견되었습니다. 첫 번째 요소만 유지합니다.');
		for (let i = 1; i < storeDetailsElements.length; i++) {
			storeDetailsElements[i].remove();
		}
	}
	
	const pageHeader = document.querySelector(".page-header");
	if (pageHeader) {
		restNo = pageHeader.dataset.restNo;
		console.log("Rest No: ", restNo);
	} else {
		console.error("page-header 요소를 찾을 수 없습니다.");
		restNo = null;
	}
	
	if (restNo) {
		fetchStoreDetails();
	} else {
		console.error("restNo가 없으므로 fetchStoreDetails를 호출할 수 없습니다.");
		const storeDetails = document.querySelector('.store-details');
		if (storeDetails) {
			storeDetails.querySelector('table').innerHTML = '<tr><td colspan="2">가게 정보를 불러올 수 없습니다.</td></tr>';
		}
	}
	
	// 업로드 버튼 이벤트 리스너
	const commentBtn = document.querySelector("#commentBtn");
	if (commentBtn) {
		commentBtn.addEventListener('click', uploadComment);
	}
});
*/