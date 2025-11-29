package com.vmsecca.springboot.backend.chat.controller;

import java.util.Date;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

import com.vmsecca.springboot.backend.chat.models.documents.Message;

public class chatController {

	@MessageMapping("/message") // the users will send the messages here

	@SendTo("/topic/message")
	public Message handleMessage(Message message) {
		
		message.setDate(new Date().getTime());
		message.setText("Handled by the broker: " + message.getText());
		
		return message;
	}

}
