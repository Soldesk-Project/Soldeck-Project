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
		<div class="main-menu">
			<ul>
				<li>
					<a href="/list/0001">
						<div class="event-list-img">
							<img alt="이벤트 사진" src="../resources/images/event.png" class="event-img">
						</div>
						<div class="event-list-title">
							<span>이벤트 명 1</span>
						</div>
						<div class="event-list-time">
							<span>이벤트 기간</span>
							 : 2025.04.01 ~
						</div>
					</a>
				</li>
				<li>
					<a href="/list/0002">
						<div class="event-list-img">
							<img alt="이벤트 사진" src="../resources/images/event.png" class="event-img">
						</div>
						<div class="event-list-title">
							<span>이벤트 명 2</span>
						</div>
						<div class="event-list-time">
							<span>이벤트 기간</span>
							 : 2025.04.01 ~
						</div>
					</a>
				</li>
				<li>
					<a href="/list/0003">
						<div class="event-list-img">
							<img alt="이벤트 사진" src="../resources/images/event.png" class="event-img">
						</div>
						<div class="event-list-title">
							<span>이벤트 명 3</span>
						</div>
						<div class="event-list-time">
							<span>이벤트 기간</span>
							 : 2025.04.01 ~
						</div>
					</a>
				</li>
				<li>
					<a href="/list/0004">
						<div class="event-list-img">
							<img alt="이벤트 사진" src="../resources/images/event.png" class="event-img">
						</div>
						<div class="event-list-title">
							<span>이벤트 명 4</span>
						</div>
						<div class="event-list-time">
							<span>이벤트 기간</span>
							 : 2025.04.01 ~
						</div>
					</a>
				</li>
			</ul>
		</div>	
	</div>	
	
	<jsp:include page="../layout/footer.jsp"/>
<script type="text/javascript" src="/resources/js/mainEvent.js"></script>
</body>
</html>