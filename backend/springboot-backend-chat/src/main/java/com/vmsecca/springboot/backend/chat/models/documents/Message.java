package com.vmsecca.springboot.backend.chat.models.documents;

import java.io.Serializable;

public class Message implements Serializable {

    private String text;
    private long date;
    
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

}
