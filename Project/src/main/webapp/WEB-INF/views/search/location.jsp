<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/header.css">
<link rel="stylesheet" href="/resources/css/footer.css">
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
			<div class="rest-body">
				<div class="image-con">
				</div>
			</div>
		</div>
		
		<!-- Model 속성을 data-* 속성으로 노출 -->
		<div id="location-data" data-region="${region}" data-category="${category}"></div>
	</div>
	
	<script type="text/javascript" src="/resources/js/location.js"></script> 
	<jsp:include page="../layout/footer.jsp"/>
</body>
</html>