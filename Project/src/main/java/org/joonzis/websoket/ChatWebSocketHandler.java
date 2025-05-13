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
        int roomNo = 0; // 기본값
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> msgMap = mapper.readValue(message.getPayload(), Map.class);

        // 채팅 메시지일 때만 처리
        if ("chat".equals(msgMap.get("type"))) {
            int memNo = Integer.parseInt(String.valueOf(msgMap.get("mem_no")));
            String msg = String.valueOf(msgMap.get("msg"));
            String sender = String.valueOf(msgMap.get("sender"));
            String chatType = String.valueOf(msgMap.get("chat_type")); // 채팅 유형

            if (msgMap.containsKey("room_no") && msgMap.get("room_no") != null) {
                try {
                    roomNo = Integer.parseInt(String.valueOf(msgMap.get("room_no")));
                } catch (NumberFormatException e) {
                    log.error("room_no 파싱 실패", e);
                }
            }

            String saveMessage = sender + ":" + msg;

            // 개인/그룹 채팅 분기
            if ("private".equals(chatType)) {
                if (roomNo > 0) {
                    // 1:1 채팅 처리
                    List<WebSocketSession> sessionsInRoom = roomSessions.get(String.valueOf(roomNo));
                    if (sessionsInRoom != null) {
                        // 상대방에게만 메시지를 보냄
                        for (WebSocketSession s : sessionsInRoom) {
                            // 메시지 보내는 대상은 본인이 아니라 상대방
                            if (!s.getId().equals(session.getId())) {
                                s.sendMessage(message);
                            }
                        }
                        session.sendMessage(message);  // 보낸 사람에게도 메시지 전송
                    }
                    saveChatToPrivate(saveMessage, memNo, roomNo);  // 개인 채팅 저장
                }
            } else if ("group".equals(chatType)) {
                // 그룹 채팅 처리
                List<WebSocketSession> sessionsInRoom = roomSessions.get(groupNo);
                if (sessionsInRoom != null) {
                    for (WebSocketSession s : sessionsInRoom) {
                        s.sendMessage(message);  // 그룹 채팅은 모든 사용자에게 전송
                    }
                }
                saveChatToGroup(saveMessage, Integer.parseInt(groupNo), memNo);  // 그룹 채팅 메시지 저장
            }
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
    private void saveChatToGroup(String message, int groupNo, int memNo) {
        ChatLogVO chat = new ChatLogVO();
        chat.setGroupNo(groupNo);
        chat.setMemNo(memNo);
        chat.setChatLog(message);
        chat.setChatType("text");

        log.info("saveChat..." + chat);
        chatLogMapper.insertChat(chat);
    }
    
    // 개인 채팅 메시지 저장
    private void saveChatToPrivate(String message, int memNo, int roomNo) {
    	chatLogMapper.insertPrivateChatLog(roomNo, memNo, message);
    }
}