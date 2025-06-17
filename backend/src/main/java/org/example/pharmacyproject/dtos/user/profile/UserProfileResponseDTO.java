package org.example.pharmacyproject.dtos.user.profile;

import java.time.LocalDateTime;

public class UserProfileResponseDTO {
    private final long id;
    private final String email;
    private final String address;
    private final String phoneNumber;
    private final String paymentMethod;
    private final String role;
    private final LocalDateTime registeredAt;
    private final LocalDateTime updatedAt;

    public UserProfileResponseDTO(long id,
                                  String email,
                                  String address,
                                  String phoneNumber,
                                  String paymentMethod,
                                  String role,
                                  LocalDateTime registeredAt,
                                  LocalDateTime updatedAt) {
        this.id             = id;
        this.email          = email;
        this.address        = address;
        this.phoneNumber    = phoneNumber;
        this.paymentMethod  = paymentMethod;
        this.role           = role;
        this.registeredAt   = registeredAt;
        this.updatedAt      = updatedAt;
    }

    public long getId()                   { return id; }
    public String getEmail()              { return email; }
    public String getAddress()            { return address; }
    public String getPhoneNumber()        { return phoneNumber; }
    public String getPaymentMethod()      { return paymentMethod; }
    public String getRole()               { return role; }
    public LocalDateTime getRegisteredAt(){ return registeredAt; }
    public LocalDateTime getUpdatedAt()   { return updatedAt; }
}

