
package com.bookrequest.dto;

import com.bookrequest.entity.Book;
import com.bookrequest.entity.BookStatus;

import java.math.BigDecimal;

public class BookResponseDTO {

    private Long id;
    private String title;
    private String author;
    private BigDecimal price;
    private BookStatus status;
    private Long technologyId;
    private String technologyName;

    public BookResponseDTO(Book book) {
        this.id = book.getId();
        this.title = book.getTitle();
        this.author = book.getAuthor();
        this.price = book.getPrice();
        this.status = book.getStatus();
        this.technologyId = book.getTechnology().getId();
        this.technologyName = book.getTechnology().getName();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public BookStatus getStatus() {
        return status;
    }

    public Long getTechnologyId() {
        return technologyId;
    }

    public String getTechnologyName() {
        return technologyName;
    }
}
