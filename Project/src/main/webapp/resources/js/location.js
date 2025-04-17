const CSS_FILE_PATH = '/resources/css/location.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);

//현재 선택된 지역과 카테고리 상태 관리
let selectedRegion = '';
let selectedCategory = '';

// 가게 뿌리기
showList();
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
            msg += `<div class="item-set">`
            msg += 	`<div class="image">`
            msg += 		`<img src="${json.sumnail}" alt="이미지 1">`
            msg += 	`</div>`
            msg += 	`<div class="name">`
            msg += 		`<p>${json.rest_name}</p>`
            msg += 	`</div>`
            msg += `</div>`
        });
        imageUL.innerHTML = msg;
    });
}

const locationSelect = document.querySelector('.location-select select');
locationSelect.addEventListener('change', function() {
    selectedRegion = this.value;
    console.log(selectedRegion);
    showList();
});
const categoryButtons = document.querySelectorAll('.kategorie-list button');
categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
    	
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const categoryMap = {
            korBtn: '한식',
            chnBtn: '중식',
            japBtn: '일식',
            wesBtn: '양식',
            vietBtn: '베트남'
        };
        selectedCategory = categoryMap[this.id] || '';
        console.log(selectedCategory);
        showList();
    });
});

function getList(callback) {
	const params = new URLSearchParams();
    if (selectedRegion) params.append('region', selectedRegion);
    if (selectedCategory) params.append('category', selectedCategory);
    const url = `/search/location/data${params.toString() ? '?' + params.toString() : ''}`;
    fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        callback(data);
    })
    .catch(err => console.log(err));
}