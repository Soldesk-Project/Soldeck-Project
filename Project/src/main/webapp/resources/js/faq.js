document.addEventListener('DOMContentLoaded', function() {
	const faqTitles = document.querySelectorAll('.faqTitle');

	// 1. FAQ 내용을 토글하는 함수 정의
	function toggleFaqContent(contentElement) {
		if (contentElement) {
			if (contentElement.style.display === 'none') {
				contentElement.style.display = 'block';
			} else {
				contentElement.style.display = 'none';
			}
		}
	}

	// 2. 각 faqTitle에 클릭 이벤트 리스너 등록
	faqTitles.forEach(title => {
		title.addEventListener('click', function() {
			const content = this.nextElementSibling; // 클릭된 faqTitle의 다음 형제 요소 (faqContent)
			toggleFaqContent(content); // 정의된 토글 함수 호출
		});
	});

	// 3. 페이지 로드 시 첫 번째 FAQ의 내용을 자동으로 '활성화'(보이게)
	faqTitles.forEach(title => {
		const content = title.nextElementSibling; // 각 faqTitle의 다음 형제 요소 (faqContent)
		toggleFaqContent(content); // 각 FAQ의 내용을 토글하여 보이게 만듭니다.
	});
});