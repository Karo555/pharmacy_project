package org.example.pharmacyproject.infrastructure.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "users", schema = "pharmacy")
public class UserEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    @Basic
    private String name;

    @Column(name = "email")
    @Basic
    private String email;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private AuthEntity auth;

    public UserEntity(Long id, String name, String email, AuthEntity auth) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.auth = auth;
    }

    public UserEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public AuthEntity getAuth() {
        return auth;
    }

    public void setAuth(AuthEntity auth) {
        this.auth = auth;
    }
}
