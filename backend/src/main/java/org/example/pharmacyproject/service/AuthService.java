package org.example.pharmacyproject.service;

import org.example.pharmacyproject.dto.userLogin.LoginDto;
import org.example.pharmacyproject.dto.userLogin.LoginResponseDto;
import org.example.pharmacyproject.dto.userRegister.RegisterDto;
import org.example.pharmacyproject.dto.userRegister.RegisterResponseDto;
import org.example.pharmacyproject.infrastructure.entity.AuthEntity;
import org.example.pharmacyproject.infrastructure.entity.UserEntity;
import org.example.pharmacyproject.infrastructure.repository.AuthRepository;
import org.example.pharmacyproject.infrastructure.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(AuthRepository authRepository, UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder ) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public RegisterResponseDto register(RegisterDto dto){
        logger.info("Starting user registration process for username: {}", dto.getUsername());

        try {
            // Check if username already exists
            if (authRepository.findByUsername(dto.getUsername()).isPresent()) {
                logger.warn("Registration failed: Username already exists: {}", dto.getUsername());
                throw new RuntimeException("Username already exists");
            }

            UserEntity userEntity = new UserEntity();
            userEntity.setEmail(dto.getEmail());

            try {
                logger.debug("Saving user entity with email: {}", dto.getEmail());
                userRepository.save(userEntity);
                logger.info("User entity saved successfully with ID: {}", userEntity.getId());
            } catch (Exception e) {
                logger.error("Failed to save user entity: {}", e.getMessage());
                throw new RuntimeException("Failed to save user data", e);
            }

            AuthEntity authEntity = new AuthEntity();
            authEntity.setUsername(dto.getUsername());
            authEntity.setPassword(passwordEncoder.encode(dto.getPassword()));
            authEntity.setRole(dto.getRole());
            authEntity.setUser(userEntity);

            try {
                logger.debug("Saving auth entity with username: {}", dto.getUsername());
                authRepository.save(authEntity);
                logger.info("Auth entity saved successfully with ID: {}", authEntity.getId());
            } catch (Exception e) {
                logger.error("Failed to save auth entity: {}", e.getMessage());
                throw new RuntimeException("Failed to save authentication data", e);
            }

            logger.info("User registration completed successfully for username: {} with role: {}", 
                       authEntity.getUsername(), authEntity.getRole());

            return new RegisterResponseDto(authEntity.getId(), authEntity.getUsername(), authEntity.getRole());
        } catch (Exception e) {
            logger.error("Error during registration process: {}", e.getMessage());
            throw e;
        }
    }


//    @PreAuthorize("hasRole('ADMIN')")
    public LoginResponseDto login(LoginDto dto){
        logger.info("Processing login request for username: {}", dto.getUsername());

        try {
            AuthEntity authEntity = authRepository.findByUsername(dto.getUsername()).orElseThrow(() -> {
                logger.warn("Login failed: User not found with username: {}", dto.getUsername());
                return new RuntimeException("User not found");
            });

            if (authEntity == null) {
                logger.warn("Login failed: User not found with username: {}", dto.getUsername());
                throw new RuntimeException("User not found");
            }

            if (!passwordEncoder.matches(dto.getPassword(), authEntity.getPassword())) {
                logger.warn("Login failed: Invalid password for username: {}", dto.getUsername());
                throw new RuntimeException("Invalid password");
            }

            String token = jwtService.generateToken(authEntity);
            logger.info("Login successful for username: {} with role: {}", authEntity.getUsername(), authEntity.getRole());

            return new LoginResponseDto(token);
        } catch (Exception e) {
            logger.error("Error during login process: {}", e.getMessage());
            throw e;
        }
    }
}
