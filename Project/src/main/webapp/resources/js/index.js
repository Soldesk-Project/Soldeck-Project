document.addEventListener('DOMContentLoaded', function() {
    var popup = document.getElementById('popup');
    var closeBtn = document.getElementById('popup-close');

    // 팝업 표시 (예시: 페이지 로드 후 1초 뒤에 표시)
    setTimeout(function() {
        popup.style.display = 'block'; // 'flex' 대신 'block' 사용
    }, 1000);

    // 팝업 닫기
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });
});

// 메인 페이지 슬라이더 형식 
const slides = document.getElementById("slides");

let isDragging = false;
let startX = 0;
let currentTranslate = 0;

//3초마다 이미지 넘어가는 기능
setInterval(() => {
    currentSlideIndex++;
    if (currentSlideIndex >= slides.children.length) {
        currentSlideIndex = 0;
    }
    setPositionByIndex();
}, 3000);

let prevTranslate = 0;
let animationID;
let currentSlideIndex = 0;

slides.addEventListener("mousedown", startDrag);
slides.addEventListener("mouseup", endDrag);
slides.addEventListener("mouseleave", endDrag);
slides.addEventListener("mousemove", drag);

function startDrag(e) {
    isDragging = true;
    startX = e.pageX;
    animationID = requestAnimationFrame(animation);
}

function drag(e) {
    if (!isDragging) return;
    const currentPosition = e.pageX;
    const diff = currentPosition - startX;
    let tentativeTranslate = prevTranslate + diff;

    //최대/최소 이동 거리 제한
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

    if (movedBy < -100 && currentSlideIndex < slides.children.length - 1) {
        currentSlideIndex++;
    } else if (movedBy > 100 && currentSlideIndex > 0) {
        currentSlideIndex--;
    }

    setPositionByIndex();
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    slides.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = -currentSlideIndex * slides.offsetWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}


// pick 화면 3개씩 이동
const sliderIndexes = {
	    today: 0,
	    preference: 0,
	    friend: 0
	};

function moveSlider(name, direction) {
    const track = document.getElementById(`${name}-slider`);
    const items = track.children.length;
    const itemsPerPage = 3;
    const itemWidth = 340; // 320px + 20px margin

    const maxIndex = Math.ceil(items / itemsPerPage) - 1;

    sliderIndexes[name] += direction;
    if (sliderIndexes[name] < 0) sliderIndexes[name] = 0;
    if (sliderIndexes[name] > maxIndex) sliderIndexes[name] = maxIndex;

    const translateX = -sliderIndexes[name] * itemWidth * itemsPerPage;
    track.style.transform = `translateX(${translateX}px)`;
}

// 지역별 지도 이동 함수
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.btn-fir').forEach(btn => {
        btn.addEventListener('click', () => {
            let keyword = btn.getAttribute("value"); // 한식, 중식 등
            console.log("클릭된 키워드:", keyword);
            sessionStorage.setItem('keyword', keyword);
            sessionStorage.setItem('actionType', 'category'); // 행동 유형 저장
            location.href = "../search/map"; // 그냥 이동
        });
    });
});