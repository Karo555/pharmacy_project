package org.example.pharmacyproject.services;

import org.example.pharmacyproject.commonTypes.UserRole;
import org.example.pharmacyproject.dtos.user.login.LoginDto;
import org.example.pharmacyproject.dtos.user.login.LoginResponseDto;
import org.example.pharmacyproject.dtos.user.register.RegistrationRequestDTO;
import org.example.pharmacyproject.dtos.user.register.RegistrationResponseDTO;
import org.example.pharmacyproject.entities.AuthEntity;
import org.example.pharmacyproject.entities.UserEntity;
import org.example.pharmacyproject.repositories.AuthRepository;
import org.example.pharmacyproject.repositories.UserRepository;
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
     * Registers a new user (default USER role) and returns their basic info.
     */
    @Transactional
    public RegistrationResponseDTO register(RegistrationRequestDTO dto) {
        logger.info("Starting registration for username={}", dto.getUsername());

        // 1) Check for existing username
        if (authRepository.findByUsername(dto.getUsername()).isPresent()) {
            logger.warn("Registration failed – username already exists: {}", dto.getUsername());
            throw new IllegalArgumentException("Username already exists");
        }

        // 2) Create and save the UserEntity (holds email & name)
        UserEntity user = new UserEntity();
        user.setName(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setActive(true);
        user = userRepository.save(user);
        logger.info("Created UserEntity id={}", user.getId());

        // 3) Create and save the AuthEntity (login credentials, default role USER)
        AuthEntity auth = new AuthEntity();
        auth.setUsername(dto.getUsername());
        auth.setPassword(passwordEncoder.encode(dto.getPassword()));
        auth.setRole(UserRole.USER);
        auth.setUser(user);
        auth = authRepository.save(auth);
        logger.info("Created AuthEntity id={} for userId={}", auth.getId(), user.getId());

//        // 4) Return a response DTO
//        return new RegistrationResponseDTO(
//                user.getId(),
//                user.getEmail(),
//                user.getRegisterAt()
//        );
    }

    /**
     * Authenticates credentials and returns a JWT.
     */
    public LoginResponseDto login(LoginDto dto) {
        logger.info("Login attempt for identifier={}", dto.getUsername());

        // 1) Find user by username or email
        AuthEntity auth = authRepository.findByUsername(dto.getUsername())
                .or(() -> authRepository.findByUser_Email(dto.getUsername()))
                .orElseThrow(() -> {
                    logger.warn("Login failed – user not found for identifier={}", dto.getUsername());
                    return new IllegalArgumentException("Invalid username/email or password");
                });

        // 2) Verify password
        if (!passwordEncoder.matches(dto.getPassword(), auth.getPassword())) {
            logger.warn("Login failed – invalid password for username={}", dto.getUsername());
            throw new IllegalArgumentException("Invalid username/email or password");
        }

        // 3) Generate JWT
        String token = jwtService.generateToken(auth);
        logger.info("Login successful for username={} – issuing token", dto.getUsername());

        return new LoginResponseDto(token);
    }
}