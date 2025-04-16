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
	<div class="friend-list">
		<h2>나와 잘 맞을 거 같은 친구</h2>
		<table>
			<tbody>
				<tr>
					<th><input type="image" src="../resources/images/profile.png" alt="profile" id="proFile" style="width: 70px; cursor: pointer;">
						<br>별명
					</th>
					<th><input type="image" src="../resources/images/profile.png" alt="profile" id="proFile" style="width: 70px; cursor: pointer;">
						<br>별명
					</th>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="club-list">
		<h2>내 취향에 딱인 모임 pick!</h2>
		<table>
			<tbody>
				<tr>
					<th><input type="image" src="../resources/images/profile.png" alt="profile" id="proFile" style="width: 70px; cursor: pointer;">
						<br>별명
					</th>
					<th><input type="image" src="../resources/images/profile.png" alt="profile" id="proFile" style="width: 70px; cursor: pointer;">
						<br>별명
					</th>
				</tr>
			</tbody>
		</table>
	</div>
	<jsp:include page="../layout/footer.jsp"/> 
</body>
</html>