package org.example.pharmacyproject.dtos.prescriptions;
import java.time.LocalDateTime;

public class PrescriptionDTO {
    private Long id;
    private Long userId;
    private String drugName;
    private String dosage;
    private String frequency;
    private boolean prescriptionRequired;
    private LocalDateTime issuedAt;
    private LocalDateTime expiresAt;

    public PrescriptionDTO() {
    }

    public PrescriptionDTO(Long id, Long userId, String drugName, String dosage,
                           String frequency, boolean prescriptionRequired,
                           LocalDateTime issuedAt, LocalDateTime expiresAt) {
        this.id = id;
        this.userId = userId;
        this.drugName = drugName;
        this.dosage = dosage;
        this.frequency = frequency;
        this.prescriptionRequired = prescriptionRequired;
        this.issuedAt = issuedAt;
        this.expiresAt = expiresAt;
    }

    // — getters & setters —

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDrugName() {
        return drugName;
    }

    public void setDrugName(String drugName) {
        this.drugName = drugName;
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

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }


}