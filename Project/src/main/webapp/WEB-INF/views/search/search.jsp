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
	
	<div class="page-header">
		<div class="location-select">
			<select>
				<option value="">지역 선택</option>
				<option value="seoul">서울</option>
				<option value="busan">부산</option>
				<option value="daejeon">대전</option>
				<option value="daegu">대구</option>
				<option value="ulsan">울산</option>
				<option value="gwangju">광주</option>
				<option value="incheon">인천</option>
				<option value="jeju">제주</option>
			</select>
	    </div>
   </div>
   
   <div class="panel-body">
   		<div class="kategorie-container">
		    <ul class="kategorie-list">
		    	<li><button type="button" class="btn btn-fir" id="korBtn">한식</button></li>
		    	<li><button type="button" class="btn btn-fir" id="chnBtn">중식</button></li>
		    	<li><button type="button" class="btn btn-fir" id="japBtn">일식</button></li>
		    	<li><button type="button" class="btn btn-fir" id="wesBtn">양식</button></li>
		    	<li><button type="button" class="btn btn-fir" id="vietBtn">베트남</button></li>
		    </ul>
   		</div>
   </div>
	
	<div class="panel-footer">
    	<div class="image-header"># 오늘의 추천 pick</div>
    	<div class="chat-body">
    		<div class="slideshow-container">
                <div class="slides-wrapper">
                    <div class="slide">
                        <img src="https://img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E" alt="이미지 1">
                        <p>가게 이름</p>
                    </div>
                    <div class="slide">
                        <img src="https://img1.kakaocdn.net/cthumb/local/C264x196.q50/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2F42F0E8B92BBD4145B7B7F3A8C66092AD" alt="이미지 2">
                        <p>가게 이름</p>
                    </div>
                    <div class="slide">
                        <img src="https://img1.kakaocdn.net/cthumb/local/C640x960.q50/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2FF5F4393C6D35419B9545F2F230E5D334" alt="이미지 3">
                    </div>
                    <div class="slide">
                        <img src="https://img1.kakaocdn.net/cthumb/local/C640x960.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2Fcf3b48884e2c3bf3f7b9bec246ac3f3925e3f921%3Foriginal" alt="이미지 4">
                    </div>
                    <div class="slide">
                        <img src="https://img1.kakaocdn.net/cthumb/local/C264x196.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2F4e6288d57f8db53b1136c87e78715a4e2f4634f2%3Foriginal" alt="이미지 5">
                    </div>
                    <div class="slide">
                        <img src="https://img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2F7ef2638e4b26750a2e18c779ba9b04e9a6bab298%3Foriginal" alt="이미지 6">
                    </div>
                </div>
                <!-- <a class="prev" onclick="moveSlide(-1)">❮</a>
                <a class="next" onclick="moveSlide(1)">❯</a> -->
            </div>
	        <!-- <div class="image-con">
			      이미지 컨테이너
			      <div class="image-row">
			        <div class="image">
			          <img src="https://img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E" alt="이미지 1">
			        </div>
			        <div class="image">
			          <img src="https://img1.kakaocdn.net/cthumb/local/C264x196.q50/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2F42F0E8B92BBD4145B7B7F3A8C66092AD" alt="이미지 2">
			        </div>
			        <div class="image">
			          <img src="https://img1.kakaocdn.net/cthumb/local/C640x960.q50/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2FF5F4393C6D35419B9545F2F230E5D334" alt="이미지 3">
			        </div>
			      </div>
			      가게 이름 컨테이너
			      <div class="name-row">
			        <div class="name">
			          <p>가게 이름</p>
			        </div>
			        <div class="name">
			          <p>가게 이름</p>
			        </div>
			        <div class="name">
			          <p>가게 이름</p>
			        </div>
			      </div>
	 		</div> -->
    		<div class="image-header">#검색 결과</div>
    		<div class="chat-body2">
        		<div class="store-con">
		            <!-- 첫 번째 가게 블록 -->
		            <div class="store-block">
		                <div class="store-image">
		                    <img src="https://img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E" alt="가게 이미지 1">
		                </div>
		                <div class="store-info">
		                    <p class="store-name">가게 이름</p>
		                    <p class="store-type">가게 종류</p>
		                    <p class="store-hours">영업 시간</p>
		                </div>
		            </div>
		            <!-- 두 번째 가게 블록 -->
		            <div class="store-block">
		                <div class="store-image">
		                    <img src="https://img1.kakaocdn.net/cthumb/local/C264x196.q50/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2F42F0E8B92BBD4145B7B7F3A8C66092AD" alt="가게 이미지 2">
		                </div>
		                <div class="store-info">
		                    <p class="store-name">가게 이름</p>
		                    <p class="store-type">가게 종류</p>
		                    <p class="store-hours">영업 시간</p>
		                </div>
		            </div>
		            <!-- 세 번째 가게 블록 -->
		            <div class="store-block">
		                <div class="store-image">
		                    <img src="https://img1.kakaocdn.net/cthumb/local/C544x408.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E" alt="가게 이미지 3">
		                </div>
		                <div class="store-info">
		                    <p class="store-name">가게 이름</p>
		                    <p class="store-type">가게 종류</p>
		                    <p class="store-hours">영업 시간</p>
		                </div>
		            </div>
        		</div>
    		</div>
		</div>
	</div>
	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/search.js"></script>
</body>
</html>