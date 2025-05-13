//-----CSS 파일 추가-----------------------------------------
const CSS_FILE_PATH = '/resources/css/modifyInfo.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);

const CSS_FILE_PATH2 = '/resources/css/header.css';
let linkEle2 = document.createElement('link');
linkEle2.rel = 'stylesheet';
linkEle2.href = CSS_FILE_PATH2;
document.head.appendChild(linkEle2);

const CSS_FILE_PATH3 = '/resources/css/footer.css';	
let linkEle3 = document.createElement('link');
linkEle3.rel = 'stylesheet';
linkEle3.href = CSS_FILE_PATH3;
document.head.appendChild(linkEle3);
//-----버튼 클릭 이벤트----------------------------------------------
window.onload = () => {
	const mnoInput = document.querySelector('input[name="mem_no"]');
	
	document.querySelectorAll('button').forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			let type = btn.getAttribute("id");
			let mem_no=mnoInput.value;
			
			
			if(type == 'profileUploadBtn'){
				profileImageInput.click();
			}else if(type=='modifyBtn'){
				modify(mem_no);
			}else if(type=='removeBtn'){
				remove(mem_no);
			}
		});
	});
	// "수정 리셋" 버튼 클릭 이벤트 리스너 추가
	const resetButton = document.querySelector('button[type="reset"]');
	if (resetButton) {
		resetButton.addEventListener('click', resetForm);
	}
};
//-----수정 폼 리셋 함수--------------------------------------------
function resetForm() {
	modifyInfoForm.reset(); // 폼의 모든 입력 필드를 초기 상태로 되돌립니다.

	// 에러 메시지 초기화
	passwordErrorMessage.textContent = '';
	nicknameCheckMessage.textContent = '';
	emailCheckMessage.textContent = '';
	phoneErrorMessage.textContent = '';
	interestErrorMessage.textContent = '';

	// 프로필 이미지 초기화 (src 속성을 원래 값으로 되돌리거나 기본 이미지로 설정)
	const originalImageSrc = previewImage.getAttribute('src'); // 또는 기본 이미지 경로
	previewImage.src = originalImageSrc;
}

//-------------------------------------------------------------------------
const modifyInfoForm = document.getElementById('modifyInfoForm');
const passwordInput = document.getElementById('password');
const nicknameInput = document.getElementById('nickName');
const emailInput = document.getElementById('email');
const phone1Input = document.getElementById('phone1');
const phone2Input = document.getElementById('phone2');
const phone3Input = document	.getElementById('phone3');
const idCheckMessage = document.getElementById('idCheckMessage');
const passwordErrorMessage = document.getElementById('passwordErrorMessage');
const nicknameCheckMessage = document.getElementById('nicknameCheckMessage');
const emailCheckMessage = document.getElementById('emailCheckMessage');
const phoneErrorMessage = document.getElementById('phoneErrorMessage');
const interestCheckboxes = document.querySelectorAll('.foods');
const interestErrorMessage = document.getElementById('interestErrorMessage');
const profileImageInput = document.getElementById('profileImageInput');
const previewImage = document.getElementById('profileImage');

// 정규식
const regPw = /^[0-9a-zA-Z]{8,16}$/;
const regName = /^[가-힣]{2,6}$/;
const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
//-----프로필 미리보기-------------------------------------------
profileImageInput.addEventListener('change',function(){
	const file = this.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function(e) {
			previewImage.src = e.target.result;
		};
		reader.readAsDataURL(file);
	} else {
		previewImage.src = '#';
	}
});
//-----유효성 검사 함수--------------------------------------------------
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

function validateNickname() {
    const nicknameValue = nicknameInput.value.trim();
    if (nicknameValue.length < 2 || nicknameValue.length > 8) {
    	nicknameCheckMessage.textContent = '별명은 2자 이상 8자 이하로 입력해주세요.';
    	return false;
    } else {
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
function validateInterest() {
    let checkedCount = 0;
    interestCheckboxes.forEach(checkbox => {
        if (checkbox.checked) checkedCount++;
    });
    return checkedCount > 0 && checkedCount <= 3;
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
//-----정보 수정 검증-----------------------------------------------
document.addEventListener('DOMContentLoaded',()=>{

    passwordInput.addEventListener('input', validatePassword);
    nicknameInput.addEventListener('input', validateNickname);
    emailInput.addEventListener('input', validateEmail);
    phone1Input.addEventListener('input', validatePhone);
    phone2Input.addEventListener('input', validatePhone);
    phone3Input.addEventListener('input', validatePhone);
    interestCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', limitInterestSelection);
    });
    
    // 포커스 시 에러 메시지 초기화
    const errorElements = {
    		passwordInput: passwordErrorMessage,
    		nicknameInput: nicknameCheckMessage,
    		emailInput: emailCheckMessage,
    		interestCheckboxes: interestErrorMessage,
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

async function modify(mem_no){

    const isPasswordValid = validatePassword();
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
    
    if (!isPasswordValid || !isNicknameValid ||
        !isEmailValid || !isPhoneValid || !isInterestValid) {
        return; // 유효성 검사 실패 시 제출 중단 (에러 메시지는 이미 표시됨)
    }

    const formData = new FormData(modifyInfoForm);

    // 분리된 전화번호 값을 하이픈으로 연결하여 'phone' 키로 FormData에 추가
    const phoneNumber = phone1Input.value + phone2Input.value + phone3Input.value;
    formData.append('mem_phone', phoneNumber);
    
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
        const response = await fetch('/mypage/modifyInfo?mem_no='+mem_no, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error('수정 실패: ' + errorText);
        }
        const result = await response.text();
        console.log('수정 성공:', result);
        location.href = '/mypage/myInfo'; 
    } catch (error) {
        console.error('수정 실패:', error.message);
    }
}

async function remove(mem_no){
    if (confirm("정말로 계정을 삭제하시겠습니까?")) {
        if (confirm("정말로 삭제하시겠습니까? 다시 한번 신중하게 생각해주세요.")) {
            try {
                const response = await fetch('/mypage/removeMember?mem_no='+mem_no, {
                    method: 'POST'
                });
                console.log("Response Status:", response.status);
                console.log("Response OK:", response.ok);
                const responseText = await response.text(); // 응답 텍스트 받기
                console.log("Response Text:", responseText);

                if (!response.ok) {
                    throw new Error('탈퇴 실패: 서버 응답 상태 ' + response.status + ', 내용: ' + responseText);
                }
                console.log('탈퇴 성공:', responseText);
                alert(responseText); // 성공 메시지 표시
                location.href = '/';
            } catch (error) {
                console.error('탈퇴 실패:', error.message);
                alert('회원 탈퇴 처리 중 오류가 발생했습니다: ' + error.message);
            }
        } else {
            alert("회원 탈퇴를 취소하셨습니다.");
        }
    } else {
        alert("회원 탈퇴를 취소하셨습니다.");
    }
}