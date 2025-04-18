document.addEventListener('DOMContentLoaded', function() {
    var popup = document.getElementById('popup');
    var closeBtn = document.getElementById('close');

    // 팝업 표시 (예시: 페이지 로드 후 1초 뒤에 표시)
    setTimeout(function() {
        popup.style.display = 'block'; // 'flex' 대신 'block' 사용
    }, 1000);

    // 팝업 닫기
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });
});

//dot의 기능 추가 이미지 변경
function goToSlide(index) {
    const slides = document.getElementById('slides');
    const dots = document.querySelectorAll('.dot');

    // 슬라이드 이동
    const slideWidth = slides.offsetWidth;
    slides.style.transform = `translateX(-${index * slideWidth}px)`;

    // Dot active 클래스 관리
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// 메인 페이지 슬라이더 형식 
const slides = document.getElementById("slides");

let isDragging = false;
let startX = 0;
let currentTranslate = 0;
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