const CSS_FILE_PATH = '/resources/css/location.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);

let selectedRegion = '';
let selectedCategory = '';
const imageCon = document.querySelector('.image-con');
const locationSelect = document.querySelector('.location-select select');
const categoryButtons = document.querySelectorAll('.kategorie-list button');

showList();

// 가게 뿌리기
function showList() {
    const imageUL = document.querySelector(".image-con");
    let msg = '';
    
    getList(jsonArray => {
        // 데이터를 랜덤으로 섞기 (Fisher-Yates Shuffle)
        for (let i = jsonArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [jsonArray[i], jsonArray[j]] = [jsonArray[j], jsonArray[i]];
        }

        // 30개로 제한
        const limitedArray = jsonArray.slice(0, 30);

        // 데이터로 아이템 생성
        limitedArray.forEach(json => {
            msg += `<div class="item-set" data-rest-no=${json.rest_no}>`
            msg += 	`<div class="image">`
            msg += 		`<img src="${json.rest_img_name || ''}" alt="이미지 없음" draggable="false" onerror="this.src='/resources/images/noImage.png';">`;
            msg += 	`</div>`
            msg += 	`<div class="name">`
            msg += 		`<p>${json.rest_name}</p>`
            msg += 	`</div>`
            msg += `</div>`
        });
        imageUL.innerHTML = msg;
    });
}

function getList(callback) {
    const params = new URLSearchParams();
    if (selectedRegion) params.append('region', selectedRegion);
    if (selectedCategory) params.append('category', selectedCategory);
    const url = `/search/location/data${params.toString() ? '?' + params.toString() : ''}`;
    console.log("Fetching URL:", url);
    
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
        console.log("Received data:", data);
        callback(data);
    })
    .catch(err => {
        console.error("Fetch error:", err.message);
    });
}

// 가게 이미지, 이름 이벤트
imageCon.addEventListener('click', (event) => {
    // 클릭된 요소가 이미지 또는 가게 이름인지 확인
    if (event.target.tagName === 'IMG' || (event.target.tagName === 'P' && event.target.parentElement.classList.contains('name'))) {
        if (event.target.tagName === 'IMG') {
            const imageSrc = event.target.src;
            console.log('이미지 클릭됨:', imageSrc);
        }
        if (event.target.tagName === 'P') {
            const storeName = event.target.textContent;
            console.log('클릭한 가게 이름 :', storeName);
        }

        const itemSet = event.target.closest('.item-set');
        if (itemSet) {
            const restNo = itemSet.dataset.restNo || '1';
            console.log('클릭한 가게 번호:', restNo);
            window.location.href = `/search/view?rest_no=${restNo}`;
        } else {
            console.error('item-set 요소를 찾을 수 없습니다.');
        }
    }
});

// 지역 선택
locationSelect.addEventListener('change', function() {
    selectedRegion = this.value;
//    console.log(selectedRegion);
    showList();
});

// 카테고리 선택
categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
    	
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
//        console.log(selectedCategory);
        showList();
    });
});