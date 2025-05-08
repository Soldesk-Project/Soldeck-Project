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

todayList();
// 오늘의 추천 픽 보여주기
function todayList() {
	const imageUL = document.getElementById("today-slider");

	let msg = '';
	  getTodayList(jsonArray => {
	  	  if (!Array.isArray(jsonArray)) {
	  		  console.error('jsonArray가 배열이 아닙니다:', jsonArray);
	      return;
	  	  }
		  
		  for (let i = jsonArray.length - 1; i > 0; i--) {
		      const j = Math.floor(Math.random() * (i + 1));
		      [jsonArray[i], jsonArray[j]] = [jsonArray[j], jsonArray[i]];
		  }

		  const limitedArray = jsonArray.slice(0, 300);

		  limitedArray.forEach(json => {
		      const rest_no = json.rest_no || 'default';
		      msg += `<div class="recommendation-item" data-rest_no="${rest_no}"><img src="${json.rest_img_name || ''}" alt="이미지 없음" onerror="this.src='/resources/images/noImage.png';">`;
//		      msg += `<p>${json.rest_name || '이름 없음'}</p>`;
		      msg += `</div>`;
		  });

		  imageUL.innerHTML = msg;
		  setupEventListeners();
	  });
}
// 오늘의 추천 픽 데이터 가져오기
function getTodayList(callback) {
	const url = `/search/index/todayData`;
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

// 오늘의 추천 픽 클릭 이벤트
function setupEventListeners() {
    const sliderWindows = document.querySelectorAll('.recommendation-slider-window');
    if (!sliderWindows.length) {
        console.error('recommendation-slider-window 요소를 찾을 수 없습니다.');
        return;
    }

    sliderWindows.forEach(window => {
        window.addEventListener('click', (event) => {
            if (event.target.tagName === 'IMG' || event.target.tagName === 'P') {
                if (event.target.tagName === 'IMG') {
                    const imageSrc = event.target.src;
                }
                if (event.target.tagName === 'P') {
                    const storeName = event.target.textContent;
                }

                const item = event.target.closest('.recommendation-item');
                if (!item) {
                    console.error('recommendation-item 요소를 찾을 수 없습니다.');
                    return;
                }

                const rest_no = item.dataset.rest_no;
                location.href = `/search/view?rest_no=${rest_no}`;
            }
        });
    });
}
const userData = document.getElementById('user-data');
const user_no = userData.dataset.user || ''; // 검색어 추가
if(user_no != ''){
	LikeKateList();
}
	
//유저 선호음식 추천 픽 보여주기
function LikeKateList() {
	const imageUL = document.getElementById("preference-slider");

	let msg = '';
	getLikeKateList(jsonArray => {
	  	  if (!Array.isArray(jsonArray)) {
	  		  console.error('jsonArray가 배열이 아닙니다:', jsonArray);
	      return;
	  	  }
		  
		  for (let i = jsonArray.length - 1; i > 0; i--) {
		      const j = Math.floor(Math.random() * (i + 1));
		      [jsonArray[i], jsonArray[j]] = [jsonArray[j], jsonArray[i]];
		  }

		  const limitedArray = jsonArray.slice(0, 300);

		  limitedArray.forEach(json => {
		      const rest_no = json.rest_no || 'default';
		      msg += `<div class="recommendation-item" data-rest_no="${rest_no}"><img src="${json.rest_img_name || ''}" alt="이미지 없음" onerror="this.src='/resources/images/noImage.png';">`;
//		      msg += `<p>${json.rest_name || '이름 없음'}</p>`;
		      msg += `</div>`;
		  });

		  imageUL.innerHTML = msg;
		  setupEventListeners();
	  });
}

// 유저 선호음식 추천 픽 데이터 가져오기
function getLikeKateList(callback) {
	const url = `/search/index/likeKateData`;
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