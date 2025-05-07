<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>커뮤니티 메인</title>
    <link rel="stylesheet" href="../resources/css/header.css">
    <link rel="stylesheet" href="../resources/css/communityMain.css">
    <link rel="stylesheet" href="../resources/css/footer.css">
</head>
<body>
<%@ include file="../layout/header.jsp" %>

<div class="community-container">
	<div class="community-major-category-area">
		<label>대분류:</label>
		<button type="button" class="major-category-button active" data-major="major1">대분류 1</button>
		<button type="button" class="major-category-button" data-major="major2">대분류 2</button>
	</div>

    <div class="community-minor-category-area">
        <div>
            <label>소분류:</label>
            <div class="minor-category-buttons">
                </div>
        </div>
    </div>

    <div class="community-content-area">
        <section class="community-popular-posts">
            <h2><a href="/community/communityList?mode=best" class="popular-posts-title-link">좋아요 순 게시글</a></h2>
            <div class="popular-post-list">
                </div>
        </section>

		<section class="community-list">
			<h2 class="community-title"><a href="/community/communityList" class="community-title-link">커뮤니티 게시글 목록</a></h2>
			<div class="post-filter-area">
				<label for="sort-by">정렬:</label>
				<select id="sort-by">
					<option value="latest">최신순</option>
					<option value="popular">인기순</option>
				</select>
			</div>
			<div class="post-list">
				<div class="post-item">
					<h3 class="post-title">첫 번째 게시글 제목</h3>
					<p class="post-preview">첫 번째 게시글의 간략한 내용 미리보기입니다. 중요한 정보나 흥미로운 부분을 짧게 요약하여 보여줄 수 있습니다...</p>
					<span class="post-meta">작성자: 사용자1 | 작성일: 2025-04-30</span>
				</div>
				<div class="post-item">
					<h3 class="post-title">두 번째 게시글 제목 (사진)</h3>
					<div class="post-image-preview">
					<img src="../resources/images/placeholder.png" alt="미리보기 이미지" style="max-width: 100px; height: auto;">
				</div>
					<p class="post-preview">두 번째 게시글은 이미지 미리보기를 포함하고 있습니다. 시각적인 콘텐츠를 강조할 때 유용합니다.</p>
					<span class="post-meta">작성자: 익명 | 작성일: 2025-04-29</span>
				</div>
				<div class="post-item">
					<h3 class="post-title">세 번째 게시글 제목 (긴 제목)</h3>
					<p class="post-preview">세 번째 게시글은 제목이 조금 깁니다. 제목이 길어질 경우 어떻게 표시되는지 확인해 볼 수 있습니다. 내용 미리보기도 적절한 길이로 잘라주는 것이 중요합니다...</p>
					<span class="post-meta">작성자: 김철수 | 작성일: 2025-04-28</span>
				</div>
			</div>
        </section>

        <section class="event-info">
            <h2>이벤트 안내</h2>
            <div class="placeholder">이벤트 관련 내용이 표시될 영역입니다.</div>
        </section>
    </div>
    <div class="popup" id="popup">
		<div class="popup-content">
			<span class="popup-close" id="popup-close">&times;</span>
			<img alt="pop-up" src="/resources/images/popup.png" class="pop-up_image">
		</div>
	</div>
</div>
<script type="text/javascript" src="/resources/js/communityMain.js"></script>
<%@ include file="../layout/footer.jsp" %>
</body>
</html>