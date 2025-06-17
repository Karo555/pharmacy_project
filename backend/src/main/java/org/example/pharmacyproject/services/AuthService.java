package org.example.pharmacyproject.services;

import org.example.pharmacyproject.dtos.user.password.change.PasswordChangeResponseDTO;
import org.example.pharmacyproject.dtos.user.password.reset.PasswordResetRequestDTO;
import org.example.pharmacyproject.dtos.user.password.reset.PasswordResetResponseDTO;
import org.example.pharmacyproject.dtos.user.register.RegistrationRequestDTO;
import org.example.pharmacyproject.dtos.user.register.RegistrationResponseDTO;
import org.example.pharmacyproject.dtos.user.login.LoginRequestDTO;
import org.example.pharmacyproject.dtos.user.login.LoginResponseDTO;
import org.example.pharmacyproject.dtos.user.tokens.RefreshTokenRequestDTO;
import org.example.pharmacyproject.dtos.user.tokens.RefreshTokenResponseDTO;

public interface AuthService {

    RegistrationResponseDTO register(RegistrationRequestDTO request);

    LoginResponseDTO login(LoginRequestDTO request);

    RefreshTokenResponseDTO refreshToken(RefreshTokenRequestDTO request);

    PasswordResetResponseDTO requestPasswordReset(PasswordResetRequestDTO request);
    PasswordChangeResponseDTO confirmPasswordReset(String token, String newPassword);

}