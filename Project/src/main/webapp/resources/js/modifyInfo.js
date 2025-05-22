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

const CSS_FILE_PATH4 = '/resources/css/common.css';
let linkEle4 = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);
//-----버튼 클릭 이벤트----------------------------------------------
window.onload = () => {
	const mnoInput = document.querySelector('input[name="mem_no"]');
	const profileUploadDiv = document.querySelector('.info-profile-div-div');
	const profileDiv = document.querySelector('.info-profile-div');
	const passwordInput = document.getElementById('password');
	const nicknameInput = document.getElementById('nickName');
	const emailInput = document.getElementById('email');
	let phone1Input = document.getElementById('phone1');
	const phone2Input = document.getElementById('phone2');
	const phone3Input = document.getElementById('phone3');
	const modifyFinishBtn = document.getElementById('modifyFinishBtn');
	const resetBtn = document.getElementById('resetBtn');
	const removeBtn = document.getElementById('removeBtn');
	const modifyBtn = document.getElementById('modifyBtn');
	const foodCheckboxes = document.querySelectorAll('.foods');
	let originalPhone1Value = '';
	
	// 초기 상태 설정 (modifyBtn 클릭 전 숨김)
	profileUploadDiv.style.display = 'none';
	profileDiv.style.border = 'none';
	modifyFinishBtn.style.display = 'none';
	resetBtn.style.display = 'none';
	removeBtn.style.display = 'none';
	foodCheckboxes.forEach(checkbox => {
		checkbox.disabled = true;
	})
	
	document.querySelectorAll('button').forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			let type = btn.getAttribute("id");
			let mem_no=mnoInput.value;
			
			if(type == 'profileUploadBtn'){
				profileImageInput.click();
			}else if(type=='modifyFinishBtn'){
				const prefixSelectGlobal = document.getElementById('prefix');
				modify(mem_no, prefixSelectGlobal); // prefixSelect 요소 전달
			}else if(type=='removeBtn'){
				remove(mem_no);
			}else if (type === 'modifyBtn') { // 수정 버튼 클릭 시
				//1. phone1Input 요소를 다시 찾음
                phone1Input = document.getElementById('phone1');
                if (!phone1Input) {
                    console.error("phone1Input 요소를 찾을 수 없습니다.");
                    return;
                }
				
				//2. 프로필 업로드 영역 보이기
				profileUploadDiv.style.display = 'flex';
				// 1-1. 프로필 표시
				profileDiv.style.border = '1px dashed';

				//3. 입력 필드의 readonly 속성 해제
				passwordInput.readOnly = false;
				nicknameInput.readOnly = false;
				emailInput.readOnly = false;
				phone2Input.readOnly = false;
				phone3Input.readOnly = false;

				//4. 수정 완료, 리셋, 탈퇴 버튼 보이기
				modifyFinishBtn.style.display = 'inline-block';
				resetBtn.style.display = 'inline-block';
				removeBtn.style.display = 'inline-block';

				//5. 수정 버튼 숨기기
				modifyBtn.style.display = 'none';
				
				//6. 선호 음식 체크박스 활성화
				foodCheckboxes.forEach(checkbox => {
					checkbox.disabled = false;
				})	
				//7. 전화번호 앞자리 <select>요소로 변경
				const parentDiv = phone1Input.parentNode;
				const prefixSelect = document.createElement('select');
				prefixSelect.id = 'prefix';
				prefixSelect.name = 'prefix';
				prefixSelect.classList.add('info-phone', 'phone-prefix'); // 기존 input과 동일한 클래스 적용

				const prefixes = ['010', '011', '016', '017', '018', '019'];
				const currentPrefix = phone1Input.value; // 현재 phone1의 값 가져오기
				originalPhone1Value = currentPrefix;

				prefixes.forEach(prefix => {
					const option = document.createElement('option');
					option.value = prefix;
					option.textContent = prefix;
					if (prefix === currentPrefix) {
						option.selected = true; // 현재 값과 일치하는 옵션 선택
					}
					prefixSelect.appendChild(option);
				});

				parentDiv.replaceChild(prefixSelect, phone1Input);
				phone1Input = null;
			}
		});
	});
	// "수정 리셋" 버튼 클릭 이벤트 리스너 추가
	if (resetBtn) {
		resetBtn.addEventListener('click', () => {
			resetForm(originalPhone1Value);
			phone1Input = document.getElementById('phone1'); // resetForm 후 phone1Input 다시 찾기
		});
	}
};
//-----수정 폼 리셋 함수--------------------------------------------
function resetForm(originalPhone1Value) {
	modifyInfoForm.reset(); // 폼의 모든 입력 필드를 초기 상태로 되돌립니다.

	// 에러 메시지 초기화
	passwordErrorMessage.textContent = '';
	nicknameCheckMessage.textContent = '';
	emailCheckMessage.textContent = '';
	phoneErrorMessage.textContent = '';
	interestErrorMessage.textContent = '';

	// 프로필 이미지 초기화 (src 속성을 원래 값으로 되돌리거나 기본 이미지로 설정)
	const previewImage = document.getElementById('profileImage');
	const originalImageSrc = previewImage.dataset.originalSrc;
	previewImage.src = originalImageSrc;
	
	// 전화번호 앞자리 <select> 요소를 다시 <input> 요소로 정확히 복원
	const prefixSelect = document.getElementById('prefix');
	if (prefixSelect) {
		const parentDiv = prefixSelect.parentNode;
		const newInput = document.createElement('input');
		newInput.type = 'text';
		newInput.classList.add('info-phone');
		newInput.id = 'phone1';
		newInput.name = 'phoneNumber';
		newInput.value = originalPhone1Value; // 저장해둔 원래 값으로 설정
		newInput.readOnly = true;

		parentDiv.replaceChild(newInput, prefixSelect);
	}
	
	// readonly 속성 다시 설정 (수정 버튼이 다시 눌릴 때를 대비)
	const passwordInput = document.getElementById('password');
	const nicknameInput = document.getElementById('nickName');
	const emailInput = document.getElementById('email');
	const phone2Input = document.getElementById('phone2');
	const phone3Input = document.getElementById('phone3');
	const foodCheckboxes = document.querySelectorAll('.foods');
	
	passwordInput.readOnly = true;
	nicknameInput.readOnly = true;
	emailInput.readOnly = true;
	phone2Input.readOnly = true;
	phone3Input.readOnly = true;
	
	//선호 음식 체크박스 다시 비활성화
	foodCheckboxes.forEach(checkbox => {
		checkbox.disabled = true;
	})

	// 프로필 점선 삭제
	const profileDiv = document.querySelector('.info-profile-div');
	profileDiv.style.border = 'none';
	
	// 버튼 상태 다시 설정 (수정 버튼 보이고, 완료/리셋/탈퇴 숨김)
	const profileUploadDiv = document.querySelector('.info-profile-div-div');
	const modifyFinishBtn = document.getElementById('modifyFinishBtn');
	const resetBtn = document.getElementById('resetBtn');;
	const removeBtn = document.getElementById('removeBtn');
	const modifyBtn = document.getElementById('modifyBtn');

	profileUploadDiv.style.display = 'none';
	modifyFinishBtn.style.display = 'none';
	resetBtn.style.display = 'none';
	removeBtn.style.display = 'none';
	modifyBtn.style.display = 'inline-block';
}

//-------------------------------------------------------------------------
const modifyInfoForm = document.getElementById('modifyInfoForm');
const passwordInputGlobal = document.getElementById('password');
const nicknameInputGlobal = document.getElementById('nickName');
const emailInputGlobal = document.getElementById('email');
const phone2InputGlobal = document.getElementById('phone2');
const phone3InputGlobal = document.getElementById('phone3');
const idCheckMessage = document.getElementById('idCheckMessage');
const passwordErrorMessage = document.getElementById('passwordErrorMessage');
const nicknameCheckMessage = document.getElementById('nicknameCheckMessage');
const emailCheckMessage = document.getElementById('emailCheckMessage');
const phoneErrorMessage = document.getElementById('phoneErrorMessage');
const interestCheckboxes = document.querySelectorAll('.foods');
const interestErrorMessageGlobal = document.getElementById('interestErrorMessage');
const profileImageInput = document.getElementById('profileImageInput');
const previewImage = document.getElementById('profileImage');
const resetBtnGlobal = document.getElementById('resetBtn');

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
    const passwordValue = passwordInputGlobal.value.trim();
    if (!regPw.test(passwordValue)) {
        passwordErrorMessage.textContent = '비밀번호는 8~16자의 영문 대/소문자와 숫자로만 입력해주세요.';
        return false;
    } else {
        passwordErrorMessage.textContent = '';
        return true;
    }
}

function validateNickname() {
    const nicknameValue = nicknameInputGlobal.value.trim();
    if (nicknameValue.length < 2 || nicknameValue.length > 8) {
    	nicknameCheckMessage.textContent = '별명은 2자 이상 8자 이하로 입력해주세요.';
    	return false;
    } else {
    	nicknameCheckMessage.textContent = '';
    	return true;
    }
}

function validateEmail() {
    const emailValue = emailInputGlobal.value.trim();
    if (!regEmail.test(emailValue)) {
        emailCheckMessage.textContent = '올바른 이메일 주소 형식이 아닙니다.';
        return false;
    } else {
        emailCheckMessage.textContent = '';
        return true;
    }
}


function validatePhone() {
    const phone2Value = phone2InputGlobal.value.trim();
    const phone3Value = phone3InputGlobal.value.trim();

    if (!/^\d{3,4}$/.test(phone2Value) || !/^\d{4}$/.test(phone3Value)) {
        phoneErrorMessage.textContent = '올바른 전화번호 형식이 아닙니다.';
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
        interestErrorMessageGlobal.textContent = '관심분야는 최대 3개까지 선택 가능합니다.';
    } else {
        interestErrorMessageGlobal.textContent = ''; // 3개 이하 선택 시 에러 메시지 초기화
    }
}
//-----정보 수정 검증-----------------------------------------------
document.addEventListener('DOMContentLoaded',()=>{

    passwordInputGlobal.addEventListener('input', validatePassword);
    nicknameInputGlobal.addEventListener('input', validateNickname);
    emailInputGlobal.addEventListener('input', validateEmail);
    phone2InputGlobal.addEventListener('input', validatePhone);
    phone3InputGlobal.addEventListener('input', validatePhone);
    interestCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', limitInterestSelection);
    });
    
    // 포커스 시 에러 메시지 초기화
    const errorElements = {
    		passwordInput: passwordErrorMessage,
    		nicknameInput: nicknameCheckMessage,
    		emailInput: emailCheckMessage,
    		interestCheckboxes: interestErrorMessageGlobal,
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

async function modify(mem_no, prefixSelect){

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
        interestErrorMessageGlobal.textContent = '관심분야를 최소 1개 선택해주세요.';
        return;
    } else if (checkedCount > 3) {
        interestErrorMessageGlobal.textContent = '관심분야는 최대 3개까지 선택 가능합니다.';
        return;
    } else {
        interestErrorMessageGlobal.textContent = '';
    }
    
    if (!isPasswordValid || !isNicknameValid ||
        !isEmailValid || !isPhoneValid || !isInterestValid) {
        return; // 유효성 검사 실패 시 제출 중단 (에러 메시지는 이미 표시됨)
    }

    const formData = new FormData(modifyInfoForm);

    // 분리된 전화번호 값을 하이픈으로 연결하여 'phone' 키로 FormData에 추가
    const phoneNumber = prefixSelect.value + phone2InputGlobal.value + phone3InputGlobal.value;
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
//사이드 탭 클릭 후 active 유지
window.addEventListener('DOMContentLoaded', () => {

	  const links = document.querySelectorAll('.side li a');
	  const currentPath = window.location.pathname.replace(/\/$/, '').toLowerCase();

	  links.forEach(link => {
	    const href = link.getAttribute('href');
	    const absoluteHref = new URL(href, window.location.origin).pathname.replace(/\/$/, '').toLowerCase();

	    if (currentPath === absoluteHref) {
	      link.classList.add('active');
	    }
	  });
	});