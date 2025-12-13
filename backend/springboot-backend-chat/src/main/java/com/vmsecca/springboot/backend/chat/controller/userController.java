package com.vmsecca.springboot.backend.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vmsecca.springboot.backend.chat.models.documents.User;
import com.vmsecca.springboot.backend.chat.models.service.chatService;

@RestController
@RequestMapping("/api/v1")
public class userController {

    @Autowired
	private chatService chatService;

    @GetMapping("/vmseca")
    public User findByUsername(@RequestParam String name) {
        return chatService.findByUsername("james");
    }
    

}