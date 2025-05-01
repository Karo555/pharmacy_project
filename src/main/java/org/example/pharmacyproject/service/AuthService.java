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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthService(AuthRepository authRepository, UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public RegisterResponseDto register(RegisterDto dto){
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(dto.getEmail());
        userRepository.save(userEntity);

        AuthEntity authEntity = new AuthEntity();
        authEntity.setUsername(dto.getUsername());
        authEntity.setPassword(passwordEncoder.encode(dto.getPassword()));
        authEntity.setRole(dto.getRole());
        authEntity.setUser(userEntity);

        authRepository.save(authEntity);

        return new RegisterResponseDto(authEntity.getId(), authEntity.getUsername(), authEntity.getRole());
    }

    public LoginResponseDto login(LoginDto dto){
        AuthEntity authEntity = authRepository.findByUsername(dto.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

        if (authEntity == null) {
            throw new RuntimeException("User not found");
        }

        if (!passwordEncoder.matches(dto.getPassword(), authEntity.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(authEntity);

        return new LoginResponseDto(token);
    }

    public AuthenticationManager getAuthenticationManager() {
        return authenticationManager;
    }
}