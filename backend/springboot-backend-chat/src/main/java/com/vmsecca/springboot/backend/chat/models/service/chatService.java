package com.vmsecca.springboot.backend.chat.models.service;

import java.util.List;

import com.vmsecca.springboot.backend.chat.models.documents.Message;
import com.vmsecca.springboot.backend.chat.models.documents.User;

public interface chatService {

    public List<Message> getLast10Messages();
    public Message save(Message message);
    public User findByUsername(String username);

}
