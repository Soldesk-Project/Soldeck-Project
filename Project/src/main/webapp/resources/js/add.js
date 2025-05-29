document.addEventListener('DOMContentLoaded', function() {
            const storeManagementLink = document.querySelector('.main-menu .side-restaurant');
            const restaurantMenu = document.querySelector('.restaurant-menu');

            storeManagementLink.addEventListener('click', function(event) {
                event.preventDefault(); // 기본 링크 동작 방지
                restaurantMenu.style.display = restaurantMenu.style.display === 'none' ? 'block' : 'none';
            });
            
            const fileInput = document.querySelector('input[type="file"][name="images"]');

            fileInput.addEventListener('change', function () {
                if (this.files.length > 10) {
                    alert("최대 10장의 이미지만 업로드할 수 있습니다.");
                    this.value = ''; // 파일 선택 초기화
                    return;
                }
                
                for (const file of this.files) {
                    if (!file.type.startsWith('image/')) {
                        alert("이미지 파일만 업로드할 수 있습니다.");
                        this.value = ''; // 파일 선택 초기화
                        return;
                    }
                }
            });
            
            const addressInput = document.querySelector('input[name="rest.rest_adr"]');
            addressInput.addEventListener('blur', function () {
                const address = addressInput.value;
                if (!address) return;

                fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`, {
                    headers: {
                        Authorization: 'KakaoAK 99ddb7e910a924e51b633490da611ead'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.documents.length > 0) {
                        const loc = data.documents[0];
                        document.getElementById('rest_lat').value = loc.y;
                        document.getElementById('rest_lng').value = loc.x;
                    } else {
                        alert("주소를 찾을 수 없습니다.");
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert("위도/경도 변환 중 오류가 발생했습니다.");
                });
            });
        });

		const storeManagementLink = document.querySelector('.main-menu .side-restaurant');
		const restaurantMenu = document.querySelector('.restaurant-menu');
		
		storeManagementLink.addEventListener('click', function(event) {
		    event.preventDefault(); // 기본 링크 동작 방지
		    restaurantMenu.style.display = restaurantMenu.style.display === 'none' ? 'block' : 'none';
		});

        
        let menuIndex = 0;

        function addMenuItem() {
            const container = document.getElementById('menuContainer');
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerHTML = `
                <label>메뉴 이름: <input type="text" name="menuList[${menuIndex}].menu_name" required></label>
                <label>메뉴 가격: <input type="text" name="menuList[${menuIndex}].menu_price" required></label>
                <button type="button" class="remove-btn">X</button>
            `;
            
            // 삭제 버튼 클릭 시 해당 메뉴 항목 삭제
            div.querySelector('.remove-btn').addEventListener('click', () => {
                container.removeChild(div);
            });
            
            container.appendChild(div);
            menuIndex++;
        }