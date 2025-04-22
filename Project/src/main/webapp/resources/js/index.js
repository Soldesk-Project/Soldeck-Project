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

document.addEventListener('DOMContentLoaded', () => {
	  const locationSelect = document.querySelector('.location-select select');
	  const categoryButtons = document.querySelectorAll('.kategorie-list button');

	  // 페이지 로드 시 카테고리 버튼 활성화 상태 초기화
	  categoryButtons.forEach(btn => btn.classList.remove('active'));
	  
	  locationSelect.addEventListener('change', handleFilter);
	  categoryButtons.forEach(button => {
	    button.addEventListener('click', handleFilter);
	  });

	  function handleFilter() {
	    const selectedRegion = locationSelect.value;
	    let selectedCategory = '';

	    // 카테고리 버튼 처리
	    if (this.classList.contains('btn')) {
	      categoryButtons.forEach(btn => btn.classList.remove('active'));
	      this.classList.add('active');
	      selectedCategory = this.id.slice(0, -3).toLowerCase();
	    } else if (this === locationSelect) {
	      // 지역 선택 변경 시 카테고리 선택 초기화
	      categoryButtons.forEach(btn => btn.classList.remove('active'));
	      selectedCategory = '';
	    } else {
	      // 이미 활성화된 카테고리 찾기 (지역 변경 없이 다른 동작으로 handleFilter가 호출될 경우 대비)
	      const activeCategoryButton = document.querySelector('.kategorie-list button.active');
	      if (activeCategoryButton) {
	        selectedCategory = activeCategoryButton.id.slice(0, -3).toLowerCase();
	      }
	    }
	    // 지역과 카테고리 모두 선택되었을 때만 fetchData 호출 및 페이지 이동
	    if (selectedRegion && selectedCategory) {
	      fetchData(selectedRegion, selectedCategory);
	    } else {
	      console.log('지역과 카테고리를 모두 선택해주세요.');
	      // 필요에 따라 사용자에게 알림 메시지를 표시할 수 있습니다.
	    }
	  }

	  function fetchData(region, category) {
	    const url = `/search/location/data?region=${region}&category=${category}`;
	    console.log(url);
	    fetch(url)
	      .then(response => {
	        if (!response.ok) {
	          throw new Error(`HTTP error! status: ${response.status}`);
	        }
	        return response.json();
	      })
	      .then(data => {
	        console.log('받아온 데이터:', data);
	        let params = new URLSearchParams();
	        params.append('region', region);
	        params.append('category', category);
	        window.location.href = `/search/location?${params.toString()}`;
	      })
	      .catch(error => {
	        console.error('데이터를 가져오는 중 오류 발생:', error);
	      });
	  }
	});