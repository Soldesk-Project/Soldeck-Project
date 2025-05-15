document.addEventListener('DOMContentLoaded', function() {
    var popup = document.getElementById('popup');
    var closeBtn = document.getElementById('popup-close');

    setTimeout(function() {
        popup.style.display = 'block';
    }, 1000);

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });
    document.querySelector(".pop-up_image").addEventListener('click',()=>{
    	location.href='/event/main';
    });
});

// 메인 페이지 이미지 슬라이더
const slides = document.getElementById("slides");
const slideContainers = document.querySelectorAll('#slides .slide-container');
const slideCount = slideContainers.length;
let currentImageIndex = 0;

let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let autoSlideInterval;
const autoSlideDelay = 3000; // 자동 슬라이드 간격 (3초)

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveSlider('image', 1);
    }, autoSlideDelay);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

startAutoSlide();

slides.addEventListener("mousedown", startDrag);
slides.addEventListener("mouseup", endDrag);
slides.addEventListener("mouseleave", endDrag);
slides.addEventListener("mousemove", drag);

function startDrag(e) {
    isDragging = true;
    startX = e.pageX;
    animationID = requestAnimationFrame(animation);
    stopAutoSlide();
}

function drag(e) {
    if (!isDragging) return;
    const currentPosition = e.pageX;
    const diff = currentPosition - startX;
    let tentativeTranslate = prevTranslate + diff;

    const maxTranslate = 0;
    const minTranslate = -((slides.children.length - 1) * slides.offsetWidth);

    if (tentativeTranslate > maxTranslate) {
        currentTranslate = maxTranslate;
    } else if (tentativeTranslate < minTranslate) {
        currentTranslate = minTranslate;
    } else {
        currentTranslate = tentativeTranslate;
    }
}

function endDrag() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentImageIndex < slideCount - 1) {
        currentImageIndex++;
    } else if (movedBy > 100 && currentImageIndex > 0) {
        currentImageIndex--;
    }

    setPositionByIndex();
    resetAutoSlide();
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    slides.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = -currentImageIndex * slides.offsetWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}

const sliderIndexes = { // 함수 내에서 sliderIndexes를 관리
        today: 0,
        preference: 0,
        friend: 0
    };

function moveSlider(name, direction) {
    if (name === 'image') {
        currentImageIndex += direction;

        if (currentImageIndex < 0) {
            currentImageIndex = slideCount - 1;
        } else if (currentImageIndex >= slideCount) {
            currentImageIndex = 0;
        }

        const translateValue = -currentImageIndex * 100 + '%';
        slides.style.transform = 'translateX(' + translateValue + ')';
        resetAutoSlide();
    } else {
        const track = document.getElementById(`${name}-slider`);
        if (!track) return;
        const items = track.children.length;
        const itemsPerPage = 3;
        const itemWidth = 340;

        const maxIndex = Math.ceil(items / itemsPerPage) - 1;
        

        if (!sliderIndexes.hasOwnProperty(name)) {
            sliderIndexes[name] = 0; // 해당 슬라이더의 인덱스 초기화
        }

        sliderIndexes[name] += direction;
        if (sliderIndexes[name] < 0) sliderIndexes[name] = 0;
        if (sliderIndexes[name] > maxIndex) sliderIndexes[name] = maxIndex;

        const translateX = -sliderIndexes[name] * itemWidth * itemsPerPage;
        track.style.transform = `translateX(${translateX}px)`;
    }
}

// 지역별 지도 이동 함수
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.btn-fir').forEach(btn => {
        btn.addEventListener('click', () => {
            let keyword = btn.getAttribute("value");
            console.log("클릭된 키워드:", keyword);
            sessionStorage.setItem('keyword', keyword);
            sessionStorage.setItem('actionType', 'category');
            location.href = "../search/map";
        });
    });
});

const userData = document.getElementById('user-data');
const user_no = userData.dataset.user || '';

document.addEventListener('DOMContentLoaded', () => {
	fetchData();
	showRating();
	showReview();
	rankRestEventListeners();
});

// 가게 클릭 이벤트
function showRestEventListeners() {
    document.querySelectorAll('.recommendation-slider-window').forEach(window => {
        window.addEventListener('click', (event) => {
            const item = event.target.closest('.recommendation-item');
            if (!item) return;

            const rest_no = item.dataset.rest_no;
            if (rest_no) {
                location.href = `/search/view?rest_no=${rest_no}`;
            }
        });
    });
}

// 병렬 fetch
function fetchData() {
    const headers = { 'Accept': 'application/json' };

    const todayPromise = fetch('/search/index/todayData', { headers })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .catch(err => {
            console.error("Today fetch error:", err);
            return [];
        });

    const preferencePromise = user_no
        ? fetch('/search/index/likeKateData', { headers })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .catch(err => {
                console.error("Preference fetch error:", err);
                return [];
            })
        : Promise.resolve([]);

    Promise.all([todayPromise, preferencePromise]).then(([todayData, preferenceData]) => {
    	showList("today-slider", todayData);
        if (user_no) {
        	showList("preference-slider", preferenceData);
        }
        showRestEventListeners(); // 한 번만 호출
    });
}

function showList(containerId, dataArray) {
    const container = document.getElementById(containerId);
    if (!container || !Array.isArray(dataArray)) {
        console.error(`Invalid container or data for ${containerId}`);
        return;
    }

    container.innerHTML = dataArray.map(json => {
        const rest_no = json.rest_no || 'default';
        const img_src = json.rest_img_name || '';
        return `
            <div class="recommendation-item" data-rest_no="${rest_no}">
                <img src="${img_src}" alt="이미지 없음" onerror="this.src='/resources/images/noImage.png';">
            </div>
        `;
//                <p>${json.rest_name || '이름 없음'}</p>; // 가게 이름 필요하면 return의 </div>위에 넣기
    }).join('');
}

// 탭 클릭 이벤트
document.querySelectorAll('.rank-header > div').forEach(tap => {
  tap.addEventListener('click', () => {
    const tabType = tap.getAttribute('data-tab');

    // 탭 스타일 업데이트
    document.querySelectorAll('.rank-header > div').forEach(t => t.classList.remove('active'));
    tap.classList.add('active');

    // 콘텐츠 전환
    document.querySelectorAll('.rank-content > div').forEach(content => {
      content.classList.remove('show');
    });
    document.querySelector(`.content-${tabType}`).classList.add('show');
  });
});

// 가게 클릭 이벤트
function rankRestEventListeners() {
    document.querySelectorAll('.rank-content').forEach(window => {
        window.addEventListener('click', (event) => {
            const item = event.target.closest('.reviews, .ratings, .rating_img, .review_img');
            if (!item) return;

            const rest_no = item.dataset.rest_no;
            if (rest_no) {
                location.href = `/search/view?rest_no=${rest_no}`;
            }
        });
    });
}

function getRating(callback) {
    const url = `/comment/restAvgRate`;
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
    	console.log(data);
        callback(data || {});
    })
    .catch(err => {
        console.error("Fetch error:", err.message);
        callback({});
    });
}

function showRating() {
	const rating = document.querySelector('.content-rating');
	if (!rating) {
		console.error('평점 정보(.content-rating show)를 찾을 수 없습니다.');
		return;
	}
	let rate = 1;
	getRating(jsonArray => {
		let imagesHtml = '<div class="rating-images">';
		let infoHtml = '<div class="rating-infos">';
		
		jsonArray.forEach(json => {
			// 이미지 영역
			imagesHtml += `<div class="rating_img" data-rest_no="${json.rest_no}">`;
			imagesHtml += `<img src="${json.rest_img_name || '/resources/images/noImage.png'}" alt="이미지 없음" onerror="this.src='/resources/images/noImage.png';">`;
			imagesHtml += `</div>`;

			// 정보 영역
			infoHtml += `<div class="ratings" data-rest_no="${json.rest_no}">`;
			infoHtml += 	`<div class="rating_rate">${rate}.</div>`;
			infoHtml += 	`<div class="rating_name">${json.rest_name}</div>`;
			infoHtml += 	`<div class="rating_avg_rate">${json.avg_rate}점</div>`;
			infoHtml += 	`<div class="rating_cate">${json.rest_cate}</div>`;
			infoHtml += `</div>`;
			rate += 1;
		});

		imagesHtml += '</div>';
		infoHtml += '</div>';

		// 최종 조합
		rating.innerHTML = imagesHtml + infoHtml;
	});
}

function getReview(callback) {
	const url = `/comment/restReviewCount`;
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
		console.log(data);
		callback(data || {});
	})
	.catch(err => {
		console.error("Fetch error:", err.message);
		callback({});
	});
}
function showReview() {
	const review = document.querySelector('.content-review');
	if (!review) {
		console.error('리뷰 정보(.content-review)를 찾을 수 없습니다.');
		return;
	}
	let rate = 1;
	getReview(jsonArray => {
		let imagesHtml = '<div class="review-images">';
		let infoHtml = '<div class="review-infos">';
		
		jsonArray.forEach(json => {
			// 이미지 영역
			imagesHtml += `<div class="review_img" data-rest_no="${json.rest_no}">`;
			imagesHtml += `<img src="${json.rest_img_name || '/resources/images/noImage.png'}" alt="이미지 없음" onerror="this.src='/resources/images/noImage.png';">`;
			imagesHtml += `</div>`;

			// 정보 영역
			infoHtml += `<div class="reviews" data-rest_no="${json.rest_no}">`;
			infoHtml += 	`<div class="review_rate">${rate}.</div>`;
			infoHtml += 	`<div class="review_name">${json.rest_name}</div>`;
			infoHtml += 	`<div class="review_count">${json.com_count}개</div>`;
			infoHtml += 	`<div class="review_cate">${json.rest_cate}</div>`;
			infoHtml += `</div>`;
			rate += 1;
		});

		imagesHtml += '</div>';
		infoHtml += '</div>';

		// 최종 조합
		review.innerHTML = imagesHtml + infoHtml;
	});
}

//날짜 시간 자동 나오게 하기
function updateDateTime() {
    const now = new Date();

    // 날짜와 시간 구성
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const formatted = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;

    // 출력
    document.getElementById("today-datetime").textContent = formatted;
  }

  // 최초 실행
  updateDateTime();

  // 1초마다 갱신
  setInterval(updateDateTime, 1000);