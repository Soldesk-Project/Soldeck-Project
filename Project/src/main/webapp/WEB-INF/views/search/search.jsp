<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="../resources/css/header.css">
<link rel="stylesheet" href="../resources/css/footer.css">
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	<div class="layout">
	
		<div class="select_box">
			<div class="page-header">
					<div class="location-select_box">
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
			    </div>
		   </div>
		   
		   <div class="panel-body">
		   		<div class="kategorie-container">
				    <ul class="kategorie-list">
				    	<li>
				    		<button type="button" class="btn btn-fir" id="korBtn"></button>
				    		<p>한식</p>
				    	</li>
				    		<li><button type="button" class="btn btn-fir" id="chnBtn"></button>
				    		<p>중식</p>
				    	</li>
				    		<li><button type="button" class="btn btn-fir" id="japBtn"></button>
				    		<p>일식</p>
				    	</li>
				    		<li><button type="button" class="btn btn-fir" id="wesBtn"></button>
				    		<p>양식</p>
				    	</li>
				    		<li><button type="button" class="btn btn-fir" id="vietBtn"></button>
				    		<p>베트남</p>
				    	</li>
				    </ul>
		   		</div>
		   </div>
		</div>
		<div class="panel-footer">
	    	<div class="image-header"># 오늘의 추천 pick</div>
	    	<div class="chat-body">
	    		<div class="slideshow-container">
	                <div class="slides-wrapper">
	                    <!-- <div class="slide">
	                        <img src="https://img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E" alt="이미지 1">
	                        <p>가게 이름</p>
	                    </div> -->
	                </div>
	                <a class="prev" onclick="moveSlide(-1)">❮</a>
	                <a class="next" onclick="moveSlide(1)">❯</a>
	            </div>
	    		<div class="image-header">#검색 결과</div>
	    		<div class="chat-body2">
	        		<div class="store-con">
			            <!-- 첫 번째 가게 블록 -->
			            <!-- div class="store-block" data-rest-no='1'>
			                <div class="store-image">
			                    <img src="https://img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E" alt="가게 이미지 1">
			                </div>
			                <div class="store-info">
			                    <p class="store-name">가게 이름</p>
			                    <p class="store-type">가게 종류</p>
			                    <p class="store-hours">영업 시간</p>
			                </div>
			            </div> -->
	        		</div>
	    		</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="/resources/js/search.js"></script>
	<jsp:include page="../layout/footer.jsp"/>
</body>
</html>