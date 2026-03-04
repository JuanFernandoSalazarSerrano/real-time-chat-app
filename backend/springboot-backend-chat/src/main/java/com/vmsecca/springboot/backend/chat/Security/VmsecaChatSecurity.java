package com.vmsecca.springboot.backend.chat.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity // springboot as resourceserver
public class VmsecaChatSecurity {

        @Bean
    // HttpSecurity is a buidler
    SecurityFilterChain configure(HttpSecurity http) throws Exception{

        // configure http security filter chain. Also, http.build(); represents the final configured filter chain
        http.authorizeHttpRequests((authz) ->
        authz
        .requestMatchers(HttpMethod.GET, "/chat-websocket").hasAuthority("SCOPE_profile") // if get method is used to that endpoint this user must have a profile scope of access
        .anyRequest().authenticated()) // all requests must be authenticated 
        .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> {})); // set the app as a resource server that expects jwt

        return http.build();
    }

}
