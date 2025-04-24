<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html>
<head>
  <meta charset="UTF-8">
  <title>실시간 채팅</title>
  <style>
    .my-message {
      text-align: right;
      margin: 5px 0;
      color: black;
      background-color: #4caf50;
      display: inline-block;
      padding: 8px;
      border-radius: 10px;
      max-width: 80%;
      float: right;
      clear: both;
    }
    .other-message {
      text-align: left;
      margin: 5px 0;
      color: black;
      background-color: #e0e0e0;
      display: inline-block;
      padding: 8px;
      border-radius: 10px;
      max-width: 80%;
      float: left;
      clear: both;
    }
    #chat-box {
      width: 400px;
      height: 300px;
      border: 1px solid #ccc;
      overflow-y: scroll;
      margin-bottom: 10px;
      padding: 10px;
    }
  </style>
</head>
<body>
  <h2>실시간 채팅</h2>
  
  <!-- 채팅창 -->
  <div id="chat-box"></div>
  
  <!-- 메시지 입력창 -->
  <input type="text" id="msg" placeholder="메시지 입력" />
  <button onclick="sendMessage()">보내기</button>


  <script>
  <!-- 현재 로그인한 사용자 이름을 JavaScript 변수로 전달 -->
    const currentNick = "${currentNick}";
    const mem_no ="${currentNo}";
    console.log("현재 사용자:", currentNick);
    console.log("현재 사용자:", mem_no);
    
    // 웹소켓 연결
    // 현재 페이지 URL에서 그룹 번호 파싱
	const pathParts = window.location.pathname.split('/');
	const groupNo = pathParts[pathParts.length - 1]; // '21' 추출
	console.log(groupNo);

	const ws = new WebSocket("wss://3f41-14-52-79-21.ngrok-free.app/chat/" + groupNo);

    ws.onopen = function(event) {
      document.body.insertAdjacentHTML("beforeend", "<div>웹소켓 연결 성공!</div>");
      const firstMessage = JSON.stringify({ type: "register", mem_no: mem_no });
      ws.send(firstMessage)
    };

    ws.onerror = function(e) {
      document.body.insertAdjacentHTML("beforeend", "<div>웹소켓 오류 발생!</div>");
    };

    ws.onclose = function() {
      document.body.insertAdjacentHTML("beforeend", "<div>웹소켓 연결 종료됨</div>");
    };

    // 메시지 수신 시
    ws.onmessage = function(event) {
	  var chatBox = document.getElementById("chat-box");
	
	  try {
	    const data = JSON.parse(event.data); // 서버에서 JSON으로 보내왔을 때
	
	    if (data.type === "chat") {
	      const sender = data.sender;
	      const msg = data.msg;
	
	      const alignClass = sender === currentNick ? "my-message" : "other-message";
	      const messageDiv = document.createElement("div");
	      messageDiv.className = alignClass;
	      messageDiv.textContent = sender + ": " + msg;
	      chatBox.appendChild(messageDiv);
	    }
	
	  } catch (e) {
	    // 만약 그냥 텍스트일 경우 예외 처리
	    const messageDiv = document.createElement("div");
	    messageDiv.className = "other-message";
	    messageDiv.textContent = event.data;
	    chatBox.appendChild(messageDiv);
	  }
	
	  chatBox.scrollTop = chatBox.scrollHeight;
	};
	
    // 메세지 보내는 함수
    function sendMessage() {
    	  var input = document.getElementById("msg");
    	  var message = input.value;

    	  if (message.trim() !== "") {
    	    const chatMessage = JSON.stringify({
    	      type: "chat",
    	      sender: currentNick,
    	      mem_no: mem_no,
    	      msg: message
    	    });

    	    ws.send(chatMessage);
    	    input.value = "";
    	  }
    	}
  </script>
</body>
</html>
