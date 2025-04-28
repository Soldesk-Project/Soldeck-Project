// CSS 파일 추가
const CSS_FILE_PATH = '/resources/css/view.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);

// 전역 변수 정의
const login_data = document.getElementById('login-data');
const initialmem_no = login_data.dataset.mem_no || '';
let mem_no = initialmem_no;
console.log(mem_no);
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
let selectedMonth = new Date().getMonth() + 1; // 초기 월을 현재 월로 설정

//JSP에서 시간 슬롯 가져오기
const timeButtons = document.querySelectorAll('.time-options .time-btn');
const timeSlots = Array.from(timeButtons).map(button => button.textContent.trim());

const stars = document.querySelectorAll('#starRating .star');
let ratingValue = 0;

stars.forEach(star => {
    star.addEventListener('click', () => {
        ratingValue = parseInt(star.getAttribute('data-value'));
        updateStars(ratingValue);
//        console.log('선택된 별점:', ratingValue); // 변환된 데이터 확인
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
        //console.log("Rest No: ", restNo);
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
//                console.log(1);
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
            selectedMonth = new Date().getMonth() + 1; // 현재 월로 설정
            if (monthSelect) monthSelect.value = selectedMonth.toString();
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
            if (btn.disabled) return; // 비활성화된 버튼은 클릭 무시
            timeButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedTime = btn.textContent;
        });
    });

    // 예약 확인 버튼
    if (confirmReservationBtn) {
        confirmReservationBtn.addEventListener('click', () => {
            if (!selectedDate || !selectedTime || !selectedMonth) {
                alert('날짜와 시간을 선택해주세요.');
                return;
            }
            const resDate = `2025-${selectedMonth}-${selectedDate}`; // 예: "2025-4-24"
            // resDate 형식 검증
            if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(resDate)) {
                alert('유효한 날짜 형식이 아닙니다.');
                return;
            }
            const reservationData = {
                rest_no: restNo,
                mem_no: mem_no,
                res_date: resDate,
                res_time: selectedTime,
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
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errData => {
                        throw new Error(errData.message || '서버 오류');
                    });
                }
                return response.json();
            })
            .then(data => {
                alert(`예약이 완료되었습니다!\n날짜: 2025년 ${selectedMonth}월 ${selectedDate}일\n시간: ${selectedTime}`);
                reservationModal.style.display = 'none';
                resetSelections();
                updateTimeSlots(restNo, resDate); // 시간 슬롯 갱신
            })
            .catch(err => alert('예약 실패: ' + err.message));
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
        showAvgRate();
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
    
    // **여기에 즐겨찾기 버튼 이벤트 리스너 코드를 추가하세요.**
    const favoriteBtn = document.querySelector('.favorite-btn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            if (mem_no === '0' || !mem_no) {
                alert('로그인이 필요한 기능입니다.');
                window.location.href = '/login/loginPage';
            } else {
                alert('즐겨찾기 기능은 아직 구현 중입니다.');
             // 여기에 실제 즐겨찾기 추가 로직을 구현해야 합니다.
            }
        });
    }
}

// 데이터 가져오기 공통 함수
function get(callback) {
    if (!restNo) {
        console.error("restNo가 정의되지 않았습니다.");
        callback({});
        return;
    }

    const url = `/search/view/${restNo}`;
//    console.log("Fetching URL:", url);
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
        console.log("View Fetch data:", data);
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
        console.log("stores Fetch data:", data);
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

// 달력 및 예약 기능 -----------------------------------------
function renderCalendar(month) {
    if (!calendarDays) return;
    calendarDays.innerHTML = '';

    const year = new Date().getFullYear();
    const daysInMonth = new Date(year, month, 0).getDate(); // 수정: getTERMS OF SERVICEate() → getDate()
    const firstDay = new Date(year, month - 1, 1).getDay();
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevMonthYear = month === 1 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevMonthYear, prevMonth, 0).getDate(); // 수정: getTERMS OF SERVICEate() → getDate()
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

        const today = new Date();
        const currentDate = new Date(year, month - 1, i);
        if (currentDate < today.setHours(0, 0, 0, 0)) {
            day.classList.add('disabled');
        } else {
            day.addEventListener('click', () => {
                const days = document.querySelectorAll('.day:not(.disabled)');
                days.forEach(d => d.classList.remove('selected'));
                day.classList.add('selected');
                selectedDate = day.textContent;
                const resDate = `2025-${month}-${selectedDate}`;
                updateTimeSlots(restNo, resDate);
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
    selectedMonth = new Date().getMonth() + 1; // 현재 월로 초기화
    if (monthSelect) monthSelect.value = selectedMonth.toString();
    const days = document.querySelectorAll('.day:not(.disabled)');
    days.forEach(day => day.classList.remove('selected'));
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(btn => btn.classList.remove('selected'));
    renderCalendar(selectedMonth);
}

//시간 슬롯 비활성화 함수
function updateTimeSlots(restNo, resDate) {
    fetch(`/search/reservations/times?rest_no=${restNo}&res_date=${resDate}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {
                throw new Error(errData.message || '서버 오류');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            const reservedTimes = data.reservedTimes || [];
            timeButtons.forEach(button => {
                const time = button.textContent.trim();
                button.disabled = false; // 기본적으로 활성화
                button.classList.remove('disabled');
                if (reservedTimes.includes(time)) {
                    button.disabled = true;
                    button.classList.add('disabled');
                    button.title = '이미 예약된 시간입니다.';
                }
            });
        } else {
            throw new Error(data.message || '예약된 시간 조회 실패');
        }
    })
    .catch(err => {
        console.error('예약된 시간 조회 실패:', err.message);
        timeButtons.forEach(button => {
            button.disabled = false;
            button.classList.remove('disabled');
        });
    });
}

// 코멘트 목록 조회 및 표시 -----------------------------------------------
function fetchComments() {
    const commentList = document.querySelector(".panel-footer-body ul.chat");
    if (!commentList) {
        console.error('코멘트 목록 컨테이너(.panel-footer-body ul.chat)를 찾을 수 없습니다.');
        return;
    }

    getComments(data => {
        console.log("Received comments data:", data); // 디버깅 로그
        if (!data || data.length === 0) {
            commentList.innerHTML = '<li><div class="chat-full">코멘트가 없습니다.</div></li>';
            return;
        }

        const seenComNos = new Set();
        let msg = '';
        data.forEach(comment => {
            if (seenComNos.has(comment.com_no)) {
                return;
            }
            seenComNos.add(comment.com_no);

            const rate = parseInt(comment.com_rate) || 0;
            let starsHtml = '<div class="comment-rating">';
            for (let i = 1; i <= 5; i++) {
                const starClass = i <= rate ? 'star filled' : 'star';
                starsHtml += `<div class="${starClass}"></div>`;
            }
            starsHtml += '</div>';

            // 첨부 파일 처리
            let attachHtml = '';
            const attachList = comment.com_attachList || []; // null이면 빈 배열로 초기화
            if (attachList.length > 0) {
                attachHtml = '<div class="comment-attachments">';
                attachList.forEach(attach => {
                    const fileName = `${attach.att_uuid}_${attach.att_name}`;
                    const imageUrl = `${attach.att_path}/${encodeURIComponent(fileName)}`;
                    attachHtml += `
                        <div class="attachment">
                            <img src="${imageUrl}" alt="${attach.att_name}" class="comment-image" style="max-width: 100px; margin: 5px;">
                        </div>
                    `;
                });
                attachHtml += '</div>';
            } else {
                attachHtml = '<div class="comment-attachments">첨부 파일이 없습니다.</div>'; // 선택적 메시지
            }

            // 프로필 이미지 처리
            const profileImg = comment.com_memberData && comment.com_memberData.mem_img 
                ? `/resources/images/${comment.com_memberData.mem_img}` 
                : '/resources/images/profile_1.png';

            // 닉네임 처리
            const nickName = comment.com_memberData && comment.com_memberData.mem_nick 
                ? comment.com_memberData.mem_nick 
                : (comment.com_memberData && comment.com_memberData.mem_name || '익명');

            // 삭제 버튼 표시 (로그인한 사용자의 mem_no와 코멘트의 mem_no 비교)
            const isOwnComment = parseInt(mem_no) === parseInt(comment.mem_no);
            const deleteButton = isOwnComment 
                ? `<button class="comment-delete-btn" data-com_no="${comment.com_no}" aria-label="코멘트 삭제">X</button>`
                : '';

            msg += `
                <li data-com_no="${comment.com_no}">
                    <div class="chat-full">
                        <div class="chat-header">
                            <img src="${profileImg}" alt="프로필" class="profile-img">
                            <strong>${nickName}</strong>
                            <div class="header-right">
                                <small class="pull-right">${formatDate(comment.com_date)}</small>
                                ${starsHtml}
                            </div>
                            ${deleteButton}
                        </div>
                        <div class="chat-body">
                            ${attachHtml}
                        </div>
                        <div class="chat-footer">
                            <p>${comment.com_con || '내용 없음'}</p>
                        </div>
                    </div>
                </li>
            `;
        });

        commentList.innerHTML = msg;

        // 삭제 버튼 이벤트 리스너 추가 (이벤트 위임)
        commentList.addEventListener('click', handleCommentDelete);
    });
}

function getComments(callback) {
    fetch(`/comment/pages/${restNo}`, {
        method: 'GET',
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
        callback(data);
    })
    .catch(err => {
        console.error("Fetch comments error:", err.message);
        callback([]);
    });
}

// 코멘트 삭제
function handleCommentDelete(e) {
    if (e.target.classList.contains('comment-delete-btn')) {
        const comNo = e.target.getAttribute('data-com_no');
        if (!comNo) {
            console.error('com_no가 정의되지 않았습니다.');
            alert('코멘트 삭제에 실패했습니다.');
            return;
        }

        if (!mem_no || mem_no === '0') {
            alert('로그인이 필요합니다.');
            return;
        }

        if (!confirm('정말로 이 코멘트를 삭제하시겠습니까?')) {
            return;
        }

        e.target.disabled = true; // 버튼 비활성화
        e.target.textContent = '삭제 중...';

        fetch(`/comment/delete/${comNo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            // 응답이 JSON인지 확인
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                return response.text().then(text => {
                    throw new Error(`서버가 JSON이 아닌 응답을 반환했습니다: ${text.substring(0, 50)}...`);
                });
            }
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.message || '서버 오류');
                });
            }
            return response.json();
        })
        .then(data => {
            e.target.disabled = false;
            e.target.textContent = 'X';
            alert('코멘트가 삭제되었습니다.');
            fetchComments();
            showAvgRate();
        })
        .catch(err => {
            e.target.disabled = false;
            e.target.textContent = 'X';
            console.error('Delete error:', err.message);
            alert('코멘트 삭제에 실패했습니다: ' + err.message);
        });
    }
}

// 코멘트 등록
function uploadComment() {
    console.log("Before uploadComment, window.uploadedFiles:", window.uploadedFiles); // 디버깅 로그
    const commentInput = document.querySelector("#comment");
    if(mem_no == 0){
    	alert("로그인을 해주세요.");
        return;
    }
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
    if(ratingValue == 0){
    	alert("평점을 선택해주세요");
    	return;
    }
    const attachList = (window.uploadedFiles || []).map(file => ({
        att_uuid: file.att_uuid,
        att_path: file.att_path,
        att_name: file.att_name
    }));
    console.log("com_attachList:", attachList);

    const commentData = {
        rest_no: restNo,
        com_con: commentContent,
        mem_no: mem_no,
        com_rate: ratingValue,
        com_attachList: attachList
    };
    console.log("commentData:", commentData);

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
        showAvgRate();
        commentInput.value = '';
        ratingValue = 0;
        updateStars(0);
        window.uploadedFiles = []; // 초기화
        document.querySelector('.uploadResult ul').innerHTML = '';
        alert("코멘트가 등록되었습니다.");
    })
    .catch(err => {
        console.error("Upload error:", err.message);
        alert("코멘트 등록에 실패했습니다.");
    });
}

// 코멘트 날짜 포맷팅 함수
function formatDate(dateString) {
    if (!dateString) return '날짜 없음';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

// 평점 평균 관련---------------------------
function getAvgRate(callback) {
    if (!restNo) {
        console.error("restNo가 정의되지 않았습니다.");
        callback(null);
        return;
    }
    fetch(`/comment/rate/${restNo}`, {
        method: 'GET',
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
        callback(data);
    })
    .catch(err => {
        console.error("Fetch avg rate error:", err.message);
        callback(null);
    });
}

function showAvgRate() {
    const avgRate = document.querySelector(".store-list");
    getAvgRate(jsonArray => {
        let msg = '';
        msg += `<div class="store-item">`;
        msg += `<span class="name">가게 총 평점</span>`;
        const avg = typeof jsonArray === 'number' && !isNaN(jsonArray) ? jsonArray.toFixed(1) : '0.0';
        msg += `<span class="rating">${avg}</span>`;
        msg += `</div>`;
        msg += `<div class="store-item" id="age_rate">`;
        msg += `<span class="name">&lt;연령별 평점&gt;</span>`;
        msg += `</div>`;
        msg += `<div class="store-item">`;
        msg +=  `<span class="name">10대</span>`;
        msg +=  `<span class="rating">로딩 중...</span>`;
        msg += `</div>`;
        msg += `<div class="store-item">`;
        msg +=    `<span class="name">20대</span>`;
        msg +=    `<span class="rating">로딩 중...</span>`;
        msg +=  `</div>`;
        msg += `<div class="store-item">`;
        msg +=   `<span class="name">30대</span>`;
        msg +=   `<span class="rating">로딩 중...</span>`;
        msg +=  `</div>`;
        msg += `<div class="store-item">`;
        msg +=   `<span class="name">40대</span>`;
        msg +=   `<span class="rating">로딩 중...</span>`;
        msg += `</div>`;
        msg += `<div class="store-item">`;
        msg +=   `<span class="name">친구들 평점</span>`;
        msg +=   `<span class="rating">로딩 중...</span>`;
        msg += `</div>`;
        avgRate.innerHTML = msg;
    });
}
