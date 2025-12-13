package com.vmsecca.springboot.backend.chat.models.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vmsecca.springboot.backend.chat.models.dao.chatDao;
import com.vmsecca.springboot.backend.chat.models.dao.userDao;
import com.vmsecca.springboot.backend.chat.models.documents.Message;
import com.vmsecca.springboot.backend.chat.models.documents.User;

@Service
public class chatServiceImp implements chatService {

    @Autowired
    private chatDao chatRepository;

    @Autowired
    private userDao userRepository;

    @Override
    public List<Message> getLast10Messages() {
        return chatRepository.findFirst10ByOrderByDateDesc();

    }

    @Override
    public Message save(Message message) {
        return chatRepository.save(message);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

}
