// File: backend/src/main/java/org/example/pharmacyproject/controller/AuthController.java
package org.example.pharmacyproject.controller;

import jakarta.validation.Valid;
import org.example.pharmacyproject.dto.userLogin.LoginDto;
import org.example.pharmacyproject.dto.userLogin.LoginResponseDto;
import org.example.pharmacyproject.dto.userRegister.RegisterDto;
import org.example.pharmacyproject.dto.userRegister.RegisterResponseDto;
import org.example.pharmacyproject.dto.UserDto;
import org.example.pharmacyproject.infrastructure.entity.AuthEntity;
import org.example.pharmacyproject.infrastructure.repository.AuthRepository;
import org.example.pharmacyproject.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;
    private final AuthRepository authRepository;

    public AuthController(AuthService authService,
                          AuthRepository authRepository) {
        this.authService = authService;
        this.authRepository = authRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(
            @Valid @RequestBody RegisterDto requestBody) {
        RegisterResponseDto dto = authService.register(requestBody);
        return ResponseEntity.status(201).body(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(
            @Valid @RequestBody LoginDto requestBody) {
        LoginResponseDto dto = authService.login(requestBody);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> me(Authentication authentication) {
        String username = authentication.getName();
        AuthEntity auth = authRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserDto dto = new UserDto(
                auth.getUser().getId(),
                auth.getUser().getName(),
                auth.getUser().getEmail(),
                auth.getRole()
        );
        return ResponseEntity.ok(dto);
    }
}