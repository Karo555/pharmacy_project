package org.example.pharmacyproject.repositories;

import org.example.pharmacyproject.entities.User;
import org.example.pharmacyproject.entities.tokens.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByUser(User user);
}

