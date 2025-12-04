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
        registry.addEndpoint("/chat-websocket") // url route to the broker
            .setAllowedOrigins(allowedOriginsForCors.split(","))
            .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        // Use the built-in message broker for subscriptions and broadcasting and
        // route messages whose destination header begins with /topic or /queue to the broker
        
        config.enableSimpleBroker("/topic/"); // path-like strings where /topic/.. implies publish-subscribe (one-to-many)

        // STOMP messages whose destination header begins with /app are routed to
        // @MessageMapping methods in @Controller classes

        config.setApplicationDestinationPrefixes("/app");
    }
}