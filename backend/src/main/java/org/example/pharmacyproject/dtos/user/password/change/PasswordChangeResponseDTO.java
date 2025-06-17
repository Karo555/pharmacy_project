package org.example.pharmacyproject.dtos.user.password.change;

import java.time.LocalDateTime;

public class PasswordChangeResponseDTO {

    private final String message;
    private final LocalDateTime updatedAt;

    public PasswordChangeResponseDTO(String message, LocalDateTime updatedAt) {
        this.message   = message;
        this.updatedAt = updatedAt;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}

