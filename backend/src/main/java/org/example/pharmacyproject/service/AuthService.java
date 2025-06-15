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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            AuthRepository authRepository,
            UserRepository userRepository,
            JwtService jwtService,
            PasswordEncoder passwordEncoder
    ) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registers a new user and returns their basic info.
     */
    @Transactional
    public RegisterResponseDto register(RegisterDto dto) {
        logger.info("Starting registration for username={}", dto.getUsername());

        // 1) Check for existing username
        if (authRepository.findByUsername(dto.getUsername()).isPresent()) {
            logger.warn("Registration failed – username already exists: {}", dto.getUsername());
            throw new IllegalArgumentException("Username already exists");
        }

        // 2) Create and save the UserEntity (holds email & name if needed)
        UserEntity user = new UserEntity();
        user.setEmail(dto.getEmail());
        user.setActive(true);       // make sure it's set
        user = userRepository.save(user);
        logger.info("Created UserEntity id={}", user.getId());

        // 3) Create and save the AuthEntity (login credentials)
        AuthEntity auth = new AuthEntity();
        auth.setUsername(dto.getUsername());
        auth.setPassword(passwordEncoder.encode(dto.getPassword()));
        auth.setRole(dto.getRole());
        auth.setUser(user);
        auth = authRepository.save(auth);
        logger.info("Created AuthEntity id={} for userId={}", auth.getId(), user.getId());

        // 4) Return a response DTO (note: RegisterResponseDto expects userId, username, role)
        return new RegisterResponseDto(
                user.getId(),
                auth.getUsername(),
                auth.getRole()
        );
    }

    /**
     * Authenticates credentials and returns a JWT.
     */
    public LoginResponseDto login(LoginDto dto) {
        logger.info("Login attempt for username={}", dto.getUsername());

        // 1) Lookup AuthEntity by username
        AuthEntity auth = authRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> {
                    logger.warn("Login failed – user not found: {}", dto.getUsername());
                    return new IllegalArgumentException("Invalid username or password");
                });

        // 2) Verify password
        if (!passwordEncoder.matches(dto.getPassword(), auth.getPassword())) {
            logger.warn("Login failed – invalid password for username={}", dto.getUsername());
            throw new IllegalArgumentException("Invalid username or password");
        }

        // 3) Generate JWT
        String token = jwtService.generateToken(auth);
        logger.info("Login successful for username={} – issuing token", dto.getUsername());

        return new LoginResponseDto(token);
    }
}