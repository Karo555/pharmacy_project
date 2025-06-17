package org.example.pharmacyproject.controllers;

import org.example.pharmacyproject.dtos.user.password.change.PasswordChangeResponseDTO;
import org.example.pharmacyproject.dtos.user.password.reset.PasswordResetConfirmDTO;
import org.example.pharmacyproject.dtos.user.password.reset.PasswordResetRequestDTO;
import org.example.pharmacyproject.dtos.user.password.reset.PasswordResetResponseDTO;
import org.example.pharmacyproject.dtos.user.register.RegistrationRequestDTO;
import org.example.pharmacyproject.dtos.user.register.RegistrationResponseDTO;
import org.example.pharmacyproject.dtos.user.login.LoginRequestDTO;
import org.example.pharmacyproject.dtos.user.login.LoginResponseDTO;
import org.example.pharmacyproject.dtos.user.tokens.RefreshTokenRequestDTO;
import org.example.pharmacyproject.dtos.user.tokens.RefreshTokenResponseDTO;
import org.example.pharmacyproject.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponseDTO> register(
            @Valid @RequestBody RegistrationRequestDTO request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<RefreshTokenResponseDTO> refresh(
            @Valid @RequestBody RefreshTokenRequestDTO request) {
        return ResponseEntity.ok(authService.refreshToken(request));
    }

    @PostMapping("/password/reset")
    public ResponseEntity<PasswordResetResponseDTO> resetPassword(
            @Valid @RequestBody PasswordResetRequestDTO request) {
        return ResponseEntity.ok(authService.requestPasswordReset(request));
    }

    @PostMapping("/password/reset/confirm")
    public ResponseEntity<PasswordChangeResponseDTO> confirmReset(
            @Valid @RequestBody PasswordResetConfirmDTO request) {
        PasswordChangeResponseDTO result = authService.confirmPasswordReset(
                request.getToken(),
                request.getNewPassword()
        );
        return ResponseEntity.ok(result);
    }
}