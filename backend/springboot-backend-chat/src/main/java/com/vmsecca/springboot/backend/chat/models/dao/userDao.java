package com.vmsecca.springboot.backend.chat.models.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.Authentication;


import com.vmsecca.springboot.backend.chat.models.documents.User;

public interface userDao extends MongoRepository<User, String> {

    public Iterable<User> findByUsername(String username); // find user by username 

    default Iterable<User> findAllUsers() {
    SecurityContext context = SecurityContextHolder.getContext();
    Authentication authentication = context.getAuthentication();
    String owner = authentication.getName();
    return findByUsername(owner);
}

}
