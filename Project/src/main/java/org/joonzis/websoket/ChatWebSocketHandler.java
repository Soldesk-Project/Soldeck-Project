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

//    @Override
//    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//        String groupNo = (String) session.getAttributes().get("groupNo");
//
//        List<WebSocketSession> sessionsInRoom = roomSessions.get(groupNo);
//        if (sessionsInRoom != null) {
//            for (WebSocketSession s : sessionsInRoom) {
//                s.sendMessage(message);  // 모든 메시지를 브로드캐스트
//            }
//        }
//
//        // JSON 파싱
//        ObjectMapper mapper = new ObjectMapper();
//        Map<String, Object> msgMap = mapper.readValue(message.getPayload(), Map.class);
//
//        // 채팅 메시지일 때만 처리
//        if ("chat".equals(msgMap.get("type"))) {
//            int memNo = Integer.parseInt(String.valueOf(msgMap.get("mem_no")));
//            String msg = String.valueOf(msgMap.get("msg"));
//            String sender = String.valueOf(msgMap.get("sender"));
//            
//            // 개인 채팅에 필요한 roomNo가 있을 경우 추출
//            int roomNo = Integer.parseInt(String.valueOf(msgMap.get("room_no"))); // room_no가 JSON에 포함되어 있다고 가정
//            System.out.println(roomNo);
//
//            String saveMessage = sender + ":" + msg;
//
//            // 그룹 채팅인지 개인 채팅인지 구분
//            if (groupNo != null && !groupNo.isEmpty()) {
//                // 그룹 채팅일 경우
//                saveChatToGroup(saveMessage, Integer.parseInt(groupNo), memNo);
//            } else {
//                // 개인 채팅일 경우
//                saveChatToPrivate(saveMessage, memNo, roomNo);
//
//                // 개인 채팅에서는 보내는 사람에게만 메시지 전달
//                session.sendMessage(message);
//            }
//        }
//    }
    
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
            String chatType = String.valueOf(msgMap.get("chat_type")); // 👈 새로 추가

            if (msgMap.containsKey("room_no") && msgMap.get("room_no") != null) {
                roomNo = Integer.parseInt(String.valueOf(msgMap.get("room_no")));
            }

            String saveMessage = sender + ":" + msg;

            // ✅ 개인/그룹 채팅 분기 (기존 groupNo 사용 분기 제거)
            if ("private".equals(chatType)) {
                if (roomNo > 0) {
                    saveChatToPrivate(saveMessage, memNo, roomNo);
                    session.sendMessage(message);  // 개인 채팅은 본인에게만
                }
            } else if ("group".equals(chatType)) {
                // 그룹 채팅 브로드캐스트
                List<WebSocketSession> sessionsInRoom = roomSessions.get(groupNo);
                if (sessionsInRoom != null) {
                    for (WebSocketSession s : sessionsInRoom) {
                        s.sendMessage(message);
                    }
                }

                saveChatToGroup(saveMessage, Integer.parseInt(groupNo), memNo);
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