// File: backend/src/main/java/org/example/pharmacyproject/controller/AuthController.java
package org.example.pharmacyproject.controllers;

import jakarta.validation.Valid;
import org.example.pharmacyproject.dtos.user.login.LoginResponseDTO;
import org.example.pharmacyproject.dtos.user.register.RegistrationRequestDTO;
import org.example.pharmacyproject.dtos.user.register.RegistrationResponseDTO;
import org.example.pharmacyproject.dtos.UserDto;
import org.example.pharmacyproject.entities.AuthEntity;
import org.example.pharmacyproject.repositories.AuthRepository;
import org.example.pharmacyproject.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class AuthController {

//    private final AuthService authService;
//    private final AuthRepository authRepository;
//
//    public AuthController(AuthService authService,
//                          AuthRepository authRepository) {
//        this.authService = authService;
//        this.authRepository = authRepository;
//    }

//    @PostMapping("/register")
//    public ResponseEntity<RegistrationResponseDTO> register(
//            @Valid @RequestBody RegistrationRequestDTO requestBody) {
//        RegistrationResponseDTO dto = authService.register(requestBody);
//        return ResponseEntity.status(201).body(dto);
//    }

//    @PostMapping("/login")
//    public ResponseEntity<LoginResponseDTO> login(
//            @Valid @RequestBody LoginDto requestBody) {
//        LoginResponseDTO dto = authService.login(requestBody);
//        return ResponseEntity.ok(dto);
//    }

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