

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
    fetch('/search/getLocation')  // 여기에 너 컨트롤러 매핑 경로 적어야 함
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

      // 2km 이내 가게 마커 찍기
      places.forEach(function(place) {
        var distance = getDistance(myLat, myLon, place.latitude, place.longitude);  // 여기도 변수명 맞춰야 해
        if (distance <= 2) {
          var placeMarker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.latitude, place.longitude),
            title: place.name
          });

          var placeInfowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${place.rest_name}</div>`,
            removable: true
          });

          kakao.maps.event.addListener(placeMarker, 'click', function() {
            placeInfowindow.open(map, placeMarker);
          });
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
