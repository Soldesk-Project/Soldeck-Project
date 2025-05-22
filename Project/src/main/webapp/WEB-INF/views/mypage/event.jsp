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
  
  <div class="wrapper">
	  <div class="container">
		<div class="side-menu">
	  		<jsp:include page="../layout/sideMenu.jsp"/>
		</div>
		<div class="mainBoxDesign">
			<div class="main-menu">
				<div class="main-list">
					<div class="inner-main">
						<div class="my-point-div">
						
						</div>
						<ul>
							<li>
								<div class="use-point">
									<div class="use-point-list-img">
										<img alt="응모 제품 사진" src="../resources/images/event_point_1.png" class="use-point-img">
									</div>
									<div class="point-list-title">
										<span>아이패드</span>
									</div>
									<div class="point-list-time">
										<span>응모 기간</span>
										 : 2025.04.01 ~
									</div>
									<div class="amount-used-point">
										<span>소모 포인트</span>
										 : 1000p
										<button data-product="iPad" data-point="1000" class="point-btn">응모하기</button>
									</div>
								</div>
							</li>
							<li>
								<div class="use-point">
									<div class="use-point-list-img">
										<img alt="응모 제품 사진" src="../resources/images/event_point_2.png" class="use-point-img">
									</div>
									<div class="point-list-title">
										<span>스탠바이미</span>
									</div>
									<div class="point-list-time">
										<span>응모 기간</span>
										 : 2025.04.01 ~
									</div>
									<div class="amount-used-point">
										<span>소모 포인트</span>
										 : 1500p
										 <button data-product="stanByMe" data-point="1500" class="point-btn">응모하기</button>
									</div>
								</div>
							</li>
							<li>
								<div class="use-point">
									<div class="use-point-list-img">
										<img alt="응모 제품 사진" src="../resources/images/event_point_3.png" class="use-point-img">
									</div>
									<div class="point-list-title">
										<span>갤럭시 북</span>
									</div>
									<div class="point-list-time">
										<span>응모 기간</span>
										 : 2025.04.01 ~
									</div>
									<div class="amount-used-point">
										<span>소모 포인트</span>
										 : 2000p
										 <button data-product="GalaxyBook" data-point="2000" class="point-btn">응모하기</button>
									</div>
								</div>
							</li>
							<li>
								<div class="use-point">
									<div class="use-point-list-img">
										<img alt="응모 제품 사진" src="../resources/images/event_point_4.png" class="use-point-img">
									</div>
									<div class="point-list-title">
										<span>닌텐도 스위치</span>
									</div>
									<div class="point-list-time">
										<span>응모 기간</span>
										 : 2025.04.01 ~
									</div>
									<div class="amount-used-point">
										<span>소모 포인트</span>
										 : 500p
										 <button data-product="switch" data-point="500" class="point-btn">응모하기</button>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	  </div>
  </div>
	
	<div id="customConfirm" class="result-modal">
		<div class="inner-modal">
			<div class="modal-instructions">

			</div>
			<div class="point-modal-content">
			    <button class="close-modal" id="closeModalBtn">확인</button>
		    </div>
		</div>
	</div>
	
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/mypageEvent.js"></script>
</body>
</html>