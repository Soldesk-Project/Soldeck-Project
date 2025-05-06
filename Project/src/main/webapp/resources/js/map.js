// 거리 계산 함수 (Haversine 공식)
function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // 지구 반지름(km)
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d; // 거리(km)
}

// 서버에서 가게 리스트 받아온 다음 -> 위치 표시 시작
function getPlacesAndShowMap() {
	const keyword = sessionStorage.getItem('keyword');
	 fetch(`/search/getLocation?keyword=${encodeURIComponent(keyword)}`) //컨트롤러에 session에 저장된 keyword 값 전달
        .then(response => response.json())
        .then(places => {
        	console.log(places);
            showMyLocation(places);  // places를 넘겨줌
        })
        .catch(error => {
            console.error('가게 목록을 불러오는데 실패했습니다.', error);
        });
}

// 다른 마커 클릭 시  기존 마커를 끄기 위한 변수
let currentInfowindow = null;

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

//테스트중
function getSearch() {
    const searchKeyword = sessionStorage.getItem('search');
    if (searchKeyword) {
    	// 스페이스바로 검색어 분리
    	const keywords = searchKeyword.trim().split(/\s+/);
    	const params = new URLSearchParams();
    	params.append('keywords', keywords.join(','));

        fetch(`/search/getSearch?${params.toString()}`)
            .then(response => response.json())
            .then(places => {
                console.log(places);
                showMyLocation(places);
            })
            .catch(error => {
                console.error('가게 목록을 불러오는데 실패했습니다.', error);
            });
    }
}

// 상세보기 페이지 이동
function goToDetail(restNo) {
	  window.location.href = `/search/view?rest_no=${restNo}`;
	}


function displayMarker(locPosition, message, map) {
  var marker = new kakao.maps.Marker({
    map: map,
    position: locPosition
  });

  var infowindow = new kakao.maps.InfoWindow({
    content: message,
    removable: true
  });

  infowindow.open(map, marker);
  
  map.setCenter(locPosition);
}

//실행 로직 수정
document.addEventListener('DOMContentLoaded', function() {
    const actionType = sessionStorage.getItem('actionType'); // 클릭 또는 검색 여부 확인
    
    if (actionType === 'category') {
        getPlacesAndShowMap(); // 클릭으로 카테고리 기반 결과 표시
    } else if (actionType === 'search') {
        getSearch(); // 검색 키워드 기반 결과 표시
    } else {
        console.error('알 수 없는 행동 유형:', actionType);
        // 기본 동작: 홈 페이지로 리다이렉션 또는 에러 페이지 표시
        location.href = '/';
    }

});

// 사이드바 스크립트
// 화살표 클릭하면 사이드바 접고 펴기
const toggleArrow = document.getElementById('toggleArrow');
const sidebar = document.getElementById('sidebar');

toggleArrow.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');

  // 화살표 방향 바꿔주기
  if (sidebar.classList.contains('collapsed')) {
    toggleArrow.innerHTML = '&gt;'; // >
  } else {
    toggleArrow.innerHTML = '&lt;'; // <
  }

  // 지도 리사이즈
  if (typeof map !== 'undefined') {
    map.relayout();
  }
});
