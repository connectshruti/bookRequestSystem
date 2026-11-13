

package com.bookrequest.entity;

import jakarta.persistence.*;
        import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "technologies")
public class Technology {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Technology name is required")
    @Column(nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "technology")
    private List<Book> books = new ArrayList<>();

    @OneToMany(mappedBy = "technology")
    private List<BookRequest> bookRequests = new ArrayList<>();

    public Technology() {}

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Book> getBooks() {
        return books;
    }

    public List<BookRequest> getBookRequests() {
        return bookRequests;
    }
}
