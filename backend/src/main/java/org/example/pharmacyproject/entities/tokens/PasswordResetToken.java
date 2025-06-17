package org.example.pharmacyproject.entities.tokens;

import jakarta.persistence.*;
import org.example.pharmacyproject.entities.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;                    // one-time reset token

    @Column(nullable = false)
    private LocalDateTime expiryDate;        // when this token expires

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;                       // associated user

    protected PasswordResetToken() {}         // for JPA

    public PasswordResetToken(String token,
                              LocalDateTime expiryDate,
                              User user) {
        this.token      = token;
        this.expiryDate = expiryDate;
        this.user       = user;
    }

    public Long getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public User getUser() {
        return user;
    }
}
