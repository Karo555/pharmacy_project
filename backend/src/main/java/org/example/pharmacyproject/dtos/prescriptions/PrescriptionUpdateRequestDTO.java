package org.example.pharmacyproject.dtos.prescriptions;

import java.time.LocalDateTime;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PrescriptionUpdateRequestDTO {

    @NotBlank
    private String dosage;

    @NotBlank
    private String frequency;

    @NotNull
    @Future(message = "Expiry date must be in the future")
    private LocalDateTime expiresAt;
    private boolean prescriptionRequired;
    private LocalDateTime issuedAt;

    public PrescriptionUpdateRequestDTO() {}

    public PrescriptionUpdateRequestDTO(String dosage,
                                        String frequency,
                                        LocalDateTime expiresAt) {
        this.dosage = dosage;
        this.frequency = frequency;
        this.expiresAt = expiresAt;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public boolean isPrescriptionRequired() {
        return prescriptionRequired;
    }

    public void setPrescriptionRequired(boolean prescriptionRequired) {
        this.prescriptionRequired = prescriptionRequired;
    }

    public LocalDateTime getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(LocalDateTime issuedAt) {
        this.issuedAt = issuedAt;
    }
}