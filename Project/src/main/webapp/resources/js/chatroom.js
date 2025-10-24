var currentRoomNo = null;

function parseChatContextFromMeta() {
  const meta = document.getElementById('chat-meta');
  if (!meta) return null;

  const currentNick = meta.getAttribute('data-current-nick');
  const mem_no = meta.getAttribute('data-mem-no');
  const chatLogsJson = meta.getAttribute('data-chat-logs');

  let chatLogs = [];
  try {
	  chatLogs = JSON.parse(chatLogsJson);
  } catch (e) {
    console.error('chatLogsJson 파싱 실패:', e);
  }

  return {
    currentNick,
    mem_no,
    chatLogs
  };
}

function initializeChatroom() {
  const { chatLogs, currentNick, mem_no } = window.chatContext;

  window.initChatRoom = initChatRoom;
  window.sendMessage = sendMessage;
  
  //항상 chatBox를 최신 DOM에서 가져오게 수정
  window.chatBox = document.getElementById("chat-box");

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

    window.chatBox.appendChild(messageDiv);
  });
  
  window.chatBox.scrollTop = window.chatBox.scrollHeight;

  // 웹소켓 재연결 함수
  function reconnectWebSocket(roomNo) {
    if (window.ws && window.ws.readyState !== WebSocket.CLOSED) {
      window.ws.onclose = function() {
        initChatRoom(roomNo);
        window.ws.onclose = null; // 중복 호출 방지
      };
      window.ws.close();
    } else {
      initChatRoom(roomNo);
    }
  }

  // 웹소켓 연결
  window.addEventListener('openChatRoom', (e) => {
    currentRoomNo = e.detail.roomNo;
    reconnectWebSocket(currentRoomNo);
  });

  function initChatRoom(roomNo) {
    if (window.ws && window.ws.readyState !== WebSocket.CLOSED) {
      window.ws.close();  // 기존 연결 있으면 닫기
    }
    window.ws = new WebSocket("ws://52.78.25.188:9099/chat/" + roomNo);
    console.log("WebSocket 생성:", window.ws)
    window.ws.onopen = function(event) {
      const firstMessage = JSON.stringify({ type: "register", mem_no: mem_no });
      window.ws.send(firstMessage);
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

          const chatBox = document.getElementById("chat-box");
          if (chatBox) chatBox.appendChild(messageDiv);
        }
      } catch (e) {
        const chatBox = document.getElementById("chat-box");
        if (chatBox) {
          const messageDiv = document.createElement("div");
          messageDiv.className = "other-message";
          messageDiv.textContent = event.data;
          chatBox.appendChild(messageDiv);
        }
      }

      const chatBox = document.getElementById("chat-box");
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    };
  }

  // 메세지 보내는 함수 (그룹채팅, 개인채팅 구분)
  function sendMessage() {
    if (!window.ws || window.ws.readyState !== WebSocket.OPEN) {
      alert("웹소켓 연결이 아직 완료되지 않았습니다.");
      return;
    }
    const chatRoomDiv = document.querySelector('#chat-container .chat-container');
    const input = document.getElementById("msg");
    const fileInput = document.getElementById("fileInput");
    const message = input.value;
    const isPrivate = chatRoomDiv.getAttribute('data-room-type') === 'private';
    const roomNo = chatRoomDiv.getAttribute('data-room-no') || currentRoomNo;

    if (message.trim() !== "" || (fileInput && fileInput.files.length > 0)) {
      const chatMessage = {
        type: "chat",
        sender: currentNick,
        mem_no: mem_no,
        msg: message,
        chat_type: isPrivate ? "private" : "group",
        room_no: roomNo
      };
      

      if (chatMessage.file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          chatMessage.fileData = event.target.result;
          window.ws.send(JSON.stringify(chatMessage));
        };
        reader.readAsDataURL(chatMessage.file);
      } else {
        window.ws.send(JSON.stringify(chatMessage));
      }

      input.value = "";
      // fileInput.value = "";
    }
  }
}

//항상 최신 데이터를 받아오게 수정
window.chatContext = parseChatContextFromMeta();

if (!window.chatContext) {
  window.addEventListener("chatContextReady", () => {
    initializeChatroom();
  }, { once: true });
} else {
  initializeChatroom();
}

document.addEventListener('click', (event) => {
	  if(event.target.id === 'closeChatBtn'){
	    const chatContainer = document.getElementById('chat-container');
	    if(chatContainer){
	      // 채팅창 숨기기 (또는 비우기)
	      //chatContainer.style.display = 'none';

	      // 필요하면 내용도 초기화
	      chatContainer.innerHTML = '';
	    }
	  }
	});
