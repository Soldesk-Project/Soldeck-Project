document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const yyyyInput = document.getElementById('yyyy'); // 오타 수정
    const mmInput = document.getElementById('mm');
    const ddInput = document.getElementById('dd');
    const idInput = document.getElementById('id');
    const passwordInput = document.getElementById('password');
    const nicknameInput = document.getElementById('nickname');
    const emailInput = document.getElementById('email');
    const phone1Input = document.getElementById('phone1');
    const phone2Input = document.getElementById('phone2');
    const phone3Input = document.getElementById('phone3');
    const phoneErrorMessage = document.getElementById('phoneErrorMessage');
    const idCheckMessage = document.getElementById('idCheckMessage');
    const nicknameCheckMessage = document.getElementById('nicknameCheckMessage');
    const emailCheckMessage = document.getElementById('emailCheckMessage');
    const passwordErrorMessage = document.getElementById('passwordErrorMessage');
    const femaleRadio = document.getElementById('female');
    const maleRadio = document.getElementById('male');
    const interestCheckboxes = document.querySelectorAll('input[name="interest"]');
    const interestErrorMessage = document.getElementById('interestErrorMessage');
    const profileImageInput = document.getElementById('profileImage');
    const previewImage = document.getElementById('previewImage');
    const fileUploadSpan = document.querySelector('.file-upload .file-name');
    const birthDateErrorMessage = document.getElementById('birthDateErrorMessage');
    const passwordCheckInput = document.getElementById('passwordCheck');
    const passwordCheckMessage = document.getElementById('passwordCheckMessage');

    // 정규식
    const regId = /^[0-9a-z]{8,16}$/;
    const regPw = /^[0-9a-zA-Z]{8,16}$/;
    const regName = /^[가-힣]{2,6}$/;
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const regPhone = /^\d{2,3}\d{3,4}\d{4}$/; // 숫자만 입력하는 형식으로 변경

    profileImageInput.addEventListener('change', function() {
		const file = this.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function(e) {
				previewImage.src = e.target.result;
			};
			reader.readAsDataURL(file);
			fileUploadSpan.textContent = file.name; // 선택된 파일 이름 표시
		} else {
			previewImage.src = '#'; // 미리보기 초기화
			fileUploadSpan.textContent = '선택된 파일 없음';
		}
	});
    
    // 유효성 검사 함수
    function validateName() {
        const nameValue = nameInput.value.trim();
        if (!regName.test(nameValue)) {
            // 이름 필드 옆에 에러 메시지를 표시할 div가 필요할 수 있습니다.
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
        let errorMessage = '';

        if (!/^\d{4}$/.test(yyyyValue)) {
        	errorMessage += '올바른 연도 형식을 입력해주세요.<br>';
        }

        if (!/^\d{2}$/.test(mmValue)) {
            errorMessage += '올바른 월 형식을 입력해주세요.<br>';
        } else if (parseInt(mmValue, 10) < 1 || parseInt(mmValue, 10) > 12) {
            errorMessage += '올바른 월을 입력해주세요 (1-12).<br>';
        }

        if (!/^\d{2}$/.test(ddValue)) {
            errorMessage += '올바른 일 형식을 입력해주세요 (DD).<br>';
        } else {
            const year = parseInt(yyyyValue, 10);
            const month = parseInt(mmValue, 10);
            const day = parseInt(ddValue, 10);
            const lastDayOfMonth = new Date(year, month, 0).getDate();
            if (day < 1 || day > lastDayOfMonth) {
            	errorMessage += '올바른 일을 입력해주세요 (' + lastDayOfMonth + '일 까지).<br>';
            }
        }

        if (errorMessage) {
            birthDateErrorMessage.innerHTML = errorMessage;
            return false;
        } else {
            birthDateErrorMessage.innerHTML = '';
            return true;
        }
    }
    
    let isIdChecked = false;
    
    function checkIdAvailability(idValue) {
        idCheckMessage.textContent = '아이디 중복 확인 중...';
        isIdChecked = false;
        return new Promise((resolve, reject) => {
            fetch('/login/checkId', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `id=${idValue}`
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'available') {
                    idCheckMessage.textContent = '사용 가능한 아이디입니다.';
                    isIdChecked = true;
                    resolve(true);
                } else {
                    idCheckMessage.textContent = '이미 사용 중인 아이디입니다.';
                    isIdChecked = false;
                    resolve(false);
                }
            })
            .catch(error => {
                console.error('ID 중복 확인 에러:', error);
                idCheckMessage.textContent = 'ID 중복 확인에 실패했습니다.';
                isIdChecked = false;
                resolve(false); // 오류 발생 시에도 resolve(false) 처리 (폼 제출 막기 위함)
            });
        });
    }

    function validateId() {
        const idValue = idInput.value.trim();
        if (!regId.test(idValue)) {
            idCheckMessage.textContent = '아이디는 8~16자의 영문 소문자와 숫자로만 입력해주세요.';
            isIdChecked = false;
            return Promise.resolve(false); // 형식 오류 시 즉시 Promise resolve(false)
        } else {
            return checkIdAvailability(idValue); // Promise 반환
        }
    }

    function validatePassword() {
        const passwordValue = passwordInput.value.trim();
        if (!regPw.test(passwordValue)) {
            passwordErrorMessage.textContent = '비밀번호는 8~16자의 영문 대/소문자와 숫자로만 입력해주세요.';
            return false;
        } else {
            passwordErrorMessage.textContent = '';
            return true;
        }
    }

	function validatePasswordCheck() {
		const passwordValue = passwordInput.value.trim();
		const passwordCheckValue = passwordCheckInput.value.trim();
		if (passwordValue !== passwordCheckValue) {
			passwordCheckMessage.textContent = '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
			return false;
		} else {
			passwordCheckMessage.textContent = '';
			return true;
		}
	}
    
    function validateNickname() {
        const nicknameValue = nicknameInput.value.trim();
        if (nicknameValue.length < 2 || nicknameValue.length > 8) {
        	nicknameCheckMessage.textContent = '별명은 2자 이상 8자 이하로 입력해주세요.';
        	return false;
        }else {
            nicknameCheckMessage.textContent = '';
            return true;
        }
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        if (!regEmail.test(emailValue)) {
            emailCheckMessage.textContent = '올바른 이메일 주소 형식이 아닙니다.';
            return false;
        } else {
            emailCheckMessage.textContent = '';
            return true;
        }
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

    function validatePhone() {
        const phone1Value = phone1Input.value.trim();
        const phone2Value = phone2Input.value.trim();
        const phone3Value = phone3Input.value.trim();

        if (!/^\d{2,3}$/.test(phone1Value) || !/^\d{3,4}$/.test(phone2Value) || !/^\d{4}$/.test(phone3Value)) {
            phoneErrorMessage.textContent = '올바른 전화번호 형식이 아닙니다. (숫자만 입력해주세요)';
            return false;
        } else {
            phoneErrorMessage.textContent = '';
            return true;
        }
    }
    
    // 관심분야 선택 제한 함수
    function limitInterestSelection() {
        let checkedCount = 0;
        interestCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkedCount++;
            }
        });

        if (checkedCount > 3) {
            this.checked = false; // 현재 체크된 체크박스 해제
            interestErrorMessage.textContent = '관심분야는 최대 3개까지 선택 가능합니다.';
        } else {
            interestErrorMessage.textContent = ''; // 3개 이하 선택 시 에러 메시지 초기화
        }
    }
    
    // 이벤트 리스너 추가 (실시간 유효성 검사 - 생년월일 관련 리스너 제거)
    idInput.addEventListener('input', validateId);
    passwordInput.addEventListener('input', validatePassword);
    passwordCheckInput.addEventListener('input', validatePasswordCheck);
    nicknameInput.addEventListener('input', validateNickname);
    emailInput.addEventListener('input', validateEmail);
    phone1Input.addEventListener('input', validatePhone);
    phone2Input.addEventListener('input', validatePhone);
    phone3Input.addEventListener('input', validatePhone);
    interestCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', limitInterestSelection);
    });

    // 폼 제출 이벤트 리스너 (AJAX 방식 - multipart/form-data)
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // 기본 폼 제출 막기

            const isNameValid = validateName();
            const isBirthDateValid = validateBirthDate();       
            const isGenderValid = validateGender();
            const isIdValid = await validateId();
            const isIdFormatValid = validateId();
            const isPasswordValid = validatePassword();
            const isPasswordCheckValid = validatePasswordCheck();
            const isNicknameValid = validateNickname();
            const isEmailValid = validateEmail();
            const isPhoneValid = validatePhone();
            const isInterestValid = validateInterest();

            let checkedCount = 0;
            interestCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    checkedCount++;
                }
            });

            if (checkedCount === 0) {
                interestErrorMessage.textContent = '관심분야를 최소 1개 선택해주세요.';
                return;
            } else if (checkedCount > 3) {
                interestErrorMessage.textContent = '관심분야는 최대 3개까지 선택 가능합니다.';
                return;
            } else {
                interestErrorMessage.textContent = '';
            }
            
            if (!isNameValid || !isBirthDateValid || !isGenderValid ||
                    !isIdValid || !isPasswordValid || !isPasswordCheckValid || !isNicknameValid ||
                    !isEmailValid || !isPhoneValid || !isInterestValid) {
                    return;
                }

            const formData = new FormData(registrationForm);

            // 분리된 전화번호 값을 하이픈으로 연결하여 'phone' 키로 FormData에 추가
            const phoneNumber = phone1Input.value + phone2Input.value + phone3Input.value;
            formData.append('phone', phoneNumber);
            
            console.log('Sending FormData:', formData); // 콘솔에 FormData 객체 확인

            fetch('/login/signUpProcess', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorText => {
                        throw new Error('회원가입 실패: ' + errorText);
                    });
                }
                return response.text();
            })
            .then(result => {
                console.log('회원가입 성공:', result);
                window.location.href = '/login/loginPage'; // 성공 후 리다이렉트
            })
            .catch(error => {
                console.error(error.message);
                alert('회원가입 실패:'); // 사용자에게 오류 알림 (선택 사항)
            });
        });
    }

    // 포커스 시 에러 메시지 초기화
    const errorElements = {
        idInput: idCheckMessage,
        passwordInput: passwordErrorMessage,
        passwordCheckInput: passwordCheckMessage,
        nicknameInput: nicknameCheckMessage,
        emailInput: emailCheckMessage,
        interestCheckboxes: interestErrorMessage,
        yyyyInput: birthDateErrorMessage,
        mmInput: birthDateErrorMessage,
        ddInput: birthDateErrorMessage,
        phone1Input: phoneErrorMessage,
        phone2Input: phoneErrorMessage,
        phone3Input: phoneErrorMessage
    };

    for (const inputElement in errorElements) {
        if (errorElements.hasOwnProperty(inputElement) && document.getElementById(inputElement)) {
            const element = document.getElementById(inputElement);
            if (inputElement === 'interestCheckboxes') {
                const checkboxes = document.querySelectorAll('input[name="interest"]');
                checkboxes.forEach(item => {
                    item.addEventListener('focusin', () => {
                        errorElements[inputElement].textContent = '';
                    });
                });
            } else {
                element.addEventListener('focusin', () => {
                    errorElements[inputElement].textContent = '';
                });
            }
        }
    }
});