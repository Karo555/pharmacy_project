package org.example.pharmacyproject.services.impl;

import java.time.LocalDateTime;

import org.example.pharmacyproject.dtos.user.password.change.PasswordChangeRequestDTO;
import org.example.pharmacyproject.dtos.user.password.change.PasswordChangeResponseDTO;
import org.example.pharmacyproject.dtos.user.profile.UserProfileResponseDTO;
import org.example.pharmacyproject.dtos.user.profile.UserProfileUpdateRequestDTO;
import org.example.pharmacyproject.entities.User;
import org.example.pharmacyproject.repositories.UserRepository;
import org.example.pharmacyproject.services.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    @Transactional(readOnly = true)
    public UserProfileResponseDTO getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return mapToResponse(user);
    }

    @Override
    @Transactional
    public UserProfileResponseDTO updateProfileByEmail(String email, UserProfileUpdateRequestDTO dto) {
        User user = userRepository.findByEmail(email);
        // apply the changes
        user.setAddress(dto.getAddress());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setPaymentMethod(dto.getPaymentMethod());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        return mapToResponse(user);
    }

    private UserProfileResponseDTO mapToResponse(User u) {
        return new UserProfileResponseDTO(
                u.getId(),
                u.getEmail(),
                u.getAddress(),
                u.getPhoneNumber(),
                u.getPaymentMethod(),
                u.getRole().toString(),
                u.getRegisteredAt(),
                u.getUpdatedAt()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfileResponseDTO getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return new UserProfileResponseDTO(
                user.getId(),
                user.getEmail(),
                user.getAddress(),
                user.getPhoneNumber(),
                user.getPaymentMethod(),
                user.getRole().toString(),
                user.getRegisteredAt(),
                user.getUpdatedAt()
        );
    }

    @Override
    @Transactional
    public UserProfileResponseDTO updateProfile(Long userId, UserProfileUpdateRequestDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setAddress(dto.getAddress());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setPaymentMethod(dto.getPaymentMethod());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        return new UserProfileResponseDTO(
                user.getId(),
                user.getEmail(),
                user.getAddress(),
                user.getPhoneNumber(),
                user.getPaymentMethod(),
                user.getRole().toString(),
                user.getRegisteredAt(),
                user.getUpdatedAt()
        );
    }

    @Override
    @Transactional
    public PasswordChangeResponseDTO changePassword(Long userId, PasswordChangeRequestDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Old password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        return new PasswordChangeResponseDTO(
                "Password changed successfully",
                user.getUpdatedAt()
        );
    }
}

