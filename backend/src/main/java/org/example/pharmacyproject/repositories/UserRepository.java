package org.example.pharmacyproject.repositories;

import org.example.pharmacyproject.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// UserRepository.java
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}

