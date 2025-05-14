//-----CSS 파일 추가-----------------------------------------
(function() {
	
	const CSS_FILE_PATH = '/resources/css/eventTab/0004.css';
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = CSS_FILE_PATH;
	document.head.appendChild(linkEle);
})();

//----- 게임 ------------------------------------------------------------------





	// 출석 정보 저장(로컬스토리지 활용)
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0~11
    const date = today.getDate();

    const attendanceKey = `attendance-${year}-${month+1}`;
    let attendance = JSON.parse(localStorage.getItem(attendanceKey)) || {};

    function saveAttendance() {
      localStorage.setItem(attendanceKey, JSON.stringify(attendance));
    }

    function drawCalendar(year, month) {
      const monthTitle = document.getElementById('monthTitle');
      monthTitle.textContent = `${year}년 ${month+1}월`;

      const table = document.getElementById('calendarTable');
      table.innerHTML = '';

      const firstDay = new Date(year, month, 1).getDay(); // 0:일 ~ 6:토
      const lastDate = new Date(year, month+1, 0).getDate();

      // 요일 헤더
      const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
      let thead = '<tr>' + weekdays.map(d=>`<th>${d}</th>`).join('') + '</tr>';
      table.insertAdjacentHTML('beforeend', thead);

      let tr = '<tr>';
      // 빈칸
      for(let i=0; i<firstDay; i++) tr += '<td></td>';

      for(let d=1; d<=lastDate; d++) {
        const thisDay = new Date(year, month, d);
        const isToday = (d === date && year === today.getFullYear() && month === today.getMonth());
        const isChecked = attendance[d];
        tr += `<td 
                  class="${isToday ? 'today' : ''} ${isChecked ? 'checked' : ''}" 
                  data-day="${d}">
                  ${d}
                  ${isChecked ? '<span class="checkmark">✔</span>' : ''}
               </td>`;
        // 줄바꿈
        if ((firstDay + d) % 7 === 0) {
          tr += '</tr><tr>';
        }
      }
      // 빈칸 채우기
      const remain = (firstDay + lastDate) % 7;
      if (remain !== 0) for(let i=0; i<7-remain; i++) tr += '<td></td>';
      tr += '</tr>';

      table.insertAdjacentHTML('beforeend', tr);

      // 클릭 이벤트
      table.querySelectorAll('td[data-day]').forEach(td => {
        td.onclick = function() {
          const day = this.dataset.day;
          if (!attendance[day]) {
            attendance[day] = true;
            saveAttendance();
            drawCalendar(year, month);
          } else {
            // 이미 체크된 날짜 클릭 시 해제(원하면 주석 해제)
             delete attendance[day];
             saveAttendance();
             drawCalendar(year, month);
          }
        }
      });
    }

    drawCalendar(year, month);




