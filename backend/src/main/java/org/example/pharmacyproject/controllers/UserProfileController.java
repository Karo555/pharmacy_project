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

    // Fetch current user profile by email from the JWT
    @GetMapping
    public ResponseEntity<UserProfileResponseDTO> getProfile(
            @AuthenticationPrincipal(expression = "username") String email) {
        UserProfileResponseDTO profile = userService.getProfileByEmail(email);
        return ResponseEntity.ok(profile);
    }

    // Update profile fields (address, phone, payment) by email
    @PutMapping
    public ResponseEntity<UserProfileResponseDTO> updateProfile(
            @AuthenticationPrincipal(expression = "username") String email,
            @Valid @RequestBody UserProfileUpdateRequestDTO dto) {
        UserProfileResponseDTO updated = userService.updateProfileByEmail(email, dto);
        return ResponseEntity.ok(updated);
    }

    // Change password when logged in
    @PostMapping("/password")
    public ResponseEntity<PasswordChangeResponseDTO> changePassword(
            @AuthenticationPrincipal(expression = "id") Long userId,
            @Valid @RequestBody PasswordChangeRequestDTO request) {
        return ResponseEntity.ok(userService.changePassword(userId, request));
    }
}