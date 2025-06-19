package org.example.pharmacyproject.dtos.prescriptions;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class PrescriptionCreateRequestDTO {
    @NotNull
    private Long drugId;

    @NotBlank
    private String dosage;

    @NotBlank
    private String frequency;

    @NotBlank
    private String status;

    @NotNull @Min(0)
    private Integer refillsRemaining;

    private LocalDateTime lastRefill;
    private LocalDateTime nextRefill;

    private LocalDateTime issuedAt;
    private LocalDateTime expiresAt;



    private boolean prescriptionRequired;

    public PrescriptionCreateRequestDTO() {}

    public PrescriptionCreateRequestDTO(Long drugId,
                                        String dosage,
                                        String frequency,
                                        String status,
                                        Integer refillsRemaining,
                                        LocalDateTime lastRefill,
                                        LocalDateTime nextRefill,
                                        boolean prescriptionRequired,
                                        LocalDateTime issuedAt,
                                        LocalDateTime expiresAt) {
        this.drugId = drugId;
        this.dosage = dosage;
        this.frequency = frequency;
        this.status = status;
        this.refillsRemaining = refillsRemaining;
        this.lastRefill = lastRefill;
        this.nextRefill = nextRefill;
        this.prescriptionRequired = prescriptionRequired;
        this.issuedAt = issuedAt;
        this.expiresAt = expiresAt;
    }

    public Long getDrugId() {
        return drugId;
    }

    public void setDrugId(Long drugId) {
        this.drugId = drugId;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getRefillsRemaining() {
        return refillsRemaining;
    }

    public void setRefillsRemaining(Integer refillsRemaining) {
        this.refillsRemaining = refillsRemaining;
    }

    public LocalDateTime getLastRefill() {
        return lastRefill;
    }

    public void setLastRefill(LocalDateTime lastRefill) {
        this.lastRefill = lastRefill;
    }

    public LocalDateTime getNextRefill() {
        return nextRefill;
    }

    public void setNextRefill(LocalDateTime nextRefill) {
        this.nextRefill = nextRefill;
    }

    public boolean isPrescriptionRequired() {
        return prescriptionRequired;
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

    public void setPrescriptionRequired(boolean prescriptionRequired) {
        this.prescriptionRequired = prescriptionRequired;
    }
}