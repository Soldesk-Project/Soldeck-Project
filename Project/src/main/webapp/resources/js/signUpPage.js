document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const yyyyInput = document.getElementById('yyyy');
    const mmInput = document.getElementById('mm');
    const ddInput = document.getElementById('dd');
    const idInput = document.getElementById('id');
    const passwordInput = document.getElementById('password');
    const nicknameInput = document.getElementById('nickname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const idCheckMessage = document.getElementById('idCheckMessage');
    const nicknameCheckMessage = document.getElementById('nicknameCheckMessage');
    const emailCheckMessage = document.getElementById('emailCheckMessage');
    const femaleRadio = document.getElementById('female');
    const maleRadio = document.getElementById('male');
    const koreanInterest = document.getElementById('korean');
    const japaneseInterest = document.getElementById('japanese');
    const chineseInterest = document.getElementById('chinese');
    const westernInterest = document.getElementById('western');
    const vietnameseInterest = document.getElementById('vietnamese');
    const interestErrorMessage = document.getElementById('interestErrorMessage');
    const interestCheckboxes = document.querySelectorAll('input[name="interest"]');

    // 정규식
    const regId = /^[0-9a-z]{8,16}$/;
    const regPw = /^[0-9a-zA-Z]{8,16}$/;
    const regName = /^[가-힣]{2,6}$/;
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    // 유효성 검사 함수
    function validateName() {
        const nameValue = nameInput.value.trim();
        if (!regName.test(nameValue)) {
            alert('이름은 2~6자의 한글로 입력해주세요.');
            nameInput.focus();
            return false;
        }
        return true;
    }

    function validateBirthDate() {
        const yyyyValue = yyyyInput.value.trim();
        const mmValue = mmInput.value.trim();
        const ddValue = ddInput.value.trim();

        if (!/^\d{4}$/.test(yyyyValue) || !/^\d{2}$/.test(mmValue) || !/^\d{2}$/.test(ddValue)) {
            alert('생년월일을 yyyy, mm, dd 형식에 맞춰 입력해주세요.');
            yyyyInput.focus();
            return false;
        }

        const month = parseInt(mmValue, 10);
        const day = parseInt(ddValue, 10);

        if (month < 1 || month > 12 || day < 1 || day > new Date(yyyyValue, month, 0).getDate()) {
            alert('올바른 생년월일을 입력해주세요.');
            mmInput.focus();
            return false;
        }
        return true;
    }

    function validateId() {
        const idValue = idInput.value.trim();
        if (!regId.test(idValue)) {
            idCheckMessage.textContent = '아이디는 8~16자의 영문 소문자와 숫자로만 입력해주세요.';
            idInput.focus();
            return false;
        } else {
            idCheckMessage.textContent = ''; // 유효성 통과 시 메시지 초기화
            // TODO: 아이디 중복 확인 (AJAX) 로직 추가
        }
        return true;
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();
        if (!regPw.test(passwordValue)) {
            alert('비밀번호는 8~16자의 영문 대/소문자와 숫자로만 입력해주세요.');
            passwordInput.focus();
            return false;
        }
        return true;
    }

    function validateNickname() {
        const nicknameValue = nicknameInput.value.trim();
        if (nicknameValue.length < 2) {
            nicknameCheckMessage.textContent = '별명은 최소 2자 이상 입력해주세요.';
            nicknameInput.focus();
            return false;
        } else {
            nicknameCheckMessage.textContent = ''; // 유효성 통과 시 메시지 초기화
            // TODO: 닉네임 중복 확인 (AJAX) 로직 추가
        }
        return true;
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        if (!regEmail.test(emailValue)) {
            emailCheckMessage.textContent = '올바른 이메일 주소 형식이 아닙니다.';
            emailInput.focus();
            return false;
        } else {
            emailCheckMessage.textContent = ''; 
            // TODO: 이메일 중복 확인 (AJAX) 로직 추가
        }
        return true;
    }

    function validateGender() {
        if (!femaleRadio.checked && !maleRadio.checked) {
            alert('성별을 선택해주세요.');
            return false;
        }
        return true;
    }
    
    function validateInterest() {
        let isChecked = false;
        interestCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                isChecked = true;
            }
        });

        if (!isChecked) {
            interestErrorMessage.textContent = '관심분야를 최소 1개 선택해주시기 바랍니다.';
            return false;
        } else {
            interestErrorMessage.textContent = '';
            return true;
        }
    }
    
    // 폼 제출 이벤트 리스너
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            if (!validateName()) {
                event.preventDefault();
                return;
            }
            if (!validateBirthDate()) {
                event.preventDefault();
                return;
            }
            if (!validateGender()) {
                event.preventDefault();
                return;
            }
            if (!validateId()) {
                event.preventDefault();
                return;
            }
            if (!validatePassword()) {
                event.preventDefault();
                return;
            }
            if (!validateNickname()) {
                event.preventDefault();
                return;
            }
            if (!validateEmail()) {
                event.preventDefault();
                return;
            }
            if (!validateInterest()) {
                event.preventDefault();
                return;
            }
        });
    }

    // 아이디 입력 필드 focusout 이벤트에 유효성 검사 함수 연결
    if (idInput) {
        idInput.addEventListener('focusout', validateId);
    }

    // 닉네임 입력 필드 focusout 이벤트에 유효성 검사 함수 연결
    if (nicknameInput) {
        nicknameInput.addEventListener('focusout', validateNickname);
    }

    // 이메일 입력 필드 focusout 이벤트에 유효성 검사 함수 연결
    if (emailInput) {
        emailInput.addEventListener('focusout', validateEmail);
    }
});