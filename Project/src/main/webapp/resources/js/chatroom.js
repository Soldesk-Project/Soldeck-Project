/* 보내기 버튼 엔터 이벤트 */
document.getElementById('msg').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

/* 서버에서 전달된 JSON 형식의 채팅 로그 */
const chatBox = document.getElementById("chat-box");

function linkify(text) {
	if (!text) return ""; 
	  const urlPattern = /(https?:\/\/[^\s]+)/g;
	  return text.replace(urlPattern, function (url) {
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
const pathParts = window.location.pathname.split('/');
const groupNo = pathParts[pathParts.length - 1]; // '21' 추출

const ws = new WebSocket("wss://335a-14-52-79-21.ngrok-free.app/chat/" + groupNo);

ws.onopen = function(event) {
  document.body.insertAdjacentHTML("beforeend", "<div>웹소켓 연결 성공!</div>");
  const firstMessage = JSON.stringify({ type: "register", mem_no: mem_no });
  ws.send(firstMessage);
};

ws.onerror = function(e) {
  document.body.insertAdjacentHTML("beforeend", "<div>웹소켓 오류 발생!</div>");
};

ws.onclose = function() {
  document.body.insertAdjacentHTML("beforeend", "<div>웹소켓 연결 종료됨</div>");
};

//메시지 수신 시 (이미지 및 이모티콘 처리)
ws.onmessage = function (event) {
  try {
    const data = JSON.parse(event.data); // 서버에서 JSON으로 보내왔을 때

    if (data.type === "chat") {
      const sender = data.sender;
      const msg = data.msg;
      const fileData = data.fileData;
      const alignClass = sender === currentNick ? "my-message" : "other-message";
      const messageDiv = document.createElement("div");
      const linkedMsg = linkify(msg);

      messageDiv.className = alignClass;

      if (fileData) {
        // 이미지 메시지 처리 (base64 인코딩된 이미지)
        const imgElement = document.createElement("img");
        imgElement.src = fileData;
        imgElement.style.maxWidth = "200px"; // 이미지를 제한된 크기로 표시
        messageDiv.appendChild(imgElement);
      } else {
        // 텍스트 메시지 처리
    	  messageDiv.innerHTML = `<strong>${sender}:</strong> ${linkedMsg}`;
      }

      chatBox.appendChild(messageDiv);
    }
  } catch (e) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "other-message";
    messageDiv.textContent = event.data;
    chatBox.appendChild(messageDiv);
  }

  chatBox.scrollTop = chatBox.scrollHeight; // 새로운 메시지가 오면 스크롤 내려줌
};

//이모티콘 선택창 토글
function toggleEmojiPicker() {
  const emojiPicker = document.getElementById("emojiPicker");
  emojiPicker.style.display = emojiPicker.style.display === "none" ? "block" : "none";
}

// 이모티콘 삽입
function insertEmoji(emoji) {
  const msgInput = document.getElementById("msg");
  msgInput.value += emoji; // 메시지 입력창에 이모티콘 추가
  toggleEmojiPicker(); // 이모티콘 선택창 숨기기
}

//메세지 보내는 함수 (텍스트 메시지, 이미지, 이모티콘 모두 전송)
//function sendMessage() {
//  const input = document.getElementById("msg");
//  const fileInput = document.getElementById("fileInput");
//  const message = input.value;
//
//  if (message.trim() !== "" || fileInput.files.length > 0) {
//    const chatMessage = {
//      type: "chat",
//      sender: currentNick,
//      mem_no: mem_no,
//      msg: message
//      // file: fileInput.files[0] ? fileInput.files[0] : null, // 파일이 있으면 파일을 포함
//    };
//
//    if (chatMessage.file) {
//      // 이미지 파일을 base64로 인코딩하여 전송
//      const reader = new FileReader();
//      reader.onload = function (event) {
//        chatMessage.fileData = event.target.result; // base64 인코딩된 파일 데이터
//        ws.send(JSON.stringify(chatMessage)); // 서버로 메시지 전송
//      };
//      reader.readAsDataURL(chatMessage.file); // 파일을 base64로 읽음
//    } else {
//      ws.send(JSON.stringify(chatMessage)); // 텍스트 메시지만 전송
//    }
//
//    // 메시지 입력창 초기화
//    input.value = "";
//    //fileInput.value = "";
//  }
//}

//메세지 보내는 함수 (그룹채팅, 개인채팅 구분)
function sendMessage() {
  const input = document.getElementById("msg");
  const fileInput = document.getElementById("fileInput");
  const message = input.value;
  //개인 채팅 여부 판단 (URL에 "privateRoom" 포함 여부)
  const isPrivate = window.location.pathname.includes("/privateRoom");
  
  //✅ roomNo 추출 (URL 마지막 숫자)
  const roomNo = isPrivate ? parseInt(window.location.pathname.split("/").pop()) : null;

  if (message.trim() !== "" || fileInput.files.length > 0) {
	  const chatMessage = {
			  type: "chat",
			  sender: currentNick,
			  mem_no: mem_no,
			  msg: message,
			  chat_type: isPrivate ? "private" : "group", // 여기서 개인 채팅인지 여부를 명시
			  room_no: isPrivate ? roomNo : undefined
			};

    // 개인 채팅일 경우 room_no 추가
    if (groupNo) {
      chatMessage.room_no = groupNo;  // 그룹채팅에서는 groupNo 사용
    } else {
      chatMessage.room_no = roomNo;  // 개인 채팅에서는 roomNo 사용
    }

    if (chatMessage.file) {
      // 이미지 파일을 base64로 인코딩하여 전송
      const reader = new FileReader();
      reader.onload = function (event) {
        chatMessage.fileData = event.target.result; // base64 인코딩된 파일 데이터
        ws.send(JSON.stringify(chatMessage)); // 서버로 메시지 전송
      };
      reader.readAsDataURL(chatMessage.file); // 파일을 base64로 읽음
    } else {
      ws.send(JSON.stringify(chatMessage)); // 텍스트 메시지만 전송
    }

    // 메시지 입력창 초기화
    input.value = "";
    //fileInput.value = "";
  }
}
