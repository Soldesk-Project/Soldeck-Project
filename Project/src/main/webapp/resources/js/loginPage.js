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
		}
	});
});


