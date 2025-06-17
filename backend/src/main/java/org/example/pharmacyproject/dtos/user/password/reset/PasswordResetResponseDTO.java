package org.example.pharmacyproject.dtos.user.password.reset;

import java.time.LocalDateTime;

public class PasswordResetResponseDTO {

    private final String message;
    private final LocalDateTime timestamp;

    public PasswordResetResponseDTO(String message, LocalDateTime timestamp) {
        this.message   = message;
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}

