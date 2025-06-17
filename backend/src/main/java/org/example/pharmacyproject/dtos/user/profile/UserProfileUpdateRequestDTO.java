package org.example.pharmacyproject.dtos.user.profile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserProfileUpdateRequestDTO {
    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Phone number is required")
    @Size(min = 7, max = 20)
    private String phoneNumber;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod;

    public UserProfileUpdateRequestDTO() {}

    public UserProfileUpdateRequestDTO(String address,
                                       String phoneNumber,
                                       String paymentMethod) {
        this.address       = address;
        this.phoneNumber   = phoneNumber;
        this.paymentMethod = paymentMethod;
    }

    public String getAddress()       { return address; }
    public void setAddress(String a) { this.address = a; }

    public String getPhoneNumber()         { return phoneNumber; }
    public void setPhoneNumber(String pn)  { this.phoneNumber = pn; }

    public String getPaymentMethod()            { return paymentMethod; }
    public void setPaymentMethod(String pm)     { this.paymentMethod = pm; }
}