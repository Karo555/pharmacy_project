package org.example.pharmacyproject.services.impl;

import java.time.LocalDateTime;
import java.util.UUID;

import org.example.pharmacyproject.dtos.user.password.change.PasswordChangeResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.example.pharmacyproject.dtos.user.password.reset.PasswordResetRequestDTO;
import org.example.pharmacyproject.dtos.user.password.reset.PasswordResetResponseDTO;
import org.example.pharmacyproject.dtos.user.register.RegistrationRequestDTO;
import org.example.pharmacyproject.dtos.user.register.RegistrationResponseDTO;
import org.example.pharmacyproject.dtos.user.login.LoginRequestDTO;
import org.example.pharmacyproject.dtos.user.login.LoginResponseDTO;
import org.example.pharmacyproject.dtos.user.tokens.RefreshTokenRequestDTO;
import org.example.pharmacyproject.dtos.user.tokens.RefreshTokenResponseDTO;
import org.example.pharmacyproject.entities.Role;
import org.example.pharmacyproject.entities.User;
import org.example.pharmacyproject.entities.tokens.PasswordResetToken;
import org.example.pharmacyproject.entities.tokens.RefreshToken;
import org.example.pharmacyproject.repositories.PasswordResetTokenRepository;
import org.example.pharmacyproject.repositories.RefreshTokenRepository;
import org.example.pharmacyproject.repositories.UserRepository;
import org.example.pharmacyproject.services.AuthService;
import org.example.pharmacyproject.services.RoleService;
import org.example.pharmacyproject.services.TokenService;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class AuthServiceImpl implements AuthService {

    private final JavaMailSender mailSender;
    private final String frontEndUrl;
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;


    public AuthServiceImpl(JavaMailSender mailSender, @Value("${app.frontend.url}") String frontEndUrl, UserRepository userRepository,
                           RoleService roleService,
                           PasswordEncoder passwordEncoder,
                           TokenService tokenService,
                           RefreshTokenRepository refreshTokenRepository,
                           PasswordResetTokenRepository passwordResetTokenRepository) {
        this.mailSender = mailSender;
        this.frontEndUrl = frontEndUrl;
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    @Override
    @Transactional
    public RegistrationResponseDTO register(RegistrationRequestDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }
        Role defaultRole = roleService.findByName("ROLE_USER");
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(defaultRole);
        user.setRegisteredAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        User saved = userRepository.save(user);
        return new RegistrationResponseDTO(
                saved.getId(),
                saved.getEmail(),
                saved.getRegisteredAt(),
                saved.getRole().toString()
        );
    }

    @Override
    @Transactional
    public LoginResponseDTO login(LoginRequestDTO request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        String accessToken = tokenService.generateAccessToken(user);
        RefreshToken refreshToken = tokenService.createRefreshToken(user);
        LocalDateTime issuedAt = LocalDateTime.now();
        LocalDateTime expiresAt = issuedAt.plusNanos(tokenService.getClaimsFromToken(accessToken)
                .getExpiration().getTime() - issuedAt.atZone(java.time.ZoneId.systemDefault()).toInstant().toEpochMilli());
        return new LoginResponseDTO(
                user.getId(),
                user.getEmail(),
                accessToken,
                user.getRole().toString(),
                issuedAt,
                expiresAt
        );
    }

    @Override
    @Transactional
    public RefreshTokenResponseDTO refreshToken(RefreshTokenRequestDTO request) {
        RefreshToken stored = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new IllegalArgumentException("Refresh token not found"));
        if (stored.getExpiryDate().isBefore(LocalDateTime.now())) {
            refreshTokenRepository.delete(stored);
            throw new IllegalArgumentException("Refresh token expired");
        }
        User user = stored.getUser();
        String newAccessToken = tokenService.generateAccessToken(user);
        // rotate refresh token
        RefreshToken newRefresh = tokenService.createRefreshToken(user);
        refreshTokenRepository.delete(stored);
        LocalDateTime issuedAt = LocalDateTime.now();
        LocalDateTime expiresAt = issuedAt.plusNanos(tokenService.getClaimsFromToken(newAccessToken)
                .getExpiration().getTime() - issuedAt.atZone(java.time.ZoneId.systemDefault()).toInstant().toEpochMilli());
        return new RefreshTokenResponseDTO(
                newAccessToken,
                newRefresh.getToken(),
                issuedAt,
                expiresAt
        );
    }

    @Override
    @Transactional
    public PasswordResetResponseDTO requestPasswordReset(PasswordResetRequestDTO request) {
        User user = userRepository.findByEmail(request.getEmail());
        PasswordResetToken resetToken = new PasswordResetToken(
                UUID.randomUUID().toString(),
                LocalDateTime.now().plusHours(1),
                user
        );
        passwordResetTokenRepository.save(resetToken);

        // build and send reset email
        String resetLink = frontEndUrl + "/reset-password?token=" + resetToken.getToken();
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("Password Reset Request");
        email.setText("To reset your password, click the following link:\n" + resetLink);

        try {
            mailSender.send(email);
        } catch (MailException ex) {
            throw new IllegalStateException("Could not send password reset email", ex);
        }

        return new PasswordResetResponseDTO(
                "Password reset link sent to email",
                LocalDateTime.now()
        );
    }

    @Override
    @Transactional
    public PasswordChangeResponseDTO confirmPasswordReset(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid password reset token"));
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            passwordResetTokenRepository.delete(resetToken);
            throw new IllegalArgumentException("Password reset token expired");
        }
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        passwordResetTokenRepository.deleteByUser(user);
        return new PasswordChangeResponseDTO(
                "Password reset successful",
                user.getUpdatedAt()
        );
    }
}

