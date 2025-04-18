//각 버튼 클릭 이밴트
document.querySelectorAll('button').forEach( btn => {
	btn.addEventListener('click', e=> {
		
		let type = btn.getAttribute('id');
		
		if(type === 'findIdBtn'){
			location.href = 'findId';
		}else if(type === 'findPwBtn'){
			location.href = 'findPw';
		}else if(type === 'registerMemberBtn'){
			location.href = 'registerMember';
		}else if(type === 'loginBtn'){
			login();
		}
	});
});

const LOGIN_FAIL_MSG = "아이디 또는 비밀번호가 일치하지 않습니다.";

function login() {
	console.log(1);
    let userId = document.getElementById('userId').value;
    let password = document.getElementById('password').value;

    // 빈 값 검증
    if (!userId) {
        alert("아이디를 입력하세요");
        return;
    }
    if (!password) {
        alert("비밀번호를 입력하세요");
        return;
    }

    // json 형식으로 id, pw 데이터 전송
    let loginData = {
        userId: userId,
        password: password
    };

    fetch(`login/loginProcess`, {
        method: 'post',
        body: JSON.stringify(loginData),
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.result);
        console.log(typeof data.result);

        if (data.result === 'success') {
            location.href = '/'; // 로그인 성공 시 메인 페이지로 리다이렉트 (루트 경로 가정)
        } else {
            alert(LOGIN_FAIL_MSG);
            return;
        }
    })
    .catch(err => console.log(err));
}