package com.vmsecca.springboot.backend.chat.controller;

import java.util.Date;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.vmsecca.springboot.backend.chat.models.Colors;
import com.vmsecca.springboot.backend.chat.models.documents.Message;
import com.vmsecca.springboot.backend.chat.models.service.chatService;


@Controller // this class is a component and a controller (stereotype annotation / bussiness logic bean and allow spring mvc do the job)
public class chatController {	

	@Autowired
	private chatService chatService;

	@Autowired
	private SimpMessagingTemplate webSocket;

	private String[] colors = Colors.COLORS;

	@MessageMapping("/message") // the users will send the messages here
	@SendTo("/topic/message")
	public Message handleMessage(Message message) {

		if (message.getType().equals("NEW_USER_CONNECTION")){
			message.setColor(colors[new Random().nextInt(colors.length)]);
			message.setText("New user connection: " + message.getSender());
		}

		else{
		message.setDate(new Date().getTime());
		message.setText("Handled by the broker: " + message.getText());
		}

		chatService.save(message);
		return message;
	}


	@MessageMapping("/typing") // the users will send the messages here
	@SendTo("/topic/typing")
	public Message userIsWriting(Message message){
		
		return message;
	}


	@MessageMapping("/messageHistory")
	public void messageHistory(String username){
		webSocket.convertAndSend("/topic/messageHistory/" + username, chatService.getLast10Messages());
	}

	
}
