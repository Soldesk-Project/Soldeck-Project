const CSS_FILE_PATH = '/resources/css/location.css';
const linkEle = Object.assign(document.createElement('link'), {
    rel: 'stylesheet',
    href: CSS_FILE_PATH
});
document.head.appendChild(linkEle);

//초기 데이터 설정
const { region: initialRegion = '', category: initialCategory = '' } = document.getElementById('location-data').dataset;
let selectedRegion = initialRegion;
let selectedCategory = initialCategory;

const imageCon = document.querySelector('.image-con');
const locationSelect = document.querySelector('.location-select_select');
const categoryButtons = document.querySelectorAll('.kategorie-list button');

//초기화
if (initialRegion) locationSelect.value = initialRegion; // 초기 지역 설정
if (initialCategory) {
    const buttonId = {
        '한식': 'korBtn',
        '중식': 'chnBtn',
        '일식': 'japBtn',
        '양식': 'wesBtn',
        '베트남식': 'vietBtn'
    }[initialCategory];
    buttonId && document.getElementById(buttonId).classList.add('active'); // 초기 카테고리 버튼 활성화
}

showList();

// 가게 목록 표시
function showList() {
    getList(data => {
        const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 30); // 데이터 랜덤 및 30개 제한
        const itemsHTML = shuffled.map(({ rest_no, rest_img_name, rest_name }) => `
            <div class="item-set" data-rest-no="${rest_no}">
                <div class="image">
                    <img src="${rest_img_name || ''}" alt="이미지 없음" draggable="false" onerror="this.src='/resources/images/noImage.png';">
                </div>
                <div class="name"><p>${rest_name}</p></div>
            </div>
        `).join('');
        imageCon.innerHTML = itemsHTML;
    });
}

// 데이터 가져오기
function getList(callback) {
    const params = new URLSearchParams();
    if (selectedRegion) params.set('region', selectedRegion);
    if (selectedCategory) params.set('category', selectedCategory);

    fetch(`/search/location/data${params.toString() ? '?' + params.toString() : ''}`, {
        headers: { 'Accept': 'application/json' }
    })
    .then(res => res.ok ? res.json() : Promise.reject(new Error(res.statusText)))
    .then(callback)
    .catch(err => console.error("Fetch error:", err.message));
}


// 가게 클릭 이동 이벤트
imageCon.addEventListener('click', ({ target }) => {
    const itemSet = target.closest('.item-set');
    if (!itemSet) return;

    const restNo = itemSet.dataset.restNo || '1';
    window.location.href = `/search/view?rest_no=${restNo}`;
});

//지역 선택 변경
locationSelect.addEventListener('change', function () {
    selectedRegion = this.value;
    showList();
});

//카테고리 버튼 이벤트 등록
categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        selectedCategory = {
            korBtn: '한식',
            chnBtn: '중식',
            japBtn: '일식',
            wesBtn: '양식',
            vietBtn: '베트남식'
        }[this.id] || '';

        showList();
    });
});