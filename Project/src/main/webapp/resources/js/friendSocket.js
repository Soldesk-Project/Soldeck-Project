document.addEventListener("DOMContentLoaded", () => {
    
    const senderMemNo = document.body.dataset.memNo;
    
    let socket = null;
    let alarmCount = 0;
    
    // 세션스토리지 알람 가져오기
    function getStoredAlarms() {
        const alarms = sessionStorage.getItem("alarms");
        return alarms ? JSON.parse(alarms) : [];
    }
    
    // 세션스토리지에 알람 저장
    function setStoredAlarms(alarms) {
        sessionStorage.setItem("alarms", JSON.stringify(alarms));
    }
    
    const pendingRequest = JSON.parse(document.body.dataset.pendingRequest || '[]');
    
    // 서버에서 온 pendingRequest 알림 먼저 화면에 표시
    pendingRequest.forEach(request => {
        if (request.mem_nick) {
            displayRequestAlert(request);
        }
    });

    // 세션스토리지에 있는 알림 중 중복되지 않는 것만 화면에 표시
    const storedAlarms = getStoredAlarms();
    storedAlarms.forEach(alarm => {
        const alarmList = document.getElementById("alarmList");
        if (!alarmList) return;

        const exists = Array.from(alarmList.children).some(li =>
            li.textContent.includes(alarm.mem_nick)
        );
        if (!exists && alarm.mem_nick) {
            displayRequestAlert(alarm);
        }
    });

    if (senderMemNo) {
        socket = new WebSocket("ws://52.78.25.188/friendSocket");

        socket.onopen = () => {
            socket.send(senderMemNo.toString());
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("받은 데이터:", data);
            displayRequestAlert(data);
        };

        socket.onclose = () => console.log("WebSocket 연결 종료");
        socket.onerror = (err) => console.error("WebSocket 오류", err);
    }

    function displayRequestAlert(data) {
        const alarmList = document.getElementById("alarmList");
        if (!alarmList) return;

        // "새로운 알림이 없습니다." 메시지 제거
        const emptyMsg = alarmList.querySelector("li");
        if (emptyMsg && emptyMsg.textContent === "새로운 알림이 없습니다.") {
            alarmList.removeChild(emptyMsg);
        }

        const li = document.createElement("li");

        if (data.type === "friend" || 'frd_req' in data) {
            li.innerHTML = `
                <p><strong>${data.mem_nick}</strong>님이 친구 요청을 보냈습니다.</p>
                <button onclick="acceptFriend(${data.mem_no}, this)">수락</button>
                <button onclick="declineFriend(${data.mem_no}, this)">거절</button>
            `;
        } else if (data.type === "group" || 'group_no' in data) {
            li.innerHTML = `
                <p><strong>${data.mem_nick}</strong>님이 <strong>${data.chat_title}</strong> 그룹에 초대했습니다.</p>
                <button onclick="acceptGroup(${data.group_no}, ${data.mem_no}, this)">수락</button>
                <button onclick="declineGroup(${data.group_no}, ${data.mem_no}, this)">거절</button>
            `;
        }else{
        	return;
        }

        alarmList.appendChild(li);

        let alarms = getStoredAlarms();
        // 중복 저장 체크
        if (!alarms.some(alarm => JSON.stringify(alarm) === JSON.stringify(data))) {
            alarms.push(data);
            setStoredAlarms(alarms);
        }
        
        alarmCount = alarms.length;
        updateAlarmBadge(alarmCount);
    }
    
    function removeNotificationAndContainerIfEmpty(button) {
        const li = button.closest('li');
        if (!li) return;

        const alarmText = li.textContent;
        li.remove();

        let alarms = getStoredAlarms();
        alarms = alarms.filter(alarm => {
            return !(alarm.mem_nick && alarmText.includes(alarm.mem_nick));
        });
        setStoredAlarms(alarms);

        const alarmList = document.getElementById('alarmList');
        if (alarmList && alarmList.children.length === 0) {
            const emptyMsg = document.createElement('li');
            emptyMsg.textContent = "새로운 알림이 없습니다.";
            alarmList.appendChild(emptyMsg);
        }

        alarmCount = alarms.length;
        updateAlarmBadge(alarmCount);
    }
    
    window.acceptFriend = function(senderMemNo, button) {
        fetch("/friendlist/accept", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ sender_mem_no: senderMemNo })
        })
        .then(res => {
            if (!res.ok) throw new Error("응답 실패");
            return res.text();
        })
        .then(text => {
            alert(text);
            if (button) {
                button.disabled = true;
                button.textContent = "팔로잉";
                removeNotificationAndContainerIfEmpty(button);
            }
        })
        .catch(err => {
            console.error(err);
            alert("친구 요청 수락에 실패했습니다.");
        });
    }

    window.declineFriend = function(senderMemNo, button) {
        fetch("/friendlist/declineFriend", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ sender_mem_no: senderMemNo })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (button) removeNotificationAndContainerIfEmpty(button);
        })
        .catch(error => {
            console.error("친구 요청 거절 실패:", error);
            alert("요청을 처리하는 중 오류가 발생했습니다.");
        });
    }

    window.acceptGroup = function(group_no, mem_no, button) {
        fetch("/grouplist/accept", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ group_no, mem_no })
        })
        .then(res => {
            if (!res.ok) throw new Error("응답 실패");
            return res.text();
        })
        .then(text => {
            alert(text);
            if (button) {
                button.disabled = true;
                button.textContent = "수락됨";
                removeNotificationAndContainerIfEmpty(button);
            }
        })
        .catch(err => {
            console.error(err);
            alert("그룹 요청 수락에 실패했습니다.");
        });
    }

    window.declineGroup = function(group_no, mem_no, button) {
        fetch("/grouplist/declineGroup", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ group_no, mem_no })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (button) removeNotificationAndContainerIfEmpty(button);
        })
        .catch(error => {
            console.error("그룹 요청 거절 실패:", error);
            alert("요청을 처리하는 중 오류가 발생했습니다.");
        });
    }

});