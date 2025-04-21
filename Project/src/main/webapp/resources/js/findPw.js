document.addEventListener('DOMContentLoaded', function() {
  const findPwBtn = document.getElementById('findPwBtn');
  const idInput = document.getElementById('Id');
  const birthDateInput = document.getElementById('birth_date');
  const resultContainer = document.getElementById('resultContainer');
  const resultDiv = document.getElementById('result');

  findPwBtn.addEventListener('click', function() {
    const id = idInput.value;
    const birthDate = birthDateInput.value;

    if (!id) {
      alert('아이디를 입력해주세요.');
      return;
    }
    if (!birthDate) {
      alert('생년월일을 입력해주세요.');
      return;
    }

    fetch('/login/findPwProcess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `Id=${encodeURIComponent(id)}&birthDate=${encodeURIComponent(birthDate)}`,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      resultContainer.style.display = 'block';
      if (data.startsWith('비밀번호: ')) {
        // 비밀번호 찾기 성공
        resultDiv.textContent = data.substring('비밀번호: '.length);
      } else {
        // 비밀번호 찾기 실패
        resultDiv.textContent = data;
      }
    })
    .catch(error => {
      console.error('비밀번호 조회 실패:', error);
      resultDiv.textContent = '비밀번호 조회에 실패했습니다. 잠시 후 다시 시도해주세요.';
      resultContainer.style.display = 'block';
    });
  });
});