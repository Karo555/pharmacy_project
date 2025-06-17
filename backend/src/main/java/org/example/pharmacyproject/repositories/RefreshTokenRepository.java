package org.example.pharmacyproject.repositories;

import org.example.pharmacyproject.entities.User;
import org.example.pharmacyproject.entities.tokens.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByUser(User user);
}

