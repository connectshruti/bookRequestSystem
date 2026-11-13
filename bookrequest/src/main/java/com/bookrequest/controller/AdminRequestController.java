package com.bookrequest.controller;

import com.bookrequest.dto.BookRequestResponseDTO;
import com.bookrequest.entity.BookRequest;
import com.bookrequest.repository.BookRequestRepository;
import com.bookrequest.repository.TechnologyRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/requests")
public class AdminRequestController {

    private final BookRequestRepository bookRequestRepository;
    private final TechnologyRepository technologyRepository;

    public AdminRequestController(
            BookRequestRepository bookRequestRepository,
            TechnologyRepository technologyRepository) {
        this.bookRequestRepository = bookRequestRepository;
        this.technologyRepository = technologyRepository;
    }

    // API 1: View all employee book requests
    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<List<BookRequestResponseDTO>> getAllRequests() {

        List<BookRequestResponseDTO> requests =
                bookRequestRepository.findAll()
                        .stream()
                        .map(BookRequestResponseDTO::new)
                        .toList();

        return ResponseEntity.ok(requests);
    }

    // API 2: View requests by technology
    @GetMapping("/technology/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<?> getRequestsByTechnology(
            @PathVariable Long id) {

        if (!technologyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        List<BookRequestResponseDTO> requests =
                bookRequestRepository.findByTechnologyId(id)
                        .stream()
                        .map(BookRequestResponseDTO::new)
                        .toList();

        return ResponseEntity.ok(requests);
    }
}