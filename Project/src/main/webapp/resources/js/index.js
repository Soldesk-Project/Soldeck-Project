document.addEventListener('DOMContentLoaded', function() {
    var popup = document.getElementById('popup');
    var popupCloseBtn = document.getElementById('popupClose');
    var slides = document.querySelectorAll('.slideContainer');
    var dots = document.querySelectorAll('.dot');
    var locationSelect = document.querySelector('.locationSelect select');
    var categoryBtns = document.querySelectorAll('.categoryBtn');
    var selectedLocation = ''; // 선택된 지역 정보를 저장할 변수
    var selectedCategory = ''; // 선택된 카테고리 정보를 저장할 변수
    var defaultLocationText = '지역 선택'; // 기본 지역 선택 옵션 텍스트

    // 팝업 표시 (예시: 페이지 로드 후 1초 뒤에 표시)
    setTimeout(function() {
        popup.style.display = 'block'; // 'flex' 대신 'block' 사용
    }, 1000);

    // 팝업 닫기
    popupCloseBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // dot 클릭 이벤트 리스너 추가
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            // 모든 슬라이드 숨기기
            slides.forEach(function(slide) {
                slide.style.display = 'none';
            });

            // 클릭된 dot에 해당하는 슬라이드 보이기
            slides[index].style.display = 'block';

            // 모든 dot에서 'active' 클래스 제거
            dots.forEach(function(d) {
                d.classList.remove('active');
            });

            // 클릭된 dot에 'active' 클래스 추가
            this.classList.add('active');
        });
    });

    // 초기 슬라이드 설정 (첫 번째 슬라이드만 보이도록)
    if (slides.length > 0) {
        slides[0].style.display = 'block';
    }

    // 지역 선택 이벤트 리스너
    locationSelect.addEventListener('change', function() {
        selectedLocation = this.value;
        if (selectedLocation && selectedLocation !== defaultLocationText && selectedCategory) {
            window.location.href = `../search/location?region=${selectedLocation}&category=${selectedCategory}`;
        } else if (selectedLocation && selectedLocation !== defaultLocationText && !selectedCategory) {
        } else {
            selectedLocation = '';
        }
    });

    // 카테고리 버튼 클릭 이벤트 리스너
    categoryBtns.forEach(function(button) {
        button.addEventListener('click', function() {
            selectedCategory = this.textContent;
            if (selectedLocation && selectedLocation !== defaultLocationText && selectedCategory) {
                window.location.href = `../search/location?region=${selectedLocation}&category=${selectedCategory}`;
            }
        });
    });
});