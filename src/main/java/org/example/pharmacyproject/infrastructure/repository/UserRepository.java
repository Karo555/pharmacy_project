package org.example.pharmacyproject.infrastructure.repository;

import org.example.pharmacyproject.infrastructure.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {



}
