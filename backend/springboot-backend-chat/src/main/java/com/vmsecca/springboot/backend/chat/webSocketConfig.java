package com.vmsecca.springboot.backend.chat;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker

public class webSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${websocket.allowed-origins:http://localhost:4200}")
    private String allowedOriginsForCors;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        // Registers the endpoint that clients connect to in order to initiate the WebSocket (or SockJS fallback) handshake.
        // The client will open a connection to /chat-websocket to begin the STOMP session.
            registry.addEndpoint("/chat-websocket")
            .setAllowedOrigins(allowedOriginsForCors.split(","))

            // Enables SockJS as a fallback transport for environments where native WebSockets
            // are blocked or unavailable (e.g., older browsers, restrictive proxies).
            .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        // Messages sent to destinations starting with /app are routed to @MessageMapping
        // controller methods. Think of /app as the "client → server" path.
        config.setApplicationDestinationPrefixes("/app");

        // Enables an in-memory message broker that handles destinations starting with /topic.
        // These destinations support publish–subscribe behavior: messages sent there
        // are broadcast to all clients subscribed to the topic.
        config.enableSimpleBroker("/topic/");
    }

}