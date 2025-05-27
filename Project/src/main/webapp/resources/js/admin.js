// 사이드바 매장 관리 클릭 시 등록, 수정 스크립트
document.addEventListener('DOMContentLoaded', function() {
    const storeManagementLink = document.querySelector('.main-menu .side-restaurant');
    const restaurantMenu = document.querySelector('.restaurant-menu');

    storeManagementLink.addEventListener('click', function(event) {
        event.preventDefault(); // 기본 링크 동작 방지
        restaurantMenu.style.display = restaurantMenu.style.display === 'none' ? 'block' : 'none';
    });
});

// 페이지 이동 시 1페이지로 이동
function resetPageNumAndSubmit() {
	document.getElementById('pageNum').value = 1;
    document.getElementById('searchForm').submit();
  }
  
function resetPageNum() {
    document.getElementById('pageNum').value = 1;
  }

//document.querySelectorAll('.update_btn').forEach(button => {
//    button.addEventListener('click', () => {
//        const row = button.closest('tr');
//        const restNoInput = row.querySelector('.rest_no');
//
//        console.log("row:", row);
//        console.log("restNoInput:", restNoInput);
//        console.log("restNoInput.value:", restNoInput?.value);
//
//        const rest_no = restNoInput?.value.trim();  // ✅ 이 줄 반드시 필요!
//        console.log("정상 추출된 rest_no:", rest_no);
//
//        if (rest_no && !isNaN(rest_no)) {
//            const url = `/admin/update?rest_no=${rest_no}`;
//            console.log("이동할 주소:", url);
//            location.href = url;
//        } else {
//            alert("매장 번호가 올바르지 않습니다.");
//        }
//    });
//});
