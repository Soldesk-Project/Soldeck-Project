document.getElementById('findIdBtn').addEventListener('click', function() {
	document.getElementById('resultContainer').style.display = 'block';
	// 여기에 아이디 조회 로직 추가
});

document.getElementById('findPwPageBtn').addEventListener('click', function() {
	window.location.href = 'findPw';
});