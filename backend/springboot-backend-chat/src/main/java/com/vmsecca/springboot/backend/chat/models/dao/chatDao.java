package com.vmsecca.springboot.backend.chat.models.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.vmsecca.springboot.backend.chat.models.documents.Message;

public interface chatDao extends MongoRepository<Message, String> {

    public List<Message> findFirst10ByOrderByDateDesc(); // take first 10 messages in descent order, 10 last messages

}
