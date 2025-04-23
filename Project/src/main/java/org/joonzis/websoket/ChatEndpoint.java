package org.joonzis.websoket;

import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/chat")
public class ChatEndpoint {

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("웹소켓 연결 성공: " + session.getId());
    }

    @OnMessage
    public void onMessage(Session session, String message) {
        System.out.println("수신 메시지: " + message);
        try {
            // 받은 메시지를 그대로 모든 클라이언트에게 브로드캐스팅 (단일 사용자 테스트 중이면 그냥 echo)
            for (Session s : session.getOpenSessions()) {
                s.getBasicRemote().sendText(message);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("웹소켓 연결 종료: " + session.getId());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        throwable.printStackTrace();
    }
}


