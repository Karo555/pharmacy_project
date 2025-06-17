package org.example.pharmacyproject.dtos.errors;

import java.time.LocalDateTime;

public class ErrorResponseDTO {
    private final int status;
    private final String message;
    private final LocalDateTime timestamp;
    private final String path;

    public ErrorResponseDTO(int status, String message, LocalDateTime timestamp, String path) {
        this.status    = status;
        this.message   = message;
        this.timestamp = timestamp;
        this.path      = path;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getPath() {
        return path;
    }
}

