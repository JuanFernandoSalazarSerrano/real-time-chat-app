package com.vmsecca.springboot.backend.chat.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vmsecca.springboot.backend.chat.models.documents.User;
import com.vmsecca.springboot.backend.chat.models.service.chatService;

@RestController
@RequestMapping("/api/v1")
public class userController {

    @Autowired
	private chatService chatService;

    @GetMapping("/vmseca")
    public ResponseEntity<Iterable<User>> findByUsername(@AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(chatService.findAllUsers());
    }
}