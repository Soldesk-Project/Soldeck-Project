<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
        	<!-- 이미지 -->
            <div class="slideshow-container">
                <a class="prev" onclick="moveSlide(-1)">❮</a>
                <div class="slides-container"> 
                <div class="slides-wrapper"></div>
                </div>
                <a class="next" onclick="moveSlide(1)">❯</a>
            </div>
			<!-- 가게 내용 -->
            <div class="content">
			    <div class="store-list">
			    </div>
			    <div class="store-details">
			    	<div class="store-tap">
			    		<button class="tap-home active" data-target="store-info">홈</button>
			    		<button class="tap-menu" data-target="store-menu">메뉴</button>
			    	</div>
			    	<div class="store-info"></div>
			    	<div class="store-menu" style="display: none;"></div>
			    </div>
			    <div class="store-map">
			    	<div id="map" style="width: 100%; height: 100%;"></div>
			    </div>
            </div>
        </div>
            
        <div class="panel-body">
        	<div class="comment-image-container">
        		<div class="image-wrapper"></div>
        		
			</div>
        	<div>
	            <div class="store-reserve">
	            	<button type="button" class="btn btn-fir" id="reservationBtn">예약</button>
	            </div>
	            <!-- 더보기 버튼 (기본적으로 숨김) -->
 			    <button class="more-btn" style="display: none;">더보기</button>
	            <div>
	            	<p class="store-COMMENT">댓글</p>
	            </div>
        	</div>
        </div>
        
        <div class="panel-footer">
            <div class="panel-footer-header">
                <div class="panle-footer-input">
                    <div class="textarea-wrapper">
                        <textarea rows="15" cols="100" class="text_comm" name="comment" id="comment"></textarea>
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
		                <label for="imageUpload" class="btn btn-sec">UPLOAD</label>
                    </div>
                    <div class="btn-comment">
                        <button type="button" class="btn btn-sec" id="commentBtn">댓글 달기</button>
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
                <ul class="chat">
                   <li data-com_no="1">
                      <div class="chat-full">
                         <div class="chat-header">
                         	<img alt="프로필" src="">
                            <strong>작성자</strong>
                            <small class="pull-right">0000-00-00</small>
                         </div>
                         <div class="chat-body">
                            <div class="image-con">
                            </div>
                            <div class="btn-com">
                                <button type="button" class="btn btn-com" id="viewBtn">더보기</button>
                            </div>
                         </div>
                         <div class="chat-footer" id="chat_abc">
                         </div>
                      </div>
                   </li>
                </ul>
             </div>
        </div>
        <div id="login-data" data-mem_no="${member.mem_no != null ? member.mem_no : '0'}" data-mem_name="${member.mem_name != null ? member.mem_name : ''}"></div>
    </div>
    <!-- 모달 창 -->
	<div class="modal2" style="display: none;">
	  <div class="modal-content2">
	    <div class="modal-image-container"></div>
	  </div>
	</div>
    
	<!-- 모달 창 (더보기) -->
	<div class="modal_view" id="viewModal">
		<div class="modal_view-content">
			<div class="image-view">
			</div>
		</div>
	</div>

	<!-- 모달 창 (예약) -->
	<div class="modal" id="reservationModal">
	  <div class="modal-content">
	    <!-- 캘린더 -->
	    <div class="calendar">
	      <div class="calendar-header">
	        <select id="monthSelect">
	          <option value="1">1월</option>
	          <option value="2">2월</option>
	          <option value="3">3월</option>
	          <option value="4">4월</option>
	          <option value="5">5월</option>
	          <option value="6">6월</option>
	          <option value="7">7월</option>
	          <option value="8">8월</option>
	          <option value="9">9월</option>
	          <option value="10">10월</option>
	          <option value="11">11월</option>
	          <option value="12">12월</option>
	        </select>
	      </div>
	      <div class="calendar-days" id="calendarDays"></div>
	    </div>
	    <!-- 시간 선택 -->
	    <div class="time-selection">
	      <h3>시간 선택</h3>
	      <div class="time-options">
	        <button class="time-btn">11:00</button>
	        <button class="time-btn">12:00</button>
	        <button class="time-btn">13:00</button>
	        <button class="time-btn">15:00</button>
	        <button class="time-btn">16:00</button>
	        <button class="time-btn">17:00</button>
	        <button class="time-btn">18:00</button>
	        <button class="time-btn">19:00</button>
	        <button class="time-btn">20:00</button>
	        <button class="time-btn">21:00</button>
	        <button class="time-btn">22:00</button>
	        <button class="time-btn">23:00</button>
	      </div>
	    </div>
	    <div class="personnel-selection">
	    	<h3>인원 선택</h3>
	    	<div class="personnel-options">
		        <button class="personnel-btn">1인</button>
		        <button class="personnel-btn">2인</button>
		        <button class="personnel-btn">3인</button>
		        <button class="personnel-btn">4인</button>
		        <button class="personnel-btn">5인</button>
		        <button class="personnel-btn">6인</button>
	    	</div>
	    </div>
	    <!-- 모달 버튼 -->
	    <div class="modal-buttons">
	      <button type="button" class="btn btn-close" id="closeModalBtn">예약 닫기</button>
	      <button type="button" class="btn btn-confirm" id="confirmReservationBtn">예약</button>
	    </div>
	  </div>
	</div>
	
	<div class="modal" id="favoriteModal">
		<div class="modal-content">
			<h3>즐겨찾기 설정</h3>
			<button type="button" class="btn btn-sec" id="publicFavoriteBtn">공개</button>
			<button type="button" class="btn btn-sec" id="privateFavoriteBtn">비공개</button>
			<button type="button" class="btn btn-close" id="closeFavoriteModalBtn">취소</button>
		</div>
	</div>
	
	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/view.js"></script>
	<script type="text/javascript" src="/resources/js/upload.js"></script>
	
</body>
</html>