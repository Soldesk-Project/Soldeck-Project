// 필요 변수 선언
const locationBtn = document.querySelector('.changeLocationBtn');
const resetLocationBtn = document.querySelector('.resetLocationBtn');

//사이드바 관련 스크립트
const toggleArrow = document.getElementById('toggleArrow');
const sidebar = document.getElementById('sidebar');
const sidebarBody = document.getElementById('sidebar-body');

let initialLat = null, initialLon = null; // 초기 위치 위도, 경도 저장
let currentLat = null, currentLon = null; // 현재 기준 위치 위도, 경도 저장
let map, currentInfowindow = null;
let markers = [];

const default_lat = 37.5054070438773;
const default_lon = 127.026682479708;
const default_zoom = 4;

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

//마커 그리는 함수
function displayMarker(locPosition, message, map) {
    const marker = new kakao.maps.Marker({ map: map, position: locPosition });
    const infowindow = new kakao.maps.InfoWindow({ content: message, removable: true });
    infowindow.open(map, marker);
    map.setCenter(locPosition);
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
function renderMapWithPlaces(places, myLat, myLon, maxDistance = Infinity, zoomLevel = default_zoom, showCurrentLocationMarker = true, openFirstInfowindow = false) {
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
//    displayMarker(new kakao.maps.LatLng(myLat, myLon), '<div style="padding:5px;">여기가 현재 위치입니다!</div>', map);

    sidebarBody.innerHTML = '';
    places.forEach(place => {
        place.distance = getDistance(myLat, myLon, place.latitude, place.longitude);
    });
    places.sort((a, b) => a.distance - b.distance);

    places.forEach((place, index) => {
        if (place.distance <= maxDistance) {
        	const position = new kakao.maps.LatLng(place.latitude, place.longitude);

            const marker = new kakao.maps.Marker({ map, position, title: place.rest_name });
//            const marker = new kakao.maps.Marker({
//                map: map,
//                position: new kakao.maps.LatLng(place.latitude, place.longitude),
//                title: place.rest_name
//            });

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

    // 공유 링크로 진입 시 첫 번째 가게의 InfoWindow를 자동으로 열기
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
//            const myLat = 37.5054070438773;
//            const myLon = 127.026682479708;
//            initialLat = myLat;
//            initialLon = myLon;
//            currentLat = myLat; // 현재 기준 위치 초기화
//            currentLon = myLon;
//            renderMapWithPlaces(places, myLat, myLon, 2, 3);
            initialLat = currentLat = default_lat;
            initialLon = currentLon = default_lon;
            renderMapWithPlaces(places, currentLat, currentLon, 2,zoomLevel = default_zoom, true, false);
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
                const myLat = 37.5054070438773;
                const myLon = 127.026682479708;
                initialLat = myLat;
                initialLon = myLon;
                currentLat = myLat;
                currentLon = myLon;
                const zoomLevel = map ? map.getLevel() : 4; // 현재 줌 레벨 유지
                renderMapWithPlaces(places, myLat, myLon, Infinity, zoomLevel, false, true);

                // 검색 시 첫 번째 가게로 이동
                if (markers.length > 0) {
                    const firstMarker = markers[0].marker;
                    const firstInfowindow = markers[0].infowindow;
                    map.setCenter(firstMarker.getPosition());
                    if (currentInfowindow) currentInfowindow.close();
                    firstInfowindow.open(map, firstMarker);
                    currentInfowindow = firstInfowindow;
                }
            })
            .catch(err => {
                console.error('검색 결과 불러오기 실패', err);
                alert('검색 결과 불러오기 실패');
            });
    }
}

// 검색 함수
function showMyLocation(places) {
	var mapContainer = document.getElementById('map');
	var mapOption = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
	};

	var map = new kakao.maps.Map(mapContainer, mapOption);
	
	var markers = []; // 마커 저장 배열
	
	const sidebarBody = document.getElementById('sidebar-body');
    sidebarBody.innerHTML = ''; // 기존 사이드바 항목 초기화
	
	var options = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0
	};

	if (navigator.geolocation) {
		
		const actionType = sessionStorage.getItem('actionType');
	    const maxDistance = (actionType === 'search') ? Infinity : 2;

		navigator.geolocation.getCurrentPosition(function(position) {
			var myLat = 37.5054070438773; // 현재 위도
			var myLon = 127.026682479708; // 현재 경도
			
			var locPosition = new kakao.maps.LatLng(myLat, myLon);
			var message = '<div style="padding:5px;">여기가 현재 위치입니다!</div>';
			
			displayMarker(locPosition, message, map);
			
			// 가게에 거리 정보 추가
			places.forEach(function(place) {
				place.distance = getDistance(myLat, myLon, place.latitude, place.longitude);
			});

			// 거리 오름차순으로 가게 정렬
			places.sort(function(a, b) {
				return a.distance - b.distance;
			});

			// 정렬된 가게들 표시
			places.forEach(function(place, index) {
				if (place.distance <= maxDistance) {  // 2km 이내만 표시
					// 마커 추가
					var placeMarker = new kakao.maps.Marker({
						map: map,
						position: new kakao.maps.LatLng(place.latitude, place.longitude),
						title: place.rest_name
					});
					
					var placeInfowindow = new kakao.maps.InfoWindow({
						  content: `
						    <div class="custom-infowindow">
						      <div class="info-title">${place.rest_name}</div>
						      <div class="info-address">${place.rest_adr}</div>
						      <div class="info-distance">거리: ${place.distance.toFixed(2)}km</div>
						      <button class="info-detail-btn" onclick="goToDetail(${place.rest_no})">상세보기</button>
						    </div>
						  `,
						  removable: true
						});
					
					kakao.maps.event.addListener(placeMarker, 'click', function() {
						if (currentInfowindow) {
						    currentInfowindow.close();
						  }

						  placeInfowindow.open(map, placeMarker);
						  currentInfowindow = placeInfowindow;
					});
					
					// 마커를 배열에 저장
					markers.push({ place, marker: placeMarker, infowindow: placeInfowindow });
	          
					// 🔥 사이드바에 가게 추가
					const storeItem = document.createElement('div');
					storeItem.className = 'store-item';
					storeItem.innerHTML = ` 
						<img src="/resources/images/2.png" alt="가게 썸네일" class="store-thumbnail">
						<div class="store-info">
						<div class="store-name" data-index="${index}">${place.rest_name}</div>
						<div class="store-address">${place.rest_adr}</div>
						</div>
						`;
					sidebarBody.appendChild(storeItem);
				}
			});
			// 사이드바에서 가게 이름 또는 사진 클릭 시 해당 마커로 이동
			sidebarBody.addEventListener('click', function(event) {
			    const target = event.target;
			    // 클릭된 요소가 store-name 또는 store-thumbnail인지 확인
			    if (target.classList.contains('store-name') || target.classList.contains('store-thumbnail')) {
			        const storeItem = target.closest('.store-item'); // 부모 .store-item 찾기
			        const storeName = storeItem.querySelector('.store-name'); // .store-name 요소 찾기
			        const index = parseInt(storeName.getAttribute('data-index'));
			        const { marker, infowindow } = markers[index];

			        // 지도 이동
			        const position = marker.getPosition();
			        map.setCenter(position);
			        
			        // 기존 InfoWindow 닫기
			        if (currentInfowindow) {
			        	currentInfowindow.close();
			        }
			        
			        // 새 InfoWindow 열기
			        infowindow.open(map, marker);
			        currentInfowindow = infowindow;
			    }
			});
			
		}, function(error) {
			alert('현재 위치를 가져올 수 없습니다.');
			console.error(error);
		}, options);
	} else {
		alert('브라우저가 Geolocation을 지원하지 않습니다.');
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
                const lat = place.latitude;
                const lon = place.longitude;
                initialLat = currentLat = default_lat;
                initialLon = currentLon = default_lon;
                renderMapWithPlaces(places, lat, lon, Infinity, false); // 거리 제한 없음
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

toggleArrow.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    toggleArrow.innerHTML = sidebar.classList.contains('collapsed') ? '&gt;' : '&lt;';
    if (typeof map !== 'undefined') map.relayout();
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

// 드롭다운 및 초기화 로직
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const restNo = urlParams.get('rest_no');

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

    // 기존 초기화 로직
    if (restNo) {
        fetch(`/search/getPlaceByNo?rest_no=${restNo}`)
            .then(res => res.json())
            .then(place => {
                const places = [place];
                const lat = place.latitude;
                const lon = place.longitude;
                initialLat = currentLat = default_lat;
                initialLon = currentLon = default_lon;
                renderMapWithPlaces(places, lat, lon, Infinity, default_zoom, false, true);
            })
            .catch(err => {
                console.error('공유된 가게 정보 로딩 실패:', err);
                alert('가게 정보를 불러올 수 없습니다.');
            });
    } else {
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
