package com.bookrequest.repository;

import com.bookrequest.entity.BookRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookRequestRepository
        extends JpaRepository<BookRequest, Long> {

    List<BookRequest> findByTechnologyId(Long technologyId);
}