<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div class="footer_container">
 	<ul class="footer">
	    <li><a href="../board/announcement"> | 공지사항 |</a></li>
	    <li><a href="../board/privacyPolicy"> | 개인정보보호처리방침 | </a></li>
	    <li><a href="../board/faq"> | 자주물어보는질문 | </a></li>
	    <li><a href="../board/termsOfService"> | 이용약관 | </a></li>
	</ul>
</div>

<!-- 서버에서 mem_no를 JavaScript로 전달 -->
<script type="text/javascript">
    document.body.dataset.memNo = "${sessionScope.loggedInUser.mem_no}";
    document.body.dataset.pendingRequest = '${sessionScope.pendingRequest}';
</script>

<script type="text/javascript" src="/resources/js/friendSocket.js"></script>