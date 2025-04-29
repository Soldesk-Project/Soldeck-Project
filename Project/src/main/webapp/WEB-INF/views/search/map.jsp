<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>내 위치 지도 보기</title>
  <!-- 카카오 지도 SDK 로드 -->
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f95efd6df49141c0b98c0463ecfe5d9e"></script>
</head>
<body>

  <button id="button">내 위치 보기</button>

  <div id="map" style="width:100%;height:500px;margin-top:10px;"></div>
  

  <!-- 분리한 js 파일 연결 -->
  <script type="text/javascript" src="/resources/js/map.js"></script>

  <script type="text/javascript">
    // 카카오 지도 API가 로드되면 실행될 함수
    kakao.maps.load(function() {
      // 카카오 지도 객체가 로드됐는지 콘솔에 확인
      if (typeof kakao !== 'undefined' && kakao.maps) {
        console.log("카카오 지도 API가 로드되었습니다.");
      } else {
        console.error("카카오 지도 API 로드에 실패했습니다.");
      }

      // 지도 표시 로직 호출
      document.getElementById('button').addEventListener('click', showMyLocation);
    });
  </script>

</body>
</html>
