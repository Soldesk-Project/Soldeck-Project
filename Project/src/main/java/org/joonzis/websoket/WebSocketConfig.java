package org.joonzis.websoket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private ChatWebSocketHandler chatWebSocketHandler;
    
    @Autowired
    private FriendSocketHandler friendSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatWebSocketHandler, "/chat/{groupNo}")
                .setAllowedOrigins("*");  // 필요에 따라 다른 도메인 설정
        
        // 친구 요청 알림용 WebSocket 경로 추가
        registry.addHandler(friendSocketHandler, "/friendSocket")
                .setAllowedOrigins("*");
        
        // 친구 요청 알림용 WebSocket 경로 추가
        registry.addHandler(chatWebSocketHandler, "/chat/{roomNo}")
                .setAllowedOrigins("*");
    }
}