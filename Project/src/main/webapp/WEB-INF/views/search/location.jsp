<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>맛집 리스트</title>
  <link rel="stylesheet" href="/resources/css/header.css">
  <link rel="stylesheet" href="/resources/css/footer.css">
</head>
<body>
  <jsp:include page="../layout/header.jsp"/>

  <main class="layout">
    <!-- 지역 및 카테고리 선택 -->
    <section class="select_box">
      <header class="page-header">
        <select class="location-select_select">
          <option value="">지역 선택</option>
          <option value="서울">서울</option>
          <option value="부산">부산</option>
          <option value="대전">대전</option>
          <option value="대구">대구</option>
          <option value="울산">울산</option>
          <option value="광주">광주</option>
          <option value="인천">인천</option>
          <option value="제주">제주</option>
        </select>
      </header>

      <div class="panel-body">
        <div class="kategorie-container">
          <ul class="kategorie-list">
            <li><button type="button" class="btn btn-fir" id="korBtn" title="한식">한식</button></li>
            <li><button type="button" class="btn btn-fir" id="chnBtn" title="중식">중식</button></li>
            <li><button type="button" class="btn btn-fir" id="japBtn" title="일식">일식</button></li>
            <li><button type="button" class="btn btn-fir" id="wesBtn" title="양식">양식</button></li>
            <li><button type="button" class="btn btn-fir" id="vietBtn" title="베트남식">베트남</button></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 음식점 리스트 영역 -->
    <section class="panel-footer">
      <div class="rest-body">
        <div class="image-con"></div>
      </div>
    </section>

    <!-- 서버에서 전달받은 초기 데이터 -->
    <div id="location-data" data-region="${region}" data-category="${category}"></div>
  </main>

  <script src="/resources/js/location.js"></script>
  <jsp:include page="../layout/footer.jsp"/>
</body>
</html>
