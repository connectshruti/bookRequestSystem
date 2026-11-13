
package com.bookrequest.controller;

import com.bookrequest.dto.EmployeeBookRequestDTO;
import com.bookrequest.entity.BookRequest;
import com.bookrequest.entity.Technology;

import com.bookrequest.repository.BookRequestRepository;
import com.bookrequest.repository.TechnologyRepository;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/employee/requests")
public class EmployeeRequestController {

    private final BookRequestRepository bookRequestRepository;
    private final TechnologyRepository technologyRepository;

    public EmployeeRequestController(
            BookRequestRepository bookRequestRepository,
            TechnologyRepository technologyRepository) {

        this.bookRequestRepository = bookRequestRepository;
        this.technologyRepository = technologyRepository;
    }

    // SUBMIT NEW BOOK REQUEST
    @PostMapping
    @Transactional
    public ResponseEntity<?> requestBook(
            @Valid @RequestBody EmployeeBookRequestDTO request) {

        Technology technology =
                technologyRepository.findById(request.getTechnologyId())
                        .orElse(null);

        if (technology == null) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Technology not found")
            );
        }

        BookRequest bookRequest = new BookRequest();

        bookRequest.setBookTitle(request.getBookTitle());
        bookRequest.setAuthor(request.getAuthor());
        bookRequest.setEmployeeId(request.getEmployeeId());
        bookRequest.setTechnology(technology);

        BookRequest savedRequest =
                bookRequestRepository.save(bookRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                Map.of(
                        "message", "Book request submitted successfully",
                        "requestId", savedRequest.getId(),
                        "bookTitle", savedRequest.getBookTitle(),
                        "employeeId", savedRequest.getEmployeeId(),
                        "technology", technology.getName()
                )
        );
    }
}
