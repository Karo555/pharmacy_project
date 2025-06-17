package org.example.pharmacyproject.controllers;


import org.example.pharmacyproject.dtos.user.password.change.PasswordChangeRequestDTO;
import org.example.pharmacyproject.dtos.user.password.change.PasswordChangeResponseDTO;
import org.example.pharmacyproject.dtos.user.profile.UserProfileResponseDTO;
import org.example.pharmacyproject.dtos.user.profile.UserProfileUpdateRequestDTO;
import org.example.pharmacyproject.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    private final UserService userService;

    public UserProfileController(UserService userService) {
        this.userService = userService;
    }

    // Fetch current user profile
    @GetMapping
    public ResponseEntity<UserProfileResponseDTO> getProfile(
            @AuthenticationPrincipal(expression = "id") Long userId) {
        return ResponseEntity.ok(userService.getProfile(userId));
    }

    // Update profile fields (address, phone, payment)
    @PutMapping
    public ResponseEntity<UserProfileResponseDTO> updateProfile(
            @AuthenticationPrincipal(expression = "id") Long userId,
            @Valid @RequestBody UserProfileUpdateRequestDTO dto) {
        return ResponseEntity.ok(userService.updateProfile(userId, dto));
    }

    // Change password when logged in
    @PostMapping("/password")
    public ResponseEntity<PasswordChangeResponseDTO> changePassword(
            @AuthenticationPrincipal(expression = "id") Long userId,
            @Valid @RequestBody PasswordChangeRequestDTO request) {
        return ResponseEntity.ok(userService.changePassword(userId, request));
    }
}