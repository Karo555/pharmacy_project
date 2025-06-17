package org.example.pharmacyproject.dtos.user.tokens;

import java.time.LocalDateTime;

public class RefreshTokenResponseDTO {

    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private LocalDateTime issuedAt;
    private LocalDateTime expiresAt;

    public RefreshTokenResponseDTO() {}

    public RefreshTokenResponseDTO(String accessToken, String refreshToken,
                                   LocalDateTime issuedAt, LocalDateTime expiresAt) {
        this.accessToken  = accessToken;
        this.refreshToken = refreshToken;
        this.issuedAt     = issuedAt;
        this.expiresAt    = expiresAt;
    }

    public String getAccessToken() {
        return accessToken;
    }


    public String getRefreshToken() {
        return refreshToken;
    }


    public String getTokenType() {
        return tokenType;
    }

    public LocalDateTime getIssuedAt() {
        return issuedAt;
    }


    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }
}

