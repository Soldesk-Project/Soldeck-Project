package org.joonzis.websoket;

import java.util.List;
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

    private List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("접속: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        for (WebSocketSession s : sessions) {
            s.sendMessage(message); // 모든 세션에 메시지 전송
        }
        
        // 받은 메시지를 저장 (groupNo, memNo는 해당 세션에서 추출해야함)
        // 예시로 1번 그룹, 1번 회원으로 임시 설정
        int groupNo = 21;  // 실제 그룹 번호로 대체해야 함
        int memNo = 1;    // 실제 회원 번호로 대체해야 함
        System.out.println("groupNo: " + groupNo + ", memNo: " + memNo);  // 디버깅을 위해 출력

        saveChat(message.getPayload(), groupNo, memNo);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        System.out.println("종료: " + session.getId());
    }
    
    // 채팅 메시지를 DB에 저장
    public void saveChat(String message, int groupNo, int memNo) {
        ChatLogVO chat = new ChatLogVO();
        chat.setGroupNo(groupNo);
        chat.setMemNo(memNo);
        chat.setChatLog(message);
        chat.setChatType("text");  // 기본은 텍스트로 가정
        
        log.info("saveChat..." + chat);
        chatLogMapper.insertChat(chat);
    }
    
    
}
