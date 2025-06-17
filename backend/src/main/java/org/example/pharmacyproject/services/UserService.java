// src/main/java/org/example/pharmacyproject/service/UserService.java
package org.example.pharmacyproject.services;

import org.example.pharmacyproject.dtos.user.profile.GetUserProfileDto;
import org.example.pharmacyproject.dtos.user.profile.UpdateUserProfileDto;
import org.example.pharmacyproject.entities.UserEntity;
import org.example.pharmacyproject.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public GetUserProfileDto getProfile(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return new GetUserProfileDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                null,   // phoneNumber (not yet supported in entity)
                null    // address   (not yet supported in entity)
        );
    }

    @Transactional
    public GetUserProfileDto updateProfile(Long userId, UpdateUserProfileDto dto) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (dto.getUsername() != null && !dto.getUsername().isBlank()) {
            user.setName(dto.getUsername());
        }
        if (dto.getEmail() != null && !dto.getEmail().isBlank()) {
            user.setEmail(dto.getEmail());
        }
        // phoneNumber and address will be ignored until added to UserEntity

        user = userRepository.save(user);

        return new GetUserProfileDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                null,
                null
        );
    }
}

