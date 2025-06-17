package org.example.pharmacyproject.entities.tokens;

import jakarta.persistence.*;
import org.example.pharmacyproject.entities.User;

import java.time.LocalDateTime;

@Entity
@Table(name = "refresh_tokens")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;                  // the random refresh token

    @Column(nullable = false)
    private LocalDateTime expiryDate;      // when it becomes invalid

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;                     // owner

    protected RefreshToken() {}            // for JPA

    public RefreshToken(String token, LocalDateTime expiryDate, User user) {
        this.token      = token;
        this.expiryDate = expiryDate;
        this.user       = user;
    }

    public Long getId() { return id; }
    public String getToken() { return token; }
    public LocalDateTime getExpiryDate() { return expiryDate; }
    public User getUser() { return user; }
}

