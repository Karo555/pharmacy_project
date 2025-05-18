package org.example.pharmacyproject.infrastructure.repository;

import org.example.pharmacyproject.infrastructure.entity.AuthEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<AuthEntity, Long> {

    Optional<AuthEntity> findByUsername(String username);

}
