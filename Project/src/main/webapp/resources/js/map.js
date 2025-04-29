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

function showMyLocation(places) {
	var mapContainer = document.getElementById('map');
	var mapOption = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
	};

	var map = new kakao.maps.Map(mapContainer, mapOption);
	
	var markers = []; // 마커 저장 배열
	
	var options = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0
	};

	if (navigator.geolocation) {
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
				if (place.distance <= 2) {  // 2km 이내만 표시
					// 마커 추가
					var placeMarker = new kakao.maps.Marker({
						map: map,
						position: new kakao.maps.LatLng(place.latitude, place.longitude),
						title: place.rest_name
					});
					
					var placeInfowindow = new kakao.maps.InfoWindow({
						content: `<div style="padding:5px;">${place.rest_name}</div>`,
						removable: true
					});
					
					kakao.maps.event.addListener(placeMarker, 'click', function() {
						placeInfowindow.open(map, placeMarker);
					});
					
					// 마커를 배열에 저장
					markers.push({ place, marker: placeMarker });
	          
					// 🔥 사이드바에 가게 추가
					const sidebarBody = document.getElementById('sidebar-body');
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
			// 사이드바에서 가게 이름 클릭 시 해당 마커로 이동
			const storeNames = document.querySelectorAll('.store-name');
			storeNames.forEach(function(storeName) {
				storeName.addEventListener('click', function() {
					var index = parseInt(storeName.getAttribute('data-index'));
					var marker = markers[index];
					var position = marker.marker.getPosition();
					map.setCenter(position);  // 지도 중심 이동
					marker.marker.setMap(map); // 해당 마커만 표시
				});
			});
			
		}, function(error) {
			alert('현재 위치를 가져올 수 없습니다.');
			console.error(error);
		}, options);
	} else {
		alert('브라우저가 Geolocation을 지원하지 않습니다.');
	}
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

// 실행
getPlacesAndShowMap();

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
