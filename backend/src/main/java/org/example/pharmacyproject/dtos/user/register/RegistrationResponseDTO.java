package org.example.pharmacyproject.dtos.user.register;

import java.time.LocalDateTime;

public class RegistrationResponseDTO {
    private long id;
    private String email;
    private LocalDateTime registeredAt;
    private String role;

    public RegistrationResponseDTO() {
    }

    public RegistrationResponseDTO(long id, String email, LocalDateTime registeredAt, String role) {
        this.id = id;
        this.email = email;
        this.registeredAt = registeredAt;
        this.role = role;
    }

    public long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }


    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }


    public String getRole() {
        return role;
    }
}
