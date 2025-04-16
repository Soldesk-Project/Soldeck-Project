// CSS 파일 추가
// 1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/view.css';
// 2. link 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
// 3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

//모달 창 열기
const uploadBtn = document.getElementById('uploadBtn');
const reservationModal = document.getElementById('reservationModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const confirmReservationBtn = document.getElementById('confirmReservationBtn');
const monthSelect = document.getElementById('monthSelect');
const calendarDays = document.getElementById('calendarDays');

let selectedDate = null;
let selectedTime = null;
let selectedMonth = 4; // 기본값: 4월

uploadBtn.addEventListener('click', () => {
  reservationModal.style.display = 'flex';
  renderCalendar(selectedMonth); // 모달 열릴 때 캘린더 렌더링
});

// 모달 창 닫기
closeModalBtn.addEventListener('click', () => {
  reservationModal.style.display = 'none';
  resetSelections();
});

// 월 선택 시 캘린더 업데이트
monthSelect.addEventListener('change', (e) => {
  selectedMonth = parseInt(e.target.value);
  renderCalendar(selectedMonth);
});

// 캘린더 렌더링 함수
function renderCalendar(month) {
  calendarDays.innerHTML = ''; // 기존 캘린더 초기화

  // 2025년 기준 월별 일수 및 첫 날 요일 계산
  const year = 2025;
  const daysInMonth = new Date(year, month, 0).getDate(); // 해당 월의 일수
  const firstDay = new Date(year, month - 1, 1).getDay(); // 첫 날의 요일 (0: 일요일, 6: 토요일)

  // 이전 달의 마지막 날짜 계산 (비활성화된 날짜 표시용)
  const prevMonth = month === 4 ? 3 : month - 1;
  const daysInPrevMonth = new Date(year, prevMonth, 0).getDate();
  const prevMonthStart = daysInPrevMonth - firstDay + 1;

  // 첫 날 요일 전까지 비활성화된 날짜 추가
  for (let i = 0; i < firstDay; i++) {
    const day = document.createElement('div');
    day.classList.add('day', 'disabled');
    day.textContent = prevMonthStart + i;
    calendarDays.appendChild(day);
  }

  // 현재 달의 날짜 추가
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.classList.add('day');
    day.textContent = i;

    // 오늘 이전 날짜 비활성화 (2025년 4월 15일 기준)
    const today = new Date(2025, 3, 16); // 2025년 4월 15일
    const currentDate = new Date(year, month - 1, i);
    if (currentDate < today) {
      day.classList.add('disabled');
    } else {
      day.addEventListener('click', () => {
        const days = document.querySelectorAll('.day:not(.disabled)');
        days.forEach(d => d.classList.remove('selected'));
        day.classList.add('selected');
        selectedDate = day.textContent;
      });
    }

    calendarDays.appendChild(day);
  }

  // 다음 달의 날짜 추가 (비활성화)
  const totalDays = firstDay + daysInMonth;
  const remainingDays = (7 - (totalDays % 7)) % 7;
  for (let i = 1; i <= remainingDays; i++) {
    const day = document.createElement('div');
    day.classList.add('day', 'disabled');
    day.textContent = i;
    calendarDays.appendChild(day);
  }
}

// 시간 선택
const timeButtons = document.querySelectorAll('.time-btn');
timeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    timeButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedTime = btn.textContent;
  });
});

// 예약 확인
confirmReservationBtn.addEventListener('click', () => {
  if (!selectedDate || !selectedTime) {
    alert('날짜와 시간을 선택해주세요.');
    return;
  }
  alert(`예약이 완료되었습니다!\n날짜: 2025년 ${selectedMonth}월 ${selectedDate}일\n시간: ${selectedTime}`);
  reservationModal.style.display = 'none';
  resetSelections();
});

// 선택 초기화
function resetSelections() {
  selectedDate = null;
  selectedTime = null;
  selectedMonth = 4; // 기본값으로 4월 복귀
  monthSelect.value = '4';
  const days = document.querySelectorAll('.day:not(.disabled)');
  days.forEach(day => day.classList.remove('selected'));
  timeButtons.forEach(btn => btn.classList.remove('selected'));
  renderCalendar(selectedMonth); // 캘린더 초기화
}