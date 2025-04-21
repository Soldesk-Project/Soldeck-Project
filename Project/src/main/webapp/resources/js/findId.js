document.addEventListener('DOMContentLoaded', function() {
    const findIdBtn = document.getElementById('findIdBtn');
    const findPwPageBtn = document.getElementById('findPwPageBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultDiv = document.getElementById('result');
    const nameInput = document.getElementById('name');
    const birthDateInput = document.getElementById('birthDate');

    findIdBtn.addEventListener('click', function() {
        const name = nameInput.value;
        const birthDate = birthDateInput.value;

        if (!name) {
            alert('이름을 입력해주세요.');
            nameInput.focus();
            return;
        }

        if (!birthDate) {
            alert('생년월일을 입력해주세요.');
            birthDateInput.focus();
            return;
        }

        fetch('/login/findIdProcess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${encodeURIComponent(name)}&birthDate=${encodeURIComponent(birthDate)}`,
        })
        .then(response => response.text())
        .then(data => {
            resultDiv.textContent = `아이디 조회 결과: ${data}`;
            resultContainer.style.display = 'block';
        })
        .catch(error => {
            console.error('아이디 조회 실패:', error);
            resultDiv.textContent = '아이디 조회에 실패했습니다. 잠시 후 다시 시도해주세요.';
            resultContainer.style.display = 'block';
        });
    });

    findPwPageBtn.addEventListener('click', function() {
        window.location.href = 'findPw';
    });
});