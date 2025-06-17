package org.example.pharmacyproject.entities;

import jakarta.persistence.*;
import org.example.pharmacyproject.entities.tokens.PasswordResetToken;
import org.example.pharmacyproject.entities.tokens.RefreshToken;
import org.example.pharmacyproject.entities.Role;

import java.util.List;
import java.time.LocalDateTime;
import static jakarta.persistence.CascadeType.ALL;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                          // ↳ RegistrationResponseDTO.id, LoginResponseDTO.id, UserProfileResponseDTO.id

    @Column(nullable = false, unique = true)
    private String email;                     // ↳ all request/response DTOs

    @Column(nullable = false)
    private String password;                  // ↳ RegistrationRequestDTO.password, LoginRequestDTO.password

    @Column
    private String address;                   // ↳ UserProfileUpdateRequestDTO, UserProfileResponseDTO

    @Column(name = "phone_number")
    private String phoneNumber;               // ↳ UserProfileUpdateRequestDTO, UserProfileResponseDTO

    @Column(name = "payment_method")
    private String paymentMethod;             // ↳ UserProfileUpdateRequestDTO, UserProfileResponseDTO

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;                        // ↳ RegistrationResponseDTO.role, LoginResponseDTO.role, UserProfileResponseDTO.role                     // ↳ RegistrationResponseDTO.role, LoginResponseDTO.role, UserProfileResponseDTO.role

    @Column(name = "registered_at", updatable = false)
    private LocalDateTime registeredAt;       // ↳ RegistrationResponseDTO.registeredAt, UserProfileResponseDTO.registeredAt

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;          // ↳ UserProfileResponseDTO.updatedAt

    @OneToMany(mappedBy="user", cascade=ALL, orphanRemoval=true)
    private List<RefreshToken> refreshTokens;

    @OneToMany(mappedBy="user", cascade=ALL, orphanRemoval=true)
    private List<PasswordResetToken> passwordResetTokens;

    public User() {
    }

    public User(Long id, String email, String password, String address, String phoneNumber, String paymentMethod, Role role, LocalDateTime registeredAt, LocalDateTime updatedAt, List<RefreshToken> refreshTokens, List<PasswordResetToken> passwordResetTokens) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.paymentMethod = paymentMethod;
        this.role = role;
        this.registeredAt = registeredAt;
        this.updatedAt = updatedAt;
        this.refreshTokens = refreshTokens;
        this.passwordResetTokens = passwordResetTokens;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(LocalDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<RefreshToken> getRefreshTokens() {
        return refreshTokens;
    }

    public void setRefreshTokens(List<RefreshToken> refreshTokens) {
        this.refreshTokens = refreshTokens;
    }

    public List<PasswordResetToken> getPasswordResetTokens() {
        return passwordResetTokens;
    }

    public void setPasswordResetTokens(List<PasswordResetToken> passwordResetTokens) {
        this.passwordResetTokens = passwordResetTokens;
    }
}

