
package com.bookrequest.config;

import com.bookrequest.entity.Technology;
import com.bookrequest.repository.TechnologyRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class TechnologyDataInitializer {

    @Bean
    CommandLineRunner initializeTechnologies(
            TechnologyRepository technologyRepository) {

        return args -> {

            List<String> defaultTechnologies = List.of(
                    "Java",
                    "Spring Boot",
                    "React",
                    "JavaScript",
                    "Python",
                    "Angular",
                    "Node.js",
                    "SQL",
                    "Docker",
                    "Microservices"
            );

            for (String name : defaultTechnologies) {

                boolean exists = technologyRepository
                        .findAll()
                        .stream()
                        .anyMatch(technology ->
                                technology.getName()
                                        .equalsIgnoreCase(name));

                if (!exists) {
                    Technology technology = new Technology();
                    technology.setName(name);

                    technologyRepository.save(technology);
                }
            }

            System.out.println("Default technologies initialized!");
        };
    }
}
