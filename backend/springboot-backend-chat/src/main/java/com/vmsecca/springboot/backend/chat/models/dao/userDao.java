package com.vmsecca.springboot.backend.chat.models.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.vmsecca.springboot.backend.chat.models.documents.User;

public interface userDao extends MongoRepository<User, String> {

    public User findByUsername(String username); // find user by username 

}
