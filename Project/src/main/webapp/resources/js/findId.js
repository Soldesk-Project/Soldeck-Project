document.addEventListener('DOMContentLoaded', function() {
    const findIdBtn = document.getElementById('findIdBtn');
    const findPwPageBtn = document.getElementById('findPwPageBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultDiv = document.getElementById('result');
    const nameInput = document.getElementById('name');
    const birthDateInput = document.getElementById('birthDate');
    const contactInput = document.getElementById('contact');

    findIdBtn.addEventListener('click', function() {
        const name = nameInput.value;
        const birthDate = birthDateInput.value;
        const contact = contactInput.value;

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

        if (!contact) {
            alert('연락처를 입력해주세요.');
            contactInput.focus();
            return;
        }
        fetch('/login/findIdProcess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${encodeURIComponent(name)}&birthDate=${encodeURIComponent(birthDate)}&contact=${encodeURIComponent(contact)}`,
        })
        .then(response => response.text())
        .then(data => {
            resultDiv.textContent = data;
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