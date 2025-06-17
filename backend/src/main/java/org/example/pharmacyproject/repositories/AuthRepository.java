package org.example.pharmacyproject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AuthRepository extends JpaRepository<AuthEntity, Long> {
    Optional<AuthEntity> findByUsername(String username);

    // ← Add this method to allow lookup by the associated UserEntity’s email
    Optional<AuthEntity> findByUser_Email(String email);
}

