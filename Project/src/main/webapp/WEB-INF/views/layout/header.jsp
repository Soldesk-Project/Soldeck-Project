<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="/resources/css/header.css">
</head>
<body>
  <div class="nav">
    <div class="nav-left">
      <a href="#"><img src="./images/profile.png" alt="logo" style="width: 70px;"></a>
    </div>
    <div class="nav-center">
      <input type="search" placeholder="검색어를 입력하세요" value={searchKeyword} onChange={handleSearchKeywordChange}>
    </div>
    <div class="nav-right">
      <input type="image" src="../resources/images/profile.png" alt="profile" id="proFile" style="width: 70px; cursor: pointer;"><br>
    </div>
    <div id="myModal" class="modal">
      <span class="close">&times;</span>
      <img class="modal-content" id="modalImage">
      <div id="caption"></div>
    </div>
    <div class="nav-right1">
      <a href="#" id="login">login</a>
    </div>
  </div>
</body>
</html>