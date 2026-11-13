package com.bookrequest.controller;

import com.bookrequest.dto.BookRequestDTO;
import com.bookrequest.dto.BookResponseDTO;
import com.bookrequest.dto.UpdateBookStatusDTO;

import com.bookrequest.entity.Book;
import com.bookrequest.entity.BookStatus;
import com.bookrequest.entity.Technology;

import com.bookrequest.repository.BookRepository;
import com.bookrequest.repository.TechnologyRepository;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

        import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/books")
public class BookController {

    private final BookRepository bookRepository;
    private final TechnologyRepository technologyRepository;

    public BookController(
            BookRepository bookRepository,
            TechnologyRepository technologyRepository) {

        this.bookRepository = bookRepository;
        this.technologyRepository = technologyRepository;
    }

    // 1. ADD NEW BOOK
    @PostMapping
    @Transactional
    public ResponseEntity<?> addBook(
            @Valid @RequestBody BookRequestDTO request) {

        Technology technology =
                technologyRepository.findById(request.getTechnologyId())
                        .orElse(null);

        if (technology == null) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Technology not found")
            );
        }

        Book book = new Book();

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setPrice(request.getPrice());
        book.setStatus(BookStatus.AVAILABLE);
        book.setTechnology(technology);

        Book savedBook = bookRepository.save(book);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new BookResponseDTO(savedBook));
    }

    // 2. GET ALL BOOKS
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

    // 3. GET BOOKS BY TECHNOLOGY
    @GetMapping("/technology/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<List<BookResponseDTO>> getBooksByTechnology(
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

    // 4. UPDATE BOOK STATUS
    @PutMapping("/{id}/status")
    @Transactional
    public ResponseEntity<?> updateBookStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateBookStatusDTO request) {

        Book book = bookRepository.findById(id).orElse(null);

        if (book == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Book not found"));
        }

        book.setStatus(request.getStatus());

        Book updatedBook = bookRepository.save(book);

        return ResponseEntity.ok(new BookResponseDTO(updatedBook));
    }

    // 5. DELETE BOOK
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {

        if (!bookRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Book not found"));
        }

        bookRepository.deleteById(id);

        return ResponseEntity.ok(
                Map.of("message", "Book deleted successfully")
        );
    }
}
