package org.example.pharmacyproject.repositories;

import org.example.pharmacyproject.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

// UserRepository.java
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
}

