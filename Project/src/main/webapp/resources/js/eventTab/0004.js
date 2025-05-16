//-----스페이스 락-----------------------------------------------------
(function() {
	

window.addEventListener('keydown', function(e) {
	if (e.keyCode === 32 && e.target === document.body) {
	  	e.preventDefault();
  	}
});

// 출석 정보 저장 객체
let attendance = {};

// 오늘 날짜 정보
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth(); // 0~11
const date = today.getDate();

// 달력 그리기
function drawCalendar(year, month) {
    const monthTitle = document.getElementById('monthTitle');
    monthTitle.textContent = `${year}년 ${month+1}월`;

    const table = document.getElementById('calendarTable');
    table.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month+1, 0).getDate();

    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    let thead = '<tr>' + weekdays.map(d=>`<th>${d}</th>`).join('') + '</tr>';
    table.insertAdjacentHTML('beforeend', thead);

    let tr = '<tr>';
    for(let i=0; i<firstDay; i++) tr += '<td></td>';

    for(let d=1; d<=lastDate; d++) {
        const isToday = (d === date && year === today.getFullYear() && month === today.getMonth());
        const isChecked = attendance[d];
        tr += `<td class="${isToday ? 'today' : ''} ${isChecked ? 'checked' : ''}" data-day="${d}">
                ${d}
                ${isChecked ? '<span class="checkmark">✔</span>' : ''}
              </td>`;
        if ((firstDay + d) % 7 === 0) tr += '</tr><tr>';
    }
    const remain = (firstDay + lastDate) % 7;
    if (remain !== 0) for(let i=0; i<7-remain; i++) tr += '<td></td>';
    tr += '</tr>';

    table.insertAdjacentHTML('beforeend', tr);
}

// 서버에서 출석 정보 불러오기
function loadAttendanceData(year, month) {
    fetch('/event/loadAttendance', {
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ year: year, month: month+1 })
    })
    .then(res => res.json())
    .then(data => {
    	const days = Array.isArray(data) ? data : [];
    	console.log(days);
        attendance = days.reduce((acc, day) => {
            acc[day] = true;
            return acc;
        }, {});
        drawCalendar(year, month);
    });
}

// 출석체크 버튼 클릭 이벤트
document.querySelector('.today-check-btn').addEventListener('click', () => {
    const todayStr = `${year}-${String(month+1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    let todayCheck=document.querySelector('.today').classList.contains('checked');
    if (!todayCheck) {
	    fetch('/event/checkAttendance', {
	        method: 'POST',
	        headers: { 'content-type': 'application/json; charset=utf-8' },
	        body: JSON.stringify({ attendance_date: todayStr })
	    })
	    .then(response => response.json())
	    .then(result => {
	        if (result) {
	            loadAttendanceData(year, month); // 출석정보 갱신
	            AttendanceCheck(); // 포인트 적립
	        }
	    })
	    .catch(err => console.log(err));
	    openModal('출석체크 완료!');
    } else {
        openModal('오늘 이미 출석체크를 완료하였습니다');
    }
});

// 포인트 적립
function AttendanceCheck() {
    fetch('/event/savePoint', {
        method : 'post',
        headers : { 'content-type' : 'application/json; charset=utf-8' },
        body : JSON.stringify({point: 100})
    })
    .then(response => response.json())
    .then(result => {
        loadMyPointData();
    })
    .catch(err => console.log(err));
}

// 내 포인트 불러오기
function loadMyPointData() {
    fetch('/event/list/point')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector(".my-point");
        let myPoint = '';
        if (data.point>=0 ){
            myPoint+= `<p>현재 내 포인트 : <span class="my-point">${data.point }</span></p>`;
        }
        container.innerHTML=myPoint;
    })
    .catch(error => console.error("포인트  로드 실패:", error));
}


const modal = document.querySelector('.result-modal');
const instructions =document.querySelector('.modal-instructions');
function openModal(check) {
	let p=`<p>${check}</p>`;
	instructions.innerHTML=p;	
	modal.style.display = 'block';
	document.body.style.overflow = 'hidden';

}	
function closeModal(){
	modal.style.display = 'none';
	document.body.style.overflow = 'auto';
}
document.querySelector('.close-modal').addEventListener('click',()=>{
	closeModal();
});

	
// 초기화
loadAttendanceData(year, month);
loadMyPointData();
})();

