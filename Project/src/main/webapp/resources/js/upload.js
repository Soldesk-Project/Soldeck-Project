(function () {
    // 업로드 관련 변수
    const fileInput = document.querySelector('#imageUpload');
    const uploadLabel = document.querySelector('label[for="imageUpload"]');
    const uploadResult = document.querySelector('.uploadResult ul');
    const sliderContainer = document.querySelector('.uploadResult .slider-container');
    const imageRegex = new RegExp("(.*?)\.(jpg|jpeg|png|gif)$", "i"); // 이미지 파일만 허용
    const MAX_SIZE = 5242880; // 5MB
    
    // 슬라이더 관련 변수
    let currentIndex = 0;
    const imagesPerPage = 6;

    uploadLabel.addEventListener('click', (event) => {
        if (mem_no == 0) {
            event.preventDefault();
            event.stopPropagation();
            alert('로그인 후 이용 해주세요.');
        }
    });
    
    // 파일 입력 이벤트 리스너
    fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            if (!checkExtension(files[i].name, files[i].size)) {
                return napraw;
            }
            formData.append("uploadFile", files[i]);
        }

        fetch('/uploadAsyncAction', {
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
            fileInput.value = '';
            updateArrows(); // 화살표만 업데이트
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

 // 업로드된 파일 표시 (너비 조정 포함)
 // 업로드된 파일 표시
    function showUploadedFile(uploadResultArr) {
        if (!uploadResultArr || uploadResultArr.length === 0) {
            console.warn("업로드된 파일 데이터가 없습니다.");
            return;
        }

        window.uploadedFiles = window.uploadedFiles || [];
        window.uploadedFiles.push(...uploadResultArr);

        let str = '';
        uploadResultArr.forEach(file => {
            const fileName = file.att_uuid + '_' + file.att_name;
            const imageUrl = file.att_path + '/' + encodeURIComponent(fileName);

            str += `<li>`;
            str += `<div class="image-container">`;
            str += `<img src="${imageUrl}" alt="${file.att_name}" class="uploaded-image">`;
            str += `<div class="image-info">`;
            str += `<a href="${imageUrl}" target="_blank">${file.att_name}</a>`;
            str += `<span class="delete-btn" data-file="${imageUrl}"> X </span>`;
            str += `</div>`;
            str += `</div>`;
            str += `</li>`;
        });

        uploadResult.innerHTML += str;
        updateArrows();
    }

    // 슬라이더 이동 함수
    function moveSlider(direction) {
        const totalImages = uploadResult.children.length;
        const maxIndex = Math.max(0, totalImages - imagesPerPage);

        if (direction === 'left') {
            currentIndex = Math.max(0, currentIndex - imagesPerPage);
        } else if (direction === 'right') {
            currentIndex = Math.min(maxIndex, currentIndex + imagesPerPage);
        }

        // 한 줄(6개) 기준으로 이동
        const translateX = -(currentIndex * (100 / imagesPerPage));
        sliderContainer.style.transform = `translateX(${translateX}%)`;

        updateArrows();
    }

 // 화살표 상태 업데이트
    function updateArrows() {
        const totalImages = uploadResult.children.length;
        const leftArrow = document.querySelector('.arrow.left');
        const rightArrow = document.querySelector('.arrow.right');

        // 이미지 개수가 6개 이하일 경우 화살표 숨김
        if (totalImages <= imagesPerPage) {
            leftArrow.classList.remove('visible');
            rightArrow.classList.remove('visible');
        } else {
            // 이미지 개수가 6개 초과일 경우 화살표 표시
            leftArrow.classList.add('visible');
            rightArrow.classList.add('visible');

            // 왼쪽 화살표 비활성화: 첫 페이지일 때
            if (currentIndex === 0) {
                leftArrow.classList.add('disabled');
            } else {
                leftArrow.classList.remove('disabled');
            }

            // 오른쪽 화살표 비활성화: 마지막 페이지일 때
            if (currentIndex >= totalImages - imagesPerPage) {
                rightArrow.classList.add('disabled');
            } else {
                rightArrow.classList.remove('disabled');
            }
        }
    }

 // 삭제 버튼 이벤트 리스너
    uploadResult.addEventListener('click', function(e) {
        if (e.target.className === 'delete-btn') {
            const targetFile = e.target.getAttribute('data-file');

            fetch('/deleteFile', {
                method: 'POST',
                body: targetFile,
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            .then(response => response.text())
            .then(result => {
                // 해당 요소 삭제
                const targetLi = e.target.closest('li');
                targetLi.remove();
                
                // window.uploadedFiles에서 해당 파일 제거
                if (window.uploadedFiles) {
                    window.uploadedFiles = window.uploadedFiles.filter(file => {
                        const fileName = file.att_uuid + '_' + file.att_name;
                        const imageUrl = file.att_path + '/' + encodeURIComponent(fileName);
                        return imageUrl !== targetFile;
                    });
                }
                
                // 코멘트 목록 갱신 (view.js와 통합)
                if (typeof fetchComments === 'function') {
                    fetchComments();
                }
                // 슬라이더 위치 조정
                const totalImages = uploadResult.children.length;
                if (currentIndex > totalImages - imagesPerPage) {
                    currentIndex = Math.max(0, totalImages - imagesPerPage);
                    const translateX = -(currentIndex * (100 / imagesPerPage));
                    sliderContainer.style.transform = `translateX(${translateX}%)`;
                }
                updateArrows();
            })
            .catch(err => console.error("Delete error:", err));
        }
    });

    // 전역 스코프에 `moveSlider` 함수 노출
    window.moveSlider = moveSlider;
})();