package com.vmsecca.springboot.backend.chat.models.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.vmsecca.springboot.backend.chat.models.dao.chatDao;
import com.vmsecca.springboot.backend.chat.models.documents.Message;

public class chatServiceImp implements chatService {

    @Autowired
    private chatDao chatRepository;

    @Override
    public List<Message> getLast10Messages() {
        return chatRepository.findFirst10ByOrderByDateDesc();

    }

    @Override
    public Message save(Message message) {
        return chatRepository.save(message);
    }

}
