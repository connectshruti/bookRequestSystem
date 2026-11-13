
package com.bookrequest.repository;

import com.bookrequest.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTechnologyId(Long technologyId);

}