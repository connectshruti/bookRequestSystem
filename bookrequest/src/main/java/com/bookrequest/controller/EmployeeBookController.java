
package com.bookrequest.controller;

import com.bookrequest.dto.BookResponseDTO;
import com.bookrequest.repository.BookRepository;
import com.bookrequest.repository.TechnologyRepository;
import com.bookrequest.entity.BookStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee/books")
public class EmployeeBookController {

    private final BookRepository bookRepository;
    private final TechnologyRepository technologyRepository;

    public EmployeeBookController(
            BookRepository bookRepository,
            TechnologyRepository technologyRepository) {

        this.bookRepository = bookRepository;
        this.technologyRepository = technologyRepository;
    }


    // GET ALL BOOKS WITH THEIR STATUS
    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<List<BookResponseDTO>> getAllBooks() {

        List<BookResponseDTO> books =
                bookRepository.findAll()
                        .stream()
                        .map(BookResponseDTO::new)
                        .toList();

        return ResponseEntity.ok(books);
    }

    // GET BOOKS BY TECHNOLOGY WITH THEIR STATUS
    @GetMapping("/technology/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<?> getBooksByTechnology(
            @PathVariable Long id) {

        if (!technologyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        List<BookResponseDTO> books =
                bookRepository.findByTechnologyId(id)
                        .stream()
                        .map(BookResponseDTO::new)
                        .toList();

        return ResponseEntity.ok(books);
    }

}
