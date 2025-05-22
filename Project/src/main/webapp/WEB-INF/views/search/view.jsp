<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/header.css">
<link rel="stylesheet" href="/resources/css/footer.css">
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f95efd6df49141c0b98c0463ecfe5d9e"></script>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<div class="container">
        <div class="page-header" data-rest_no="${rest_no}">
        	<!-- 이미지 슬라이드 -->
            <div class="slideshow-container">
                <a class="prev" onclick="moveSlide(-1)">❮</a>
                <div class="slides-container"> 
                	<div class="slides-wrapper"></div>
                </div>
                <a class="next" onclick="moveSlide(1)">❯</a>
            </div>
            
			<!-- 가게 내용 -->
            <div class="content">
			    <div class="store-list"></div>
			    
			    <div class="store-details">
			    	<div class="store-tap">
			    	<div class="homeAmenu">
			    		<button class="tap-home active" data-target="store-info">홈</button>
			    		<button class="tap-menu" data-target="store-menu">메뉴</button>
			    	</div>
				    <div class="store-reserve">
		            	<button type="button" class="btn btn-fir" id="reservationBtn">예약</button>
		            </div>
			    	</div>
			    	<div class="store-info"></div>
			    	<div class="store-menu" style="display: none;"></div>
			    </div>
			    
			    <div class="store-function">
				    <div class="store-map">
				    	<div id="map" style="width: 100%; height: 100%;"></div>
				    </div>
			    </div>
            </div>
        </div>
            
        <!-- 댓글 이미지 및 더보기 -->
        <div class="panel-body">
        	<div class="comment-image-container">
        		<div class="image-wrapper"></div>
			</div>
        	<div>
 			    <button class="more-btn" style="display: none;">더보기</button>
        	</div>
        </div>
        
        <!-- 댓글 입력 및 출력 -->
        <div class="panel-footer">
            <div class="panel-footer-header">
                <div class="panle-footer-input">
                    <div class="textarea-wrapper">
                        <textarea rows="20" cols="100" class="text_comm" name="comment" id="comment"></textarea>
                        <div class="star-rating" id="starRating">
		                    <div class="star" data-value="1"></div>
		                    <div class="star" data-value="2"></div>
		                    <div class="star" data-value="3"></div>
		                    <div class="star" data-value="4"></div>
		                    <div class="star" data-value="5"></div>
		                </div>
		                <!-- input type="file"은 숨김 -->
		                <input type="file" id="imageUpload" multiple="multiple" style="display: none;">
		                <!-- 커스텀 버튼으로 label 사용 -->		               
		                <label for="imageUpload" class="btn btn-one">UPLOAD</label>
	                    <div class="btn-comment">
	                        <button type="button" class="btn btn-one_c" id="commentBtn">입력</button>
	                    </div>
                    </div>
                </div>
                
				<div class="uploadResult">
			        <div class="slider-container">
			            <ul></ul>
			        </div>
			        <span class="arrow left" onclick="moveSlider('left')">&#10094;</span>
			        <span class="arrow right" onclick="moveSlider('right')">&#10095;</span>
			    </div>
             </div>
             
             <div class="panel-footer-body">
                <ul class="chat"></ul>
             </div>
        </div>
        
        <!-- 로그인 정보 -->
        <div id="login-data" data-mem_no="${member.mem_no != null ? member.mem_no : '0'}" data-mem_name="${member.mem_name != null ? member.mem_name : ''}"></div>
    </div>
    
    <!-- 댓글 이미지 더보기 모달 -->
	<div class="modal2" style="display: none;">
	  <div class="modal-content2">
	    <div class="modal-image-container"></div>
	  </div>
	</div>

	<!-- 예약 모달 -->
	<div class="modal" id="reservationModal">
	  <div class="modal-content">
	    <div class="calendar">
	      <div class="calendar-header">
	        <select id="monthSelect">
	        	<c:forEach begin="1" end="12" var="m">
	              <option value="${m}">${m}월</option>
	            </c:forEach>
	        </select>
	      </div>
	      <div class="calendar-days" id="calendarDays"></div>
	    </div>
	    
	    <div class="time-selection">
	      <h3>시간 선택</h3>
	      <div class="time-options">
		      <c:forEach var="t" items="${fn:split('11,12,13,15,16,17,18,19,20,21,22,23', ',')}">
	            <button class="time-btn">${t}:00</button>
	          </c:forEach>
	      </div>
	    </div>
	    
	    <div class="personnel-selection">
	    	<h3>인원 선택</h3>
	    	<div class="personnel-options">
	    		<c:forEach var="p" begin="1" end="6">
	              <button class="personnel-btn">${p}인</button>
	            </c:forEach>
	    	</div>
	    </div>
	    
	    <div class="modal-buttons">
	      <button type="button" class="btn btn-close" id="closeModalBtn">예약 닫기</button>
	      <button type="button" class="btn btn-confirm" id="confirmReservationBtn">예약</button>
	    </div>
	  </div>
	</div>
	
	<!-- 즐겨찾기 추가 모달 -->
	<div class="modal" id="favoriteAddModal">
		<div class="modal-content">
			<div class="first_bookmarkM">
				<h2>추가할 즐겨찾기의 공개/비공개를 설정해주세요.</h2>
				<button type="button" class="btn btn-close" id="closeFavoriteAddModalBtn">X</button>
			</div>
			<div class="favorite-modal-content">
				<button type="button" class="btn btn-sec" id="publicFavoriteBtn">공개</button>
				<button type="button" class="btn btn-sec" id="privateFavoriteBtn">비공개</button>
			</div>
		</div>
	</div>
	
	<!-- 즐겨찾기 삭제 모달 -->
	<div class="modal" id="favoriteDeleteModal">
		<div class="modal-content">
			<div class="first_bookmarkM_cancle">
				<h2>즐겨찾기를 삭제하시겠습니까?</h2>
				<button type="button" class="btn btn-close" id="closeFavoriteAddModalBtn">X</button>
			</div>
			<div class="favorite-modal-content">
			    <button class="yes-btn" id="deleteFavoriteBtn">예</button>
				<button class="cancle-modal-btn" id="closeFavoriteDeleteModalBtn">아니오</button>
		    </div>
		</div>
	</div>
	
	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/view.js"></script>
	<script type="text/javascript" src="/resources/js/upload.js"></script>
	
</body>
</html>