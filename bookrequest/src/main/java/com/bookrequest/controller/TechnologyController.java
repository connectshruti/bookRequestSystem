
package com.bookrequest.controller;

import com.bookrequest.entity.Technology;
import com.bookrequest.repository.TechnologyRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/technologies")
public class TechnologyController {

    private final TechnologyRepository technologyRepository;

    public TechnologyController(
            TechnologyRepository technologyRepository) {
        this.technologyRepository = technologyRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllTechnologies() {

        List<Map<String, Object>> technologies =
                technologyRepository.findAll()
                        .stream()
                        .map(technology -> Map.<String, Object>of(
                                "id", technology.getId(),
                                "name", technology.getName()
                        ))
                        .toList();

        return ResponseEntity.ok(technologies);
    }
}
