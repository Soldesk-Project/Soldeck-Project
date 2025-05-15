var currentRoomNo = null;

if (!window.chatContext) {
  console.error("chatContext가 없습니다.");
} else {
  const { chatLogs, currentNick, mem_no } = window.chatContext;

  window.initChatRoom = initChatRoom;
  window.sendMessage = sendMessage;

  if (!window.ws) {
    window.ws = null;
  }

  /* 보내기 버튼 엔터 이벤트 */
  document.getElementById('msg').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });

  /* 서버에서 전달된 JSON 형식의 채팅 로그 */
  if (!window.chatBox) {
    window.chatBox = document.getElementById("chat-box");
  }

  function linkify(text) {
    if (!text) return "";
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlPattern, function(url) {
      return `<a href="${url}" target="_blank">${url}</a>`;
    });
  }

  // 채팅 로그 표시 (초기 로딩)
  chatLogs.forEach(chat => {
    const alignClass = chat.sender === currentNick ? "my-message" : "other-message";
    const messageDiv = document.createElement("div");
    const sender = chat.sender;
    const msg = chat.msg;

    messageDiv.className = alignClass;

    // 하이퍼링크 변환 처리
    const linkedMsg = linkify(msg);
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${linkedMsg}`;

    chatBox.appendChild(messageDiv);
  });

  // 웹소켓 연결
  window.addEventListener('openChatRoom', (e) => {
    currentRoomNo = e.detail.roomNo;
    initChatRoom(currentRoomNo);
  });

  function initChatRoom(currentRoomNo) {
    if (window.ws && window.ws.readyState !== WebSocket.CLOSED) {
      window.ws.close();  // 기존 연결 있으면 닫기
    }
    window.ws = new WebSocket("wss://b500-14-52-79-21.ngrok-free.app/chat/" + currentRoomNo);
    console.log("WebSocket 생성:", window.ws);

    window.ws.onopen = function(event) {
      document.body.insertAdjacentHTML("beforeend", "<div>웹소켓 연결 성공!</div>");
      const firstMessage = JSON.stringify({ type: "register", mem_no: mem_no });
      window.ws.send(firstMessage);
    };

    window.ws.onerror = function(e) {
      document.body.insertAdjacentHTML("beforeend", "<div>웹소켓 오류 발생!</div>");
    };

    window.ws.onclose = function() {
      document.body.insertAdjacentHTML("beforeend", "<div>웹소켓 연결 종료됨</div>");
    };

    window.ws.onmessage = function(event) {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "chat") {
          const sender = data.sender;
          const msg = data.msg;
          const fileData = data.fileData;
          const alignClass = sender === currentNick ? "my-message" : "other-message";
          const messageDiv = document.createElement("div");
          const linkedMsg = linkify(msg);

          messageDiv.className = alignClass;

          if (fileData) {
            const imgElement = document.createElement("img");
            imgElement.src = fileData;
            imgElement.style.maxWidth = "200px";
            messageDiv.appendChild(imgElement);
          } else {
            messageDiv.innerHTML = `<strong>${sender}:</strong> ${linkedMsg}`;
          }

          chatBox = document.getElementById("chat-box");
          if (chatBox) chatBox.appendChild(messageDiv);
        }
      } catch (e) {
        chatBox = document.getElementById("chat-box");
        if (chatBox) {
          const messageDiv = document.createElement("div");
          messageDiv.className = "other-message";
          messageDiv.textContent = event.data;
          chatBox.appendChild(messageDiv);
        }
      }

      chatBox = document.getElementById("chat-box");
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    };
  }

  // 메세지 보내는 함수 (그룹채팅, 개인채팅 구분)
  function sendMessage() {
    if (!window.ws || window.ws.readyState !== WebSocket.OPEN) {
      alert("웹소켓 연결이 아직 완료되지 않았습니다.");
      return;
    }
    const input = document.getElementById("msg");
    const fileInput = document.getElementById("fileInput");
    const message = input.value;
    // 개인 채팅 여부 판단 (URL에 "privateRoom" 포함 여부)
    const isPrivate = true;

    if (message.trim() !== "" || (fileInput && fileInput.files.length > 0)) {
      const chatMessage = {
        type: "chat",
        sender: currentNick,
        mem_no: mem_no,
        msg: message,
        chat_type: isPrivate ? "private" : "group", // 개인 채팅 여부 명시
        room_no: isPrivate ? currentRoomNo : undefined
      };

      // 개인 채팅일 경우 room_no 추가
      if (currentRoomNo) {
        chatMessage.room_no = currentRoomNo;  // 개인 채팅에서는 roomNo 사용
      }

      if (chatMessage.file) {
        // 이미지 파일을 base64로 인코딩하여 전송
        const reader = new FileReader();
        reader.onload = function(event) {
          chatMessage.fileData = event.target.result; // base64 인코딩된 파일 데이터
          window.ws.send(JSON.stringify(chatMessage)); // 서버로 메시지 전송
        };
        reader.readAsDataURL(chatMessage.file); // 파일을 base64로 읽음
      } else {
        window.ws.send(JSON.stringify(chatMessage)); // 텍스트 메시지만 전송
      }

      // 메시지 입력창 초기화
      input.value = "";
      // fileInput.value = "";
    }
  }
}