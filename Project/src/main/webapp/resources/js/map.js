// 필요 변수 선언
const locationBtn = document.querySelector('.changeLocationBtn');
let map;
let markers = [];
let currentInfowindow = null; // 기존 마커 삭제 하기 위한 변수

const keyword = sessionStorage.getItem('keyword'); // 최초 map페이지 진입 시 한식, 중식 등 키워드 세션에서 가져옴

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

// 실제 지도 생성 함수
function renderMapWithPlaces(places, myLat, myLon, maxDistance = Infinity) {
    const mapContainer = document.getElementById('map');
    const sidebarBody = document.getElementById('sidebar-body');
    const actionType = sessionStorage.getItem('actionType');

    markers.forEach(({ marker }) => marker.setMap(null));
    markers = [];
    currentInfowindow = null;

    map = new kakao.maps.Map(mapContainer, {
        center: new kakao.maps.LatLng(myLat, myLon),
        level: 3
    });
    
    
    // 지도 이동 시 현 위치 기준 검색 버튼 생성
    kakao.maps.event.addListener(map, 'idle', () => {
        locationBtn.style.display = 'block';
    });

    const myLoc = new kakao.maps.LatLng(myLat, myLon);
    displayMarker(myLoc, '<div style="padding:5px;">여기가 현재 위치입니다!</div>', map);

    sidebarBody.innerHTML = '';

    places.forEach(place => {
        place.distance = getDistance(myLat, myLon, place.latitude, place.longitude);
    });
    places.sort((a, b) => a.distance - b.distance);

    places.forEach((place, index) => {
        if (place.distance <= maxDistance) {
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.latitude, place.longitude),
                title: place.rest_name
            });

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

    sidebarBody.onclick = function(event) {
        const target = event.target;
        if (target.classList.contains('store-name') || target.classList.contains('store-thumbnail')) {
            const storeItem = target.closest('.store-item');
            const index = parseInt(storeItem.querySelector('.store-name').getAttribute('data-index'));
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
    fetch(`/search/getLocation?keyword=${encodeURIComponent(keyword)}`)
        .then(res => res.json())
        .then(places => {
            const myLat = 37.5054070438773;
            const myLon = 127.026682479708;
            renderMapWithPlaces(places, myLat, myLon, 2);
        })
        .catch(err => {
            console.error('가게 목록을 불러오는데 실패했습니다.', err);
        });
}

// 검색 함수
function getSearch() {
    const searchKeyword = sessionStorage.getItem('search');
    if (searchKeyword) {
        const keywords = searchKeyword.trim().split(/\s+/);
        const params = new URLSearchParams();
        params.append('keywords', keywords.join(','));

        fetch(`/search/getSearch?${params.toString()}`)
            .then(res => res.json())
            .then(places => {
                const myLat = 37.5054070438773;
                const myLon = 127.026682479708;
                renderMapWithPlaces(places, myLat, myLon, Infinity);
            })
            .catch(err => {
                console.error('검색 결과 불러오기 실패', err);
            });
    }
}

// 마커 그리는 함수
function displayMarker(locPosition, message, map) {
    const marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
    });

    const infowindow = new kakao.maps.InfoWindow({
        content: message,
        removable: true
    });

    infowindow.open(map, marker);
    map.setCenter(locPosition);
}

// 가게 상세 정보 이동
function goToDetail(restNo) {
    window.location.href = `/search/view?rest_no=${restNo}`;
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
                const lat = place.latitude;
                const lon = place.longitude;
                console.log(places);
                console.log(lat);
                console.log(lon);
                renderMapWithPlaces(places, lat, lon, Infinity); // 거리 제한 없음
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
});

// 사이드바 관련 스크립트
const toggleArrow = document.getElementById('toggleArrow');
const sidebar = document.getElementById('sidebar');

toggleArrow.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    toggleArrow.innerHTML = sidebar.classList.contains('collapsed') ? '&gt;' : '&lt;';
    if (typeof map !== 'undefined') map.relayout();
});

locationBtn.addEventListener('click', () => {
    const currentCenter = map.getCenter();
    const lat = currentCenter.getLat();
    const lng = currentCenter.getLng();
    console.log('현재 중심 좌표 기준으로 거리 계산:', lat, lng);

    const actionType = sessionStorage.getItem('actionType');

    if (actionType === 'search') {
        const searchKeyword = sessionStorage.getItem('search');
        const keywords = searchKeyword.trim().split(/\s+/);
        const params = new URLSearchParams();
        params.append('keywords', keywords.join(','));

        fetch(`/search/getSearch?${params.toString()}`)
            .then(res => res.json())
            .then(places => {
                renderMapWithPlaces(places, lat, lng, 2); // 지도 중심 좌표 기준으로 거리 계산 및 출력
            })
            .catch(err => {
                console.error('검색 기반 가게 목록 불러오기 실패:', err);
            });
    } else {
        fetch(`/search/getLocation?keyword=${encodeURIComponent(keyword)}`)
            .then(res => res.json())
            .then(places => {
                renderMapWithPlaces(places, lat, lng, 2);
            })
            .catch(err => {
                console.error('카테고리 기반 가게 목록 불러오기 실패:', err);
            });
    }
});

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
