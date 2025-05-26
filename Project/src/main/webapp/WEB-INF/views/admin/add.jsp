<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<link rel="stylesheet" href="../resources/css/header.css">
    <link rel="stylesheet" href="../resources/css/admin.css">
    <link rel="stylesheet" href="../resources/css/add.css">
<body>
	<%@ include file="../layout/header.jsp" %>
	<div class="main-menu" style="margin-top: 500px">
		<ul class="side">
			<li class="side-myinfo"><a href="/admin/member" class="a-myinfo">회원 관리</a></li>
			<li class="side-bookmark"><a href="/admin/group"class="a-bookmark">모임 관리</a></li>
			<li class="side-restaurant"><a>매장 관리</a></li>
		</ul>
	</div><div class="restaurant-menu" style="margin-top: 500px; display: none;">
		<ul class="side">
			<li class="side-booking"><a href="/admin/restaurant"class="a-booking">매장 목록</a></li>
			<li class="side-add"><a href="/admin/add"class="a-add">매장 등록</a></li>
		</ul>
	</div>
	
	<h2 style="margin-top: 100px;">매장 등록</h2>
	
	<div class="container">
		<form action="/search/restAdd" method="post" enctype="multipart/form-data">
			<div class="formGroup">
	            <label>매장 이름: <input type="text" name="rest.rest_name" required></label><br>
	            <label>매장 주소: <input type="text" name="rest.rest_adr" required></label><br>
	            <label>매장 번호: <input type="text" name="rest.rest_phone" required></label><br>
	            <label>매장 영업시간: <input type="text" name="rest.rest_bh" required></label><br>
	            <label>매장 정보: <input type="text" name="rest.rest_info" required></label><br>
	            <label>매장 지역: <input type="text" name="rest.rest_loc" required></label><br>
	            <label>매장 종류: <input type="text" name="rest.rest_cate" required></label><br>
	            <label>매장 사진:
			        <input type="file" name="images" accept="image/*" multiple>
			        <small>최대 10장까지 업로드 가능</small>
			    </label><br>
			    
			    <div id="menuContainer">
			    </div>

  				  <button type="button" onclick="addMenuItem()">메뉴 추가</button>
            </div>
	            <button type="submit">등록</button>
        </form>
	</div>
	<script>
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
        });
        
        let menuIndex = 0;

        function addMenuItem() {
            const container = document.getElementById('menuContainer');
            const div = document.createElement('div');
            div.className = 'menu-item';
            div.innerHTML = `
                <label>메뉴 이름: <input type="text" name="menuList[${menuIndex}].menu_name" required></label>
                <label>메뉴 가격: <input type="text" name="menuList[${menuIndex}].menu_price" required></label>
            `;
            container.appendChild(div);
            menuIndex++;
        }
    </script>
</body>
<script type="text/javascript" src="/resources/js/admin.js"></script>
</html>