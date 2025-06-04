package org.example.pharmacyproject.dto.userLogin;

public class LoginResponseDto {
    private String token;

    public LoginResponseDto(String token) {
        this.token = token;
    }

    public LoginResponseDto() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
