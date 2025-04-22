// 업로드 관련 변수
const fileInput = document.querySelector('#imageUpload');
const imageRegex = new RegExp("(.*?)\.(jpg|jpeg|png|gif)$", "i"); // 이미지 파일만 허용
const MAX_SIZE = 5242880; // 5MB

// 파일 입력 이벤트 리스너
fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    const formData = new FormData();

    // 파일 유효성 검사 및 FormData에 추가
    for (let i = 0; i < files.length; i++) {
        if (!checkExtension(files[i].name, files[i].size)) {
            return false;
        }
        formData.append("uploadFile", files[i]);
    }

    // 서버로 파일 업로드
    fetch(`/uploadAsyncAction`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
    	showUploadedFile(data);
        console.log("Uploaded files:", data);
        fileInput.value = ''; // 파일 입력 초기화
        // 코멘트 업로드 후 목록 갱신 (view.js와 통합)
        if (typeof fetchComments === 'function') {
            fetchComments();
        }
    })
    .catch(err => {
        console.error("Upload error:", err);
        alert("파일 업로드에 실패했습니다.");
    });
});

// 파일 확장자와 크기 검사
function checkExtension(fileName, fileSize) {
    if (fileSize >= MAX_SIZE) {
        alert("파일 사이즈 초과 (최대 5MB)");
        return false;
    }
    if (!imageRegex.test(fileName)) {
        alert("이미지 파일(jpg, jpeg, png, gif)만 업로드 가능합니다.");
        return false;
    }
    return true;
}

let fileCallPath
let uploadResult = document.querySelector('.uploadResult ul');
function showUploadedFile(uploadResultArr){
	if(!uploadResultArr || uploadResultArr.length==0){
		return;
	}
	let str = '';
	uploadResultArr.forEach(file => {
		fileCallPath = encodeURIComponent
		(file.att_path + "/" + file.att_uuid + "_" + file.att_name);
		str += `<li path="${file.att_path}" uuid="${file.att_uuid}" fileName="${file.att_name}">`;
		str += `<a>${file.att_name}</a>`;
		str += `<span data-file=${fileCallPath}> X </span>`;
		str += `</li>`;
	});
	uploadResult.innerHTML = str;
}

uploadResult.addEventListener('click', function(e){
	if(e.target.tagName === 'SPAN'){
		let targetFile = e.target.getAttribute('data-file');
		
		fetch(`/deleteFile`, 
				{
					method : 'post',
					body : targetFile,
					headers : {
						'Content-Type' : 'text/plain'
					}
		
				})
			.then(response => response.text())
			.then(result => {
				console.log(result);
				
				// 해당 코드 삭제
				let targetLi = e.target.closest('li');
				targetLi.remove();
			})
			.catch(err => console.log(err));
	};
});