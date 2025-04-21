<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	
	<div class="container">
        <div class="page-header" data-rest-no="${rest_no}">
            <div class="slideshow-container">
                <div class="slides-wrapper">
                    <div class="slide">
                        <img src="https://img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E" alt="이미지 1">
                    </div>
                </div>
                <a class="prev" onclick="moveSlide(-1)">❮</a>
                <a class="next" onclick="moveSlide(1)">❯</a>
            </div>

            <div class="content">
			    <div class="store-list">
			        <div class="store-item">
			            <span class="name">가게 총 평점</span>
			            <span class="rating">로딩 중...</span>
			        </div>
			        <div class="store-item">
			            <span class="name"><연령별 평점></span>
			        </div>
			        <div class="store-item">
			            <span class="name">10대</span>
			            <span class="rating">로딩 중...</span>
			        </div>
			        <div class="store-item">
			            <span class="name">20대</span>
			            <span class="rating">로딩 중...</span>
			        </div>
			        <div class="store-item">
			            <span class="name">30대</span>
			            <span class="rating">로딩 중...</span>
			        </div>
			        <div class="store-item">
			            <span class="name">40대</span>
			            <span class="rating">로딩 중...</span>
			        </div>
			        <div class="store-item">
			            <span class="name">친구들 평점</span>
			            <span class="rating">로딩 중...</span>
			        </div>
			    </div>
			    <div class="store-details">
			        <table class="store-table">
			            <tbody>
			                <tr>
			                    <td colspan="2">로딩 중...</td>
			                </tr>
			            </tbody>
			        </table>
			    </div>
                <div class="store-details">
                    <table class="store-table">
                        <tbody>
                            <tr>
                                <td colspan="2">로딩 중...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="store-reserve">
            	<button type="button" class="btn btn-fir" id="reservationBtn">예약</button>
            </div>
        </div>
            
        <div class="panel-body">
            <div class="store-COMMENT">COMMENT</div>
            
        </div>
        <div class="panel-footer">
            <div class="panel-footer-header">
                <div class="panle-footer-input">
                    <div class="textarea-wrapper">
                        <textarea rows="15" cols="100" class="text_comm" name="comment" id="comment"></textarea>
                        <button type="button" class="btn btn-sec" id="uploadBtn">UPLOAD</button>
                    </div>
                    <div class="btn-comment">
                        <button type="button" class="btn btn-sec" id="commentBtn">댓글 달기</button>
                    </div>
                </div>
             </div>
             <div class="panel-footer-body">
                <ul class="chat">
                   <li data-com_no="1">
                      <div class="chat-full">
                         <div class="chat-header">
                            <strong>작성자</strong>
                            <small class="pull-right">0000-00-00</small>
                         </div>
                         <div class="chat-body">
                            <div class="image-con">
                                <div class="image">
                                    <img src="https://img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E" alt="이미지 1">
                                </div>
                                <div class="image">
                                    <img src="https://img1.kakaocdn.net/cthumb/local/C264x196.q50/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2F42F0E8B92BBD4145B7B7F3A8C66092AD" alt="이미지 2">
                                </div>
                                <div class="image">
                                    <img src="https://img1.kakaocdn.net/cthumb/local/C640x960.q50/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2FF5F4393C6D35419B9545F2F230E5D334" alt="이미지 3">
                                </div>
                                <div class="image">
                                    <img src="https://img1.kakaocdn.net/cthumb/local/C640x960.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2Fcf3b48884e2c3bf3f7b9bec246ac3f3925e3f921%3Foriginal" alt="이미지 4">
                                </div>
                            </div>
                            <div class="btn-com">
                                <button type="button" class="btn btn-com" id="viewBtn">더보기</button>
                            </div>
                         </div>
                         <div class="chat-footer" id="chat_abc">
                           <p>umst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.</p> 
                         </div>
                      </div>
                   </li>
                </ul>
             </div>
        </div>
    </div>
	<!-- 모달 창 (더보기) -->
	<div class="modal_view" id="viewModal">
		<div class="modal_view-content">
			<div class="image-view">
                <img src="https://img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E" alt="이미지 1">
                <img src="https://img1.kakaocdn.net/cthumb/local/C264x196.q50/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2F42F0E8B92BBD4145B7B7F3A8C66092AD" alt="이미지 2">
                <img src="https://img1.kakaocdn.net/cthumb/local/C640x960.q50/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2FF5F4393C6D35419B9545F2F230E5D334" alt="이미지 3">
                <img src="https://img1.kakaocdn.net/cthumb/local/C640x960.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2Fcf3b48884e2c3bf3f7b9bec246ac3f3925e3f921%3Foriginal" alt="이미지 4">
                <img src="https://img1.kakaocdn.net/cthumb/local/C264x196.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2F4e6288d57f8db53b1136c87e78715a4e2f4634f2%3Foriginal" alt="이미지 5">
            	<img src="https://img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2F7ef2638e4b26750a2e18c779ba9b04e9a6bab298%3Foriginal" alt="이미지 6">
			</div>
		</div>
	</div>

	
	<!-- 모달 창 -->
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
        <button class="time-btn">10:00</button>
        <button class="time-btn">10:30</button>
        <button class="time-btn">11:00</button>
        <button class="time-btn">11:30</button>
        <button class="time-btn">12:00</button>
        <button class="time-btn">14:00</button>
        <button class="time-btn">15:00</button>
        <button class="time-btn">16:00</button>
        <button class="time-btn">17:00</button>
        <button class="time-btn">18:00</button>
        <button class="time-btn">19:00</button>
        <button class="time-btn">20:00</button>
        <button class="time-btn">21:00</button>
      </div>
    </div>
    <!-- 모달 버튼 -->
    <div class="modal-buttons">
      <button type="button" class="btn btn-close" id="closeModalBtn">예약 닫기</button>
      <button type="button" class="btn btn-confirm" id="confirmReservationBtn">예약</button>
    </div>
  </div>
</div>
	
	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/view.js"></script>
</body>
</html>