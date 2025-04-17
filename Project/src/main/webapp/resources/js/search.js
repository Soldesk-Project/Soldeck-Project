// CSS 파일 추가
const CSS_FILE_PATH = '/resources/css/search.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);

// 오늘의 추천 pick
showLocationList();

function showLocationList() {
    const imageUL = document.querySelector(".slides-wrapper");
    let msg = '';

    getList(jsonArray => {
        // 데이터로 슬라이드 생성
        jsonArray.forEach(json => {
            msg += `<div class="slide">`
            msg += `<img src="${json.sumnail}" alt="이미지 1">`
            msg += `<p>${json.rest_name}</p>`
            msg += `</div>`
        });
        imageUL.innerHTML = msg;

        // DOM 업데이트 후 슬라이드 변수 초기화
        initializeSlides();
    });
}

function getList(callback) {
    fetch(`/search/search/data`, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json()) 
    .then(data => {
        callback(data);
    })
    .catch(err => console.log(err));
}

// 슬라이드 관련 변수 초기화 함수
let currentIndex = 0;
let slidesWrapper;
let slides;
let totalSlides;
let visibleSlides = 3;

function initializeSlides() {
    slidesWrapper = document.querySelector('.slides-wrapper');
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;

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
    const offset = currentIndex * (100 / visibleSlides);
    slidesWrapper.style.transform = `translateX(-${offset}%)`;
}

// 검색 결과
showSearchList();
function showSearchList(){
	const imageUL = document.querySelector(".store-con");
	let msg = '';
	msg +=`<div class="store-block">`
	msg +=`<div class="store-image">`
	msg +=`<img src="https://img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E" alt="가게 이미지 1">`
	msg +=`</div>`
	msg +=`<div class="store-info">`
	msg +=`<p class="store-name">가게 이름</p>`
	msg +=`<p class="store-type">가게 종류</p>`
	msg +=`<p class="store-hours">영업 시간</p>`
	msg +=`</div>`
	msg +=`</div>`
	msg +=`<div class="store-block">`
	msg +=`<div class="store-image">`
	msg +=`<img src="https://img1.kakaocdn.net/cthumb/local/C264x196.q50/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2F42F0E8B92BBD4145B7B7F3A8C66092AD" alt="가게 이미지 1">`
	msg +=`</div>`
	msg +=`<div class="store-info">`
	msg +=`<p class="store-name">가게 이름</p>`
	msg +=`<p class="store-type">가게 종류</p>`
	msg +=`<p class="store-hours">영업 시간</p>`
	msg +=`</div>`
	msg +=`</div>`
	msg +=`<div class="store-block">`
	msg +=`<div class="store-image">`
	msg +=`<img src="https://img1.kakaocdn.net/cthumb/local/C640x960.q50/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2FF5F4393C6D35419B9545F2F230E5D334" alt="가게 이미지 1">`
	msg +=`</div>`
	msg +=`<div class="store-info">`
	msg +=`<p class="store-name">가게 이름</p>`
	msg +=`<p class="store-type">가게 종류</p>`
	msg +=`<p class="store-hours">영업 시간</p>`
	msg +=`</div>`
	msg +=`</div>`
			imageUL.innerHTML = msg;
}