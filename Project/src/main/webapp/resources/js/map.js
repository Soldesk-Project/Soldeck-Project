// 상수 정의
const DEFAULT_LAT = 37.5054070438773;
const DEFAULT_LON = 127.026682479708;
const DEFAULT_ZOOM = 4;
const MAX_DISTANCE = 2;

// DOM 요소
const locationBtn = document.querySelector('.changeLocationBtn'); // 현 위치 검색
const resetLocationBtn = document.querySelector('.resetLocationBtn'); // 원래 위치 이동
const toggleArrow = document.getElementById('toggleArrow');
const sidebar = document.getElementById('sidebar');
const sidebarBody = document.getElementById('sidebar-body');

// 위치 관련 변수
let initialLat = null, initialLon = null; // 초기 위치 저장
let currentLat = null, currentLon = null; // 현재 기준 위치 저장
let map, currentInfowindow = null;
let markers = [];

// 현 위치 부터 거리 계산 함수
function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// 마커 표시 함수
function displayMarker(locPosition, message, mapInstance) {
    const marker = new kakao.maps.Marker({ map: mapInstance, position: locPosition });
    const infowindow = new kakao.maps.InfoWindow({ content: message, removable: true });
    infowindow.open(mapInstance, marker);
    mapInstance.setCenter(locPosition);
}

//가게 상세 보기 이동
function goToDetail(restNo) {
    window.location.href = `/search/view?rest_no=${restNo}`;
}

//공유 링크 복사
function sharePlace(restNo) {
    const url = `${location.origin}/search/map?rest_no=${restNo}`;
    
    navigator.clipboard.writeText(url)
        .then(() => {
            alert('가게 링크가 클립보드에 복사되었습니다!');
        })
        .catch(err => {
            console.error('클립보드 복사 실패:', err);
            alert('복사에 실패했습니다. 브라우저 권한을 확인해주세요.');
        });
}

// 실제 지도 생성 함수
function renderMapWithPlaces(places, myLat, myLon, maxDistance = Infinity, zoomLevel = DEFAULT_ZOOM, showCurrentLocationMarker = true, openFirstInfowindow = false) {
    const mapContainer = document.getElementById('map');
    markers.forEach(({ marker }) => marker.setMap(null));
    markers = [];
    currentInfowindow = null;
    
    map = new kakao.maps.Map(mapContainer, {
        center: new kakao.maps.LatLng(myLat, myLon),
        level: zoomLevel
    });
    
    // 지도 이동 시 현 위치 기준 검색 버튼 생성
    kakao.maps.event.addListener(map, 'idle', () => {
        locationBtn.style.display = 'block';
        resetLocationBtn.style.display = 'block';
    });
    
    if (showCurrentLocationMarker) {
        displayMarker(new kakao.maps.LatLng(myLat, myLon), '<div style="padding:5px;">여기가 현재 위치입니다!</div>', map);
    }

    sidebarBody.innerHTML = '';
    
    places.forEach(place => {
        place.distance = getDistance(myLat, myLon, place.latitude, place.longitude);
    });
    places.sort((a, b) => a.distance - b.distance);

    places.forEach((place, index) => {
        if (place.distance <= maxDistance) {
        	const position = new kakao.maps.LatLng(place.latitude, place.longitude);
            const marker = new kakao.maps.Marker({ map, position, title: place.rest_name });
            const infowindow = new kakao.maps.InfoWindow({
                content: `
                    <div class="custom-infowindow">
                        <div class="info-title">${place.rest_name}</div>
                        <div class="info-address">${place.rest_adr}</div>
                        <div class="info-distance">거리: ${place.distance.toFixed(2)}km</div>
                        <button class="info-detail-btn" onclick="goToDetail(${place.rest_no})">상세보기</button>
	                	<button class="share-btn" onclick="sharePlace(${place.rest_no})">공유</button>
                    </div>
                `,
                removable: true
            });

            kakao.maps.event.addListener(marker, 'click', () => {
                if (currentInfowindow) currentInfowindow.close();
                infowindow.open(map, marker);
                currentInfowindow = infowindow;
            });

            markers.push({ place, marker, infowindow });

            const storeItem = document.createElement('div');
            storeItem.className = 'store-item';
            storeItem.innerHTML = `
                <img src="${place.rest_img_name}" alt="가게 썸네일" class="store-thumbnail">
                <div class="store-info">
                    <div class="store-name" data-index="${index}">${place.rest_name}</div>
                    <div class="store-address">${place.rest_adr}</div>
                </div>
            `;
            sidebarBody.appendChild(storeItem);
        }
    });

    // 첫 번째 가게의 InfoWindow를 자동으로 열기
    if (openFirstInfowindow && markers.length > 0) {
        const firstMarker = markers[0].marker;
        const firstInfowindow = markers[0].infowindow;
        map.setCenter(firstMarker.getPosition());
        if (currentInfowindow) currentInfowindow.close();
        firstInfowindow.open(map, firstMarker);
        currentInfowindow = firstInfowindow;
    }
    
    sidebarBody.onclick = function(event) {
        const target = event.target;
        if (target.classList.contains('store-name') || target.classList.contains('store-thumbnail')) {
            const index = parseInt(target.closest('.store-item').querySelector('.store-name').dataset.index);
            const { marker, infowindow } = markers[index];

            map.setCenter(marker.getPosition());
            if (currentInfowindow) currentInfowindow.close();
            infowindow.open(map, marker);
            currentInfowindow = infowindow;
        }
    };
}

// 최초 페이지 진입 시 현 위치 기반 지도 호출 함수
function getPlacesAndShowMap() {
      const keyword = sessionStorage.getItem('keyword') || '전체';
	  fetch(`/search/getLocation?keyword=${encodeURIComponent(keyword)}`)
        .then(res => res.json())
        .then(places => {
            initialLat = currentLat = DEFAULT_LAT;
            initialLon = currentLon = DEFAULT_LON;
            renderMapWithPlaces(places, currentLat, currentLon, MAX_DISTANCE, DEFAULT_ZOOM);
        })
        .catch(err => {
            console.error('가게 목록을 불러오는데 실패했습니다.', err);
        });
}

function getSearch() {
    const searchKeyword = sessionStorage.getItem('search');
    
    if (searchKeyword) {
        const keywords = searchKeyword.trim().split(/\s+/);
        const params = new URLSearchParams();
        params.append('keywords', keywords.join(','));

        fetch(`/search/getSearch?${params.toString()}`)
            .then(res => res.json())
            .then(places => {
            	const lat = DEFAULT_LAT, lon = DEFAULT_LON;
                initialLat = currentLat = lat;
                initialLon = currentLon = lon;
                const zoomLevel = map ? map.getLevel() : DEFAULT_ZOOM; // 현재 줌 레벨 유지
                renderMapWithPlaces(places, lat, lon, Infinity, zoomLevel, false, true);
            })
            .catch(err => {
                console.error('검색 결과 불러오기 실패', err);
                alert('검색 결과 불러오기 실패');
            });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const restNo = urlParams.get('rest_no');

    if (restNo) {
        // 공유된 링크를 통해 들어온 경우: 해당 가게만 지도에 표시
        fetch(`/search/getPlaceByNo?rest_no=${restNo}`)
            .then(res => res.json())
            .then(place => {
                const places = [place]; // renderMapWithPlaces는 배열을 받음
                initialLat = currentLat = DEFAULT_LAT;
                initialLon = currentLon = DEFAULT_LON;
                renderMapWithPlaces(places, place.latitude, place.longitude, Infinity, DEFAULT_ZOOM, false, true); // 거리 제한 없음
            })
            .catch(err => {
                console.error('공유된 가게 정보 로딩 실패:', err);
                alert('가게 정보를 불러올 수 없습니다.');
            });
    } else {
        // 기존 동작
        const actionType = sessionStorage.getItem('actionType');
        if (actionType === 'category') {
            getPlacesAndShowMap();
        } else if (actionType === 'search') {
            getSearch();
        } else {
            location.href = "/";
        }
    }
    
    // 검색 입력창 설정
    const searchInput = document.getElementById("search-box");
    const actionType = sessionStorage.getItem('actionType');

    if (searchInput) {
        if (actionType === 'category') {
            searchInput.value = ''; // 검색창 초기화
            sessionStorage.removeItem('search'); // 검색어 세션 데이터 제거
        } else {
            const storedSearch = sessionStorage.getItem('search');
            if (storedSearch) {
                searchInput.value = decodeURIComponent(storedSearch); // 검색어 유지
            }
        }

        if (searchInput.disabled) {
            console.log("searchInput이 비활성화되어 있습니다. 활성화합니다.");
            searchInput.disabled = false;
        }
        searchInput.removeEventListener("change", handleSearch);
        searchInput.removeEventListener("keypress", handleSearch);
        searchInput.addEventListener("change", handleSearch);
        searchInput.addEventListener("keypress", function(event) {
            event.stopPropagation();
            if (event.key === 'Enter') {
                handleSearch(event);
            }
        }, { capture: false });
    } else {
        console.error("searchInput 요소를 찾을 수 없습니다.");
    }
    
    const searchboxButton = document.getElementById('search-boxBtn');
    if (searchboxButton) {
    	searchboxButton.addEventListener('click', function () {
        const input = document.getElementById('search-box');
        if (input) {
          handleSearch({ target: input });
        }
      });
    } else {
      console.error("searchboxButton 요소를 찾을 수 없습니다.");
    }
    
    // 드롭다운 이벤트 리스너
    const categorySelect = document.getElementById('category-select');
    if (categorySelect) {
        // 초기 키워드 설정
        const storedKeyword = sessionStorage.getItem('keyword');
        if (storedKeyword) {
            categorySelect.value = storedKeyword;
        } else {
            categorySelect.value = '전체';
        }

        // 선택 변경 시 AJAX로 데이터 가져오기
        categorySelect.addEventListener('change', function() {
            const selectedKeyword = categorySelect.value;
            sessionStorage.setItem('keyword', selectedKeyword);
            sessionStorage.setItem('actionType', 'category');
            sessionStorage.removeItem('search'); // 검색어 초기화

            // 현재 기준 위치 사용 (currentLat, currentLon)
            const myLat = currentLat || 37.5054070438773; // 기준 위치 없으면 기본값
            const myLon = currentLon || 127.026682479708;
            const zoomLevel = map ? map.getLevel() : 4;
            
            // AJAX로 카테고리별 가게 데이터 가져오기
            fetch(`/search/getLocation?keyword=${encodeURIComponent(selectedKeyword)}`)
                .then(res => res.json())
                .then(places => {
                	renderMapWithPlaces(places, myLat, myLon, 2, zoomLevel, false, false); // 2km 이내 가게 표시
                })
                .catch(err => {
                    console.error('카테고리 기반 가게 목록 불러오기 실패:', err);
                    alert('가게 목록을 불러오는데 실패했습니다.');
                });
        });
    } else {
        console.error("categorySelect 요소를 찾을 수 없습니다.");
    }
});

toggleArrow.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    toggleArrow.innerHTML = sidebar.classList.contains('collapsed') ? '>' : '<';
    
    const changeLocationBtn = document.querySelector('.changeLocationBtn');
    const resetLocationBtn = document.querySelector('.resetLocationBtn');
    
    if (sidebar.classList.contains('collapsed')) {
        // 사이드바 접힘: 버튼을 중앙에 가깝게 이동
        changeLocationBtn.style.left = '50%'; // 지도 중앙 기준
        changeLocationBtn.style.transform = 'translateX(-150px)'; // 버튼 간격 조정
        resetLocationBtn.style.left = '50%';
        resetLocationBtn.style.transform = 'translateX(10px)';
    } else {
        // 사이드바 펼쳐짐: 원래 위치로 복원
        changeLocationBtn.style.left = '640px';
        changeLocationBtn.style.transform = 'translateX(-50%)';
        resetLocationBtn.style.left = '810px';
        resetLocationBtn.style.transform = 'translateX(-50%)';
    }
    
    sidebar.addEventListener('transitionend', () => {
        if (typeof map !== 'undefined') {
            map.relayout();
        }
    }, { once: true });
});

//현 지도에서 검색 버튼 이벤트 리스너
locationBtn.addEventListener('click', () => {
    const currentCenter = map.getCenter();
    currentLat = currentCenter.getLat(); // 현재 중심 좌표를 기준 위치로 업데이트
    currentLon = currentCenter.getLng();
    const zoomLevel = map.getLevel(); // 현재 줌 레벨 가져오기
    console.log('현재 중심 좌표 기준으로 거리 계산:', currentLat, currentLon, '줌 레벨:', zoomLevel);

    const keyword = sessionStorage.getItem('keyword') || '전체'; // 카테고리 키워드 가져오기, 기본값은 '전체'

    fetch(`/search/getLocation?keyword=${encodeURIComponent(keyword)}`)
        .then(res => res.json())
        .then(places => {
        	renderMapWithPlaces(places, currentLat, currentLon, 2, zoomLevel, false, false); // 현재 지도 중심 좌표 기준, 2km 이내 가게 표시
        })
        .catch(err => {
            console.error('카테고리 기반 가게 목록 불러오기 실패:', err);
            alert('가게 목록을 불러오는데 실패했습니다.');
        });
});

// 원래 위치로 이동 버튼 이벤트 리스너
resetLocationBtn.addEventListener('click', () => {
    if (initialLat === null || initialLon === null) {
        console.error('초기 위치가 정의되지 않았습니다.');
        alert('초기 위치가 설정되지 않았습니다.');
        return;
    }

    currentLat = initialLat; // 기준 위치를 초기 위치로 복원
    currentLon = initialLon;
    const zoomLevel = map.getLevel();
    
    const keyword = sessionStorage.getItem('keyword') || '전체'; // 카테고리 키워드 가져오기, 기본값은 '전체'

    fetch(`/search/getLocation?keyword=${encodeURIComponent(keyword)}`)
        .then(res => res.json())
        .then(places => {
            renderMapWithPlaces(places, initialLat, initialLon, 2, zoomLevel, true, false); // 초기 위치 기준, 2km 이내 가게 표시
        })
        .catch(err => {
            console.error('카테고리 기반 가게 목록 불러오기 실패:', err);
            alert('가게 목록을 불러오는데 실패했습니다.');
        });
});

//검색 관련 함수
function handleSearch(event) {
    const headerSearchKeyword = event.target.value.trim();
    
    if (headerSearchKeyword) {
        const encodedKeyword = encodeURIComponent(headerSearchKeyword);
        sessionStorage.setItem('search', encodedKeyword);
        sessionStorage.setItem('actionType', 'search');
        sessionStorage.removeItem('keyword');
        window.location.href = "/search/map"; // 검색은 페이지 리로드 유지
    } else {
        console.log("검색어가 비어 있습니다.");
        alert("검색어를 입력하세요.");
    }
}