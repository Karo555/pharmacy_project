package org.example.pharmacyproject.dtos.user.login;

import java.time.LocalDateTime;

public class LoginResponseDTO {
    private long id;
    private String email;
    private String token;
    private String role;
    private LocalDateTime issuedAt;
    private LocalDateTime expiresAt;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(long id, String email, String token, String role, LocalDateTime issuedAt, LocalDateTime expiresAt) {
        this.id = id;
        this.email = email;
        this.token = token;
        this.role = role;
        this.issuedAt = issuedAt;
        this.expiresAt = expiresAt;
    }

    public long getId() {
        return id;
    }


    public String getEmail() {
        return email;
    }


    public String getToken() {
        return token;
    }


    public String getRole() {
        return role;
    }

    public LocalDateTime getIssuedAt() {
        return issuedAt;
    }


    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }
}
