package com.vmsecca.springboot.backend.chat.models.service;

import java.util.List;

import com.vmsecca.springboot.backend.chat.models.documents.Message;

public interface chatService {

    public List<Message> getLast10Messages();
    public Message save(Message message);

}
