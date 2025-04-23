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

  <!-- 현재 로그인한 사용자 이름을 JavaScript 변수로 전달 -->
  <script>
    const currentUser = "${fn:escapeXml(name)}";
    console.log("현재 사용자:", currentUser);
  </script>

  <script>
    // 웹소켓 연결
    var ws = new WebSocket("wss://4e46-14-52-79-21.ngrok-free.app/chat");

    ws.onopen = function() {
      document.body.insertAdjacentHTML("beforeend", "<div>웹소켓 연결 성공!</div>");
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
      var message = event.data;

      console.log("받은 메시지 원본:", message);

      if (message.includes(":")) {
        var [sender, msg] = message.split(":", 2);

        var alignClass = sender === currentUser ? "my-message" : "other-message";


        var messageDiv = document.createElement("div");
        messageDiv.className = alignClass;

        messageDiv.textContent = sender + ": " + msg;
        console.log(messageDiv);
        console.log("chatBox 요소:", chatBox);
        console.log("추가할 messageDiv:", messageDiv.outerHTML);
        chatBox.appendChild(messageDiv);
      } else {
        var messageDiv = document.createElement("div");
        messageDiv.className = "other-message";
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
      }

      // 스크롤 맨 아래로
      chatBox.scrollTop = chatBox.scrollHeight;
    };

    // 메시지 보내기 함수
    function sendMessage() {
      var input = document.getElementById("msg");
      var message = input.value;
      if (message.trim() !== "") {
        ws.send(currentUser + ":" + message);
        input.value = "";
      }
    }
  </script>
</body>
</html>
