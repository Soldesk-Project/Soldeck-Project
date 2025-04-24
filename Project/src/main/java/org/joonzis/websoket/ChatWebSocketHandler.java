package org.joonzis.websoket;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

import org.joonzis.domain.ChatLogVO;
import org.joonzis.mapper.ChatLogMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import lombok.extern.log4j.Log4j;

@Log4j
@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

    @Autowired
    private ChatLogMapper chatLogMapper;

    // 그룹 번호별 세션 저장소
    private final Map<String, List<WebSocketSession>> roomSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String uri = session.getUri().toString(); // 예: ws://도메인/chat/21
        String groupNo = uri.substring(uri.lastIndexOf("/") + 1);

        roomSessions.computeIfAbsent(groupNo, k -> new CopyOnWriteArrayList<>()).add(session);
        session.getAttributes().put("groupNo", groupNo);

        log.info("접속: " + session.getId() + " / 그룹: " + groupNo);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String groupNo = (String) session.getAttributes().get("groupNo");

        List<WebSocketSession> sessionsInRoom = roomSessions.get(groupNo);
        if (sessionsInRoom != null) {
            for (WebSocketSession s : sessionsInRoom) {
                s.sendMessage(message);
            }
        }

        // 실제 로그인 회원 번호에서 가져와야 함 (지금은 테스트용)
        int memNo = 1;

        saveChat(message.getPayload(), Integer.parseInt(groupNo), memNo);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String groupNo = (String) session.getAttributes().get("groupNo");

        if (groupNo != null) {
            List<WebSocketSession> sessionsInRoom = roomSessions.get(groupNo);
            if (sessionsInRoom != null) {
                sessionsInRoom.remove(session);
                if (sessionsInRoom.isEmpty()) {
                    roomSessions.remove(groupNo);
                }
            }
        }

        log.info("종료: " + session.getId() + " / 그룹: " + groupNo);
    }

    // 채팅 메시지 DB 저장
    private void saveChat(String message, int groupNo, int memNo) {
        ChatLogVO chat = new ChatLogVO();
        chat.setGroupNo(groupNo);
        chat.setMemNo(memNo);
        chat.setChatLog(message);
        chat.setChatType("text");

        log.info("saveChat..." + chat);
        chatLogMapper.insertChat(chat);
    }
}
