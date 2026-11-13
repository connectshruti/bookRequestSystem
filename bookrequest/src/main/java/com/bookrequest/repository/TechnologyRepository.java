
package com.bookrequest.repository;

import com.bookrequest.entity.Technology;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechnologyRepository
        extends JpaRepository<Technology, Long> {

}