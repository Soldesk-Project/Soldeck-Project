document.addEventListener('DOMContentLoaded', function() {
    var popup = document.getElementById('popup');
    var closeBtn = document.getElementById('close');

    // 팝업 표시 (예시: 페이지 로드 후 1초 뒤에 표시)
    setTimeout(function() {
        popup.style.display = 'block'; // 'flex' 대신 'block' 사용
    }, 1000);

    // 팝업 닫기
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });
});