const CSS_FILE_PATH = '/resources/css/search.css';
const linkEle = Object.assign(document.createElement('link'), {
    rel: 'stylesheet',
    href: CSS_FILE_PATH
});
document.head.appendChild(linkEle);

let selectedRegion = '';
let selectedCategory = '';

// 지역 선택
const locationSelect = document.querySelector('.location-select_select');
locationSelect.addEventListener('change', function () {
    selectedRegion = this.value;
    showList();
    showSearchList();
});

// 카테고리 선택
const categoryButtons = document.querySelectorAll('.kategorie-list button');
categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const categoryMap = {
            korBtn: '한식',
            chnBtn: '중식',
            japBtn: '일식',
            wesBtn: '양식',
            vietBtn: '베트남식'
        };
        selectedCategory = categoryMap[this.id] || '';
        showList();
        showSearchList();
    });
});

// 오늘의 추천 픽 클릭 이벤트
function setupEventListeners() {
    const imageCon = document.querySelector('.slideshow-container');
    if (!imageCon) {
        console.error('slideshow-container 요소를 찾을 수 없습니다.');
        return;
    }

    imageCon.addEventListener('click', (event) => {
    	// 드래그로 판단되면 클릭 이벤트 무시
        if (Math.abs(dragDistance) > DRAG_THRESHOLD) {
            return;
        }
        
        if (event.target.tagName === 'IMG' || event.target.tagName === 'P') {
            if (event.target.tagName === 'IMG') {
                const imageSrc = event.target.src;
            }
            if (event.target.tagName === 'P') {
                const storeName = event.target.textContent;
            }

            const slide = event.target.closest('.slide');
            if (!slide) {
                console.error('slide 요소를 찾을 수 없습니다.');
                return;
            }

            const restNo = slide.dataset.restNo;
            if (!restNo) {
                console.error('restNo 값을 찾을 수 없습니다. 기본값 1을 사용합니다.');
                window.location.href = `/search/view?rest_no=1`;
                return;
            }

            window.location.href = `/search/view?rest_no=${restNo}`;
        }
    });
}

showList();
//오늘의 추천 픽 보여주기
function showList() {
    const imageUL = document.querySelector(".slides-wrapper");
    if (!imageUL) {
        console.error('slides-wrapper 요소를 찾을 수 없습니다.');
        return;
    }

    let msg = '';
    getList(jsonArray => {
    	if (!Array.isArray(jsonArray)) {
            console.error('jsonArray가 배열이 아닙니다:', jsonArray);
            return;
        }

        for (let i = jsonArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [jsonArray[i], jsonArray[j]] = [jsonArray[j], jsonArray[i]];
        }

        const limitedArray = jsonArray.slice(0, 100);

        if (limitedArray.length === 0) {
            imageUL.innerHTML = '<div class="no-data">표시할 데이터가 없습니다.</div>';
            setupEventListeners(); // 데이터 없어도 이벤트 리스너 설정
            return;
        }

        limitedArray.forEach(json => {
            const restNo = json.rest_no || 'default';
            msg += `<div class="slide" data-rest-no="${restNo}">`;
            msg += `<img src="${json.rest_img_name || ''}" alt="이미지 없음" draggable="false" onerror="this.src='/resources/images/noImage.png';">`;
            msg += `<p>${json.rest_name || '이름 없음'}</p>`;
            msg += `</div>`;
        });

        imageUL.innerHTML = msg;
        initializeSlides();
        setupEventListeners(); // 동적 HTML 생성 후 이벤트 리스너 설정
    });
}

// 오늘의 추천 픽 데이터 가져오기
function getList(callback) {
	const params = new URLSearchParams();
    if (selectedRegion) params.append('region', selectedRegion);
    if (selectedCategory) params.append('category', selectedCategory);
    const url = `/search/search/filterData${params.toString() ? '?' + params.toString() : ''}`;
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
            callback(data || []); // 데이터가 없으면 빈 배열 전달
        })
        .catch(err => {
            console.error("Fetch error:", err.message);
            callback([]); // 에러 발생 시 빈 배열 전달
        });
}

// 슬라이드 관련 변수 초기화 함수
let currentIndex = 0;
let slidesWrapper;
let slides;
let totalSlides;
let visibleSlides = 3;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationId = null;
let dragDistance = 0; // 드래그 이동 거리
const DRAG_THRESHOLD = 10; // 드래그로 간주할 최소 이동 거리 (픽셀)

function initializeSlides() {
    slidesWrapper = document.querySelector('.slides-wrapper');
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;

    // 슬라이드가 없으면 초기화 중단
    if (totalSlides === 0) {
        console.warn("No slides available to initialize.");
        return;
    }

    // 슬라이드 초기 위치 설정
    slidesWrapper.style.transform = `translateX(0px)`;

    // 드래그 이벤트 리스너 추가
    slidesWrapper.addEventListener('mousedown', startDragging);
    slidesWrapper.addEventListener('mousemove', drag);
    slidesWrapper.addEventListener('mouseup', stopDragging);
    slidesWrapper.addEventListener('mouseleave', stopDragging);

    // 터치 이벤트 지원 (모바일 호환)
    slidesWrapper.addEventListener('touchstart', startDragging);
    slidesWrapper.addEventListener('touchmove', drag);
    slidesWrapper.addEventListener('touchend', stopDragging);

    // 이미지 드래그 및 선택 방지
    slidesWrapper.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', e => e.preventDefault());
        img.addEventListener('selectstart', e => e.preventDefault());
    });

    // 슬라이드 컨테이너에 CSS 스타일 추가
    slidesWrapper.style.userSelect = 'none'; // 텍스트 선택 방지
}

function startDragging(e) {
    e.preventDefault(); // 기본 이벤트 방지
    // 슬라이드가 없으면 드래그 시작하지 않음
    if (totalSlides === 0) return;

    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    prevTranslate = currentTranslate;
    dragDistance = 0; // 드래그 거리 초기화

    // 드래그 중 부드러운 이동을 위해 transition 제거
    slidesWrapper.style.transition = 'none';

    // 애니메이션 프레임 시작
    cancelAnimationFrame(animationId);
}

function drag(e) {
    if (!isDragging) return;

    const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const deltaX = currentX - startX;
    currentTranslate = prevTranslate + deltaX;
    dragDistance = deltaX; // 드래그 거리 갱신

    // 부드러운 이동을 위해 requestAnimationFrame 사용
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(() => {
        slidesWrapper.style.transform = `translateX(${currentTranslate}px)`;
    });
}

function stopDragging() {
    if (!isDragging) return;
    isDragging = false;
    
    // 슬라이드가 없으면 스냅 처리 중단
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;
    if (totalSlides === 0) {
        console.warn("No slides available to snap.");
        return;
    }

    // 드래그 종료 시 가장 가까운 슬라이드로 스냅
    const slideWidth = slides[0].offsetWidth || 0; // slides[0]은 여기서 존재함
    currentIndex = Math.round(-currentTranslate / slideWidth);

    // 경계 처리
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > totalSlides - visibleSlides) currentIndex = totalSlides - visibleSlides;

    // 스냅 애니메이션 적용
    currentTranslate = currentIndex * -slideWidth;
    slidesWrapper.style.transition = 'transform 0.3s ease-out';
    slidesWrapper.style.transform = `translateX(${currentTranslate}px)`;

    // 애니메이션 프레임 정리
    cancelAnimationFrame(animationId);
}

function moveSlide(direction) {
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;

    // 슬라이드가 없으면 이동 중단
    if (totalSlides === 0) {
        console.warn("No slides available to move.");
        return;
    }

    // 슬라이드 이동 로직 초기화
    if (totalSlides > 0) {
        slidesWrapper.style.transform = `translateX(0%)`;
    }
}

function moveSlide(direction) {
    // 최신 슬라이드 상태 반영
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;

    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > totalSlides - visibleSlides) {
        currentIndex = totalSlides - visibleSlides;
    }

    // 버튼 클릭 시 픽셀 단위로 이동
    const slideWidth = slides[0].offsetWidth || 0;
    currentTranslate = currentIndex * -slideWidth;
    slidesWrapper.style.transition = 'transform 0.3s ease-out';
    slidesWrapper.style.transform = `translateX(${currentTranslate}px)`;
}


// 검색 관련 시작
//Model 속성 읽기 (검색어 포함)
const locationData = document.getElementById('location-data');
const initialKeyword = locationData.dataset.keyword || ''; // 검색어 추가
let searchKeyword = initialKeyword; // 초기 검색어 설정

//페이지 로드 시 검색어 반영
if (initialKeyword) {
    showSearchList(); // 초기 검색어로 검색 결과 표시
}

// 검색 가게 클릭 이벤트
function setupEventListeners2() {
    const storeCon = document.querySelector('.store-con');
    if (!storeCon) {
        console.error('store-con 요소를 찾을 수 없습니다.');
        return;
    }

    storeCon.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG' || (event.target.tagName === 'P' && event.target.classList.contains('store-name'))) {
            if (event.target.tagName === 'IMG') {
                const imageSrc = event.target.src;
            }
            if (event.target.tagName === 'P') {
                const storeName = event.target.textContent;
            }

            const storeBlock = event.target.closest('.store-block');
            if (!storeBlock) {
                console.error('store-block 요소를 찾을 수 없습니다.');
                return;
            }

            const restNo = storeBlock.dataset.restNo;
            if (!restNo || restNo === 'default') {
                console.error('restNo 값이 유효하지 않습니다. 기본값 1을 사용합니다.', { restNo, storeBlock });
                 window.location.href = `/search/view?rest_no=1`;
                return;
            }

             window.location.href = `/search/view?rest_no=${restNo}`;
        }
    });
}
showSearchList();
//검색 결과
function showSearchList() {
    const imageUL = document.querySelector(".store-con");
    if (!imageUL) {
        console.error('store-con 요소를 찾을 수 없습니다.');
        return;
    }
 
    getSearch(data => {
        let msg = '';
        
        if (!searchKeyword) {
            imageUL.innerHTML = '<div class="no-data">검색어를 입력해주세요.</div>';
            setupEventListeners2(); // 이벤트 리스너 설정
            return;
        }
        
        if (data.length === 0) {
            imageUL.innerHTML = '<div class="no-data">검색 결과가 없습니다.</div>';
            setupEventListeners2(); // 이벤트 리스너 설정
            return;
        }

        data.forEach(json => {
            const restNo = json.rest_no || 'default'; // rest_no가 없으면 기본값 설정
            msg += `<div class="store-block" data-rest-no="${restNo}">`;
            msg += `<div class="store-image">`;
            msg += `<img src="${json.rest_img_name || '/resources/images/noImage.png'}" alt="가게 이미지 1">`;
            msg += `</div>`;
            msg += `<div class="store-info">`;
            msg += `<p class="store-name">${json.rest_name || '이름 없음'}</p>`;
            msg += `<p class="store-type">${json.rest_cate || '종류 없음'}</p>`;
            msg += `<p class="store-hours">${json.rest_bh || '시간 없음'}</p>`;
            msg += `</div>`;
            msg += `</div>`;
        });

        imageUL.innerHTML = msg;
        setupEventListeners2(); // 동적 HTML 생성 후 이벤트 리스너 설정
    });
}

function getSearch(callback) {
    const params = new URLSearchParams();
    if (searchKeyword) params.append('keyword', searchKeyword);
    if (selectedRegion) params.append('region', selectedRegion);
    if (selectedCategory) params.append('category', selectedCategory);
    
    // 검색어가 없으면 요청 보내지 않음 (추가 보안)
    if (!searchKeyword) {
        callback([]);
        return;
    }

    // 기존 경로 파라미터 방식 대신 쿼리 파라미터 방식으로 변경
    const url = `/search/search/searchData${params.toString() ? '?' + params.toString() : ''}`;
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
            callback(data || []);
        })
        .catch(err => {
            console.error("Fetch error:", err.message);
            callback([]);
        });
}