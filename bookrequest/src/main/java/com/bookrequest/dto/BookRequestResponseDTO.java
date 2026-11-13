package com.bookrequest.dto;

import com.bookrequest.entity.BookRequest;
import java.time.LocalDateTime;

public class BookRequestResponseDTO {

    private Long id;
    private String bookTitle;
    private String author;
    private Long employeeId;
    private Long technologyId;
    private String technologyName;
    private LocalDateTime requestedAt;

    public BookRequestResponseDTO(BookRequest request) {
        this.id = request.getId();
        this.bookTitle = request.getBookTitle();
        this.author = request.getAuthor();
        this.employeeId = request.getEmployeeId();
        this.technologyId = request.getTechnology().getId();
        this.technologyName = request.getTechnology().getName();
        this.requestedAt = request.getRequestedAt();
    }

    public Long getId() {
        return id;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public String getAuthor() {
        return author;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public Long getTechnologyId() {
        return technologyId;
    }

    public String getTechnologyName() {
        return technologyName;
    }

    public LocalDateTime getRequestedAt() {
        return requestedAt;
    }
}