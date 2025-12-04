package com.vmsecca.springboot.backend.chat.models.documents;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "messages")
public class Message implements Serializable {

    @Id
    private String id;

    private String text;
    private long date;
    private String sender;
    private String type = "NEW_USER_CONNECTION";
    private String color = "white";

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    
    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }
    public String getSender() {
        return sender;
    }
    public void setSender(String sender) {
        this.sender = sender;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    public long getDate() {
        return date;
    }
    public void setDate(long date) {
        this.date = date;
    }
    @Override
    public String toString() {
        return "Message [text=" + text + ", date=" + date + ", sender=" + sender + ", type=" + type + ", color=" + color
                + ", getColor()=" + getColor() + ", getSender()=" + getSender() + ", getType()=" + getType()
                + ", getText()=" + getText() + ", getDate()=" + getDate() + "]";
}
}