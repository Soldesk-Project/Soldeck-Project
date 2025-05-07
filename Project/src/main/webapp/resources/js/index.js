document.addEventListener('DOMContentLoaded', function() {
    var popup = document.getElementById('popup');
    var closeBtn = document.getElementById('popup-close');

    setTimeout(function() {
        popup.style.display = 'block';
    }, 1000);

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
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
        const sliderIndexes = { // 함수 내에서 sliderIndexes를 관리
            today: 0,
            preference: 0,
            friend: 0
        };

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