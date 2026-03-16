package com.fundoo.dto;

public class NoteDTO {

    private String title;
    private String description;
    private Long userId;
    private String color;
    private Boolean trashed = false;
    private Boolean archived = false;
    
    public NoteDTO() {}
    
    public Boolean getIsTrash() {
    	return trashed;
    }
    
    public void setIsTrash(Boolean trashed) {
    	this.trashed = trashed;
    }
    
    public Boolean getIsArchive() {
    	return archived;
    }
    
    public void setIsArchive(Boolean archived) {
    	this.archived = archived;
    }
    
    
    public String getTitle() {
        return title;
    }
    
    public String getColor() {
    	return color;
    }
    
    public void setColor(String color) {
    	this.color=color;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}