package org.example.pharmacyproject.dtos.user.register;

import org.example.pharmacyproject.commonTypes.UserRole;

public class RegistrationResponseDTO {
    private long userId;
    private String username;
    private UserRole role;

    public RegistrationResponseDTO(long userId, String username, UserRole role) {
        this.userId = userId;
        this.username = username;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}
