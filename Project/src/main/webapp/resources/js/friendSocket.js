// 실시간 친구 요청 관련 소켓 코드
document.addEventListener("DOMContentLoaded", () => {
    
    // body 태그에서 data-memNo 속성 값 가져오기
    const senderMemNo = document.body.dataset.memNo;
    
    let socket = null;
    
    // 서버에서 받은 친구 요청 알림 처리
    const pendingRequest = JSON.parse(document.body.dataset.pendingRequest || '[]'); // 서버에서 전달한 pendingRequest 데이터를 가져옴
    console.log(pendingRequest);
    pendingRequest.forEach(request => {
        displayFriendRequestAlert(request);
    });

    if (senderMemNo) {
        // WebSocket 연결
        socket = new WebSocket("wss://6fe1-14-52-79-21.ngrok-free.app/friendSocket");

        socket.onopen = () => {
            console.log("WebSocket 연결됨");
            console.log("보낼 memNo:", senderMemNo);
            socket.send(senderMemNo.toString());  // 서버에 내 mem_no 전달
            console.log("📤 WebSocket 메시지 전송됨");
        };

        // WebSocket 메시지 수신 시 처리
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data); // 서버에서 받은 데이터(JSON 형태로 가정)
            console.log("받은 데이터:", data);
            displayFriendRequestAlert(data);  // 알림 화면에 표시
        };

        socket.onclose = () => console.log("WebSocket 연결 종료");
        socket.onerror = (err) => console.error("WebSocket 오류", err);
    }

    // 친구 요청 알림을 화면에 표시
    function displayFriendRequestAlert(data) {
        let notificationContainer = document.getElementById("notificationContainer");

        // notificationContainer가 없으면 자바스크립트로 생성
        if (!notificationContainer) {
            notificationContainer = document.createElement("div");
            notificationContainer.id = "notificationContainer";
            notificationContainer.style.position = "fixed";
            notificationContainer.style.top = "10px";
            notificationContainer.style.right = "10px";
            notificationContainer.style.zIndex = "9999";
            notificationContainer.style.backgroundColor = "#fff";
            notificationContainer.style.border = "1px solid #ccc";
            notificationContainer.style.padding = "10px";
            document.body.appendChild(notificationContainer);
        }

        const notification = document.createElement("div");
        notification.classList.add("friend-request-notification");
        notification.innerHTML = `
            <p><strong>${data.mem_nick}</strong>님이 친구 요청을 보냈습니다.</p>
            <button onclick="acceptFriend(${data.mem_no}, this)">수락</button>
            <button onclick="declineFriend(${data.mem_no})">거절</button>
        `;

        notificationContainer.appendChild(notification);
    }

    // 친구 요청 수락 함수 (전역 범위로 이동)
    window.acceptFriend = function(senderMemNo, button) {
        fetch("/friendlist/accept", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ sender_mem_no: senderMemNo })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("응답 실패");
            }
            return res.text();  // 이건 ok 확인 후
        })
        .then(text => {
            alert(text);  // 서버에서 보낸 "친구 수락 완료"
            location.reload();
            if (button) {
                button.disabled = true;
                button.textContent = "팔로잉";
            }
        })
        .catch(err => {
            console.error(err);
            alert("친구 요청 수락에 실패했습니다.");
        });
    }

    // 친구 요청 거절 함수 (전역 범위로 이동)
    window.declineFriend = function(senderMemNo) {
        fetch("/friendlist/declineFriend", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ sender_mem_no: senderMemNo })
        })
        .then(response => response.text())  // 텍스트로 응답 받기
        .then(data => {
            alert(data);  // 서버에서 보낸 메시지 (예: "친구 요청을 거절했습니다.")
            location.reload();  // 페이지 새로 고침
        })
        .catch(error => {
            console.error("친구 요청 거절 실패:", error);
            alert("요청을 처리하는 중 오류가 발생했습니다.");
        });
    }

});
