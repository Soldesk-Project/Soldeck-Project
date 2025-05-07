package org.joonzis.websoket;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import lombok.extern.log4j.Log4j;

@Log4j
@Component
public class FriendSocketHandler extends TextWebSocketHandler {

    // mem_no → WebSocketSession
    private static Map<Integer, WebSocketSession> userSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 클라이언트가 연결되면 첫 메시지로 자신의 mem_no를 보내는 것으로 설정
        // ex) socket.send("88");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            int memNo = Integer.parseInt(message.getPayload());
            userSessions.put(memNo, session);
        } catch (NumberFormatException e) {
            // 받은 게 숫자가 아니면 무시
        }
    }

 // senderMemNo와 senderNick을 받아서 JSON 형태로 구성
    public void sendFriendRequestAlert(int targetMemNo, int senderMemNo, String senderNick) {
        WebSocketSession session = userSessions.get(targetMemNo);
        if (session != null && session.isOpen()) {
            try {
                String jsonMessage = String.format(
                    "{\"senderMemNo\": %d, \"senderNick\": \"%s\"}", senderMemNo, senderNick);
                session.sendMessage(new TextMessage(jsonMessage));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        userSessions.values().remove(session);
    }
}
