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

import com.fasterxml.jackson.databind.ObjectMapper;

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
                s.sendMessage(message);  // 모든 메시지를 브로드캐스트
            }
        }

        // JSON 파싱
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> msgMap = mapper.readValue(message.getPayload(), Map.class);

        // 채팅 메시지일 때만 저장
        if ("chat".equals(msgMap.get("type"))) {
            int memNo = Integer.parseInt(String.valueOf(msgMap.get("mem_no")));
            String msg = String.valueOf(msgMap.get("msg"));

            saveChat(msg, Integer.parseInt(groupNo), memNo);
        }
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