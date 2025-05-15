<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html>
<head>
  <meta charset="UTF-8">
  <title>실시간 채팅</title>

  <!-- CSS 파일 연결 -->
  <link rel="stylesheet" type="text/css" href="/resources/css/chatroom.css">
</head>
<body>
  <h2>${chatTitle}</h2>

  <!-- 채팅창 -->
  <div class="chat-container">
    <div id="chat-box"></div>
  </div>

  <!-- 메시지 입력창 -->
  <div class="chat-input">
    <input type="text" id="msg" placeholder="메시지 입력" />
    <!-- <input type="file" id="fileInput" accept="image/*" /> -->
    <button id="emoji-btn">😊</button>
    <button id="sendBtn" onclick="sendMessage()">보내기</button>  
  </div>
  
  <script type="module">
    import { EmojiButton } from 'https://cdn.jsdelivr.net/npm/@joeattardi/emoji-button@4.6.4/dist/index.min.js';

    // 이모지 피커 인스턴스 생성
    const picker = new EmojiButton({
      position: 'top-end',
      theme: 'auto'
    });

    const emojiBtn = document.querySelector('#emoji-btn');
    const input = document.querySelector('#msg');  // 메시지 입력창 선택

    // 이모지 버튼 클릭 시 이모지 피커 토글
    emojiBtn.addEventListener('click', () => {
      picker.togglePicker(emojiBtn);
    });

    // 이모지 선택 시 입력창에 추가
    picker.on('emoji', emoji => {
	  input.value += emoji.emoji;  // emoji.emoji 속성을 사용하여 이모지 문자만 추가
  	  input.focus();  // 입력창에 포커스 유지
	});
  </script>

  <!-- JavaScript 파일 연결 -->
  <script type="text/javascript">
  if(window.chatContext){
	  window.cleanupEventTab0001();
  }
  
  window.chatContext = {
		  currentNick : "${currentNick}",
		  mem_no : "${currentNo}",
		  chatLogs : JSON.parse('${chatLogsJson}')
  }
  
  window.cleanupEventTab0001 = function() {
	  if (window.chatContext && typeof window.chatContext.stopListening === 'function') {
		  window.chatContext.stopListening();
		  /* window.chatContext = null; */
	  }
	  /* delete window.chatContext; */
	};
  </script>
</body>
</html>
