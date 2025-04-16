package org.example.pharmacyproject.service;

import org.example.pharmacyproject.commonTypes.UserRole;
import org.example.pharmacyproject.controller.dto.LoginDto;
import org.example.pharmacyproject.controller.dto.LoginResponseDto;
import org.example.pharmacyproject.controller.dto.RegisterDto;
import org.example.pharmacyproject.controller.dto.RegisterResponseDto;
import org.example.pharmacyproject.infrastructure.entity.AuthEntity;
import org.example.pharmacyproject.infrastructure.entity.UserEntity;
import org.example.pharmacyproject.infrastructure.repository.AuthRepository;
import org.example.pharmacyproject.infrastructure.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Autowired
    public AuthService(AuthRepository authRepository, UserRepository userRepository, JwtService jwtService) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public RegisterResponseDto register(RegisterDto dto){
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(dto.getEmail());
        UserEntity createdUser = userRepository.save(userEntity);

        AuthEntity authEntity = new AuthEntity();
        authEntity.setUsername(dto.getUsername());
        authEntity.setPassword(dto.getPassword());
        authEntity.setRole(dto.getRole());
        authEntity.setUser(createdUser);
        AuthEntity createdAuth = authRepository.save(authEntity);

        return new RegisterResponseDto(createdAuth.getUsername(), createdAuth.getRole());
    }

    public LoginResponseDto login(LoginDto dto){
        AuthEntity authEntity = authRepository.findByUsername(dto.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

        if (authEntity == null) {
            throw new RuntimeException("User not found");
        }

        if (!authEntity.getPassword().equals(dto.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        String token = jwtService.generateToken(authEntity);

        return new LoginResponseDto(token);
    }
}