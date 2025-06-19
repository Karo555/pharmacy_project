package org.example.pharmacyproject.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "prescriptions")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Who this prescription belongs to
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Which drug is prescribed
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "drug_id", nullable = false)
    private Drug drug;

    // Dosage instructions, e.g. "500mg"
    @Column(nullable = false)
    private String dosage;

    // Frequency instructions, e.g. "Twice daily"
    @Column(nullable = false)
    private String frequency;

    // Prescription status: e.g. ACTIVE, EXPIRED
    @Column(nullable = false)
    private String status;

    // How many refills remain
    @Column(name = "refills_remaining", nullable = false)
    private Integer refillsRemaining;

    // Date of last refill
    @Column(name = "last_refill")
    private LocalDate lastRefill;

    // Date of next allowable refill
    @Column(name = "next_refill")
    private LocalDate nextRefill;

    // --- NEW FIELDS FOR DTO MAPPING ---

    /** Whether this prescription still requires a valid prescription */
    @Column(name = "prescription_required", nullable = false)
    private Boolean prescriptionRequired;

    /** When this prescription was issued */
    @Column(name = "issued_at", nullable = false)
    private LocalDateTime issuedAt;

    /** When this prescription expires */
    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    // Standard no-args constructor for JPA
    public Prescription() {}

    // Convenience constructor
    public Prescription(User user,
                        Drug drug,
                        String dosage,
                        String frequency,
                        String status,
                        Integer refillsRemaining,
                        LocalDate lastRefill,
                        LocalDate nextRefill,
                        Boolean prescriptionRequired,
                        LocalDateTime issuedAt,
                        LocalDateTime expiresAt) {
        this.user = user;
        this.drug = drug;
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

    // --- Getters & setters ---

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public Drug getDrug() {
        return drug;
    }
    public void setDrug(Drug drug) {
        this.drug = drug;
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

    public LocalDate getLastRefill() {
        return lastRefill;
    }
    public void setLastRefill(LocalDate lastRefill) {
        this.lastRefill = lastRefill;
    }

    public LocalDate getNextRefill() {
        return nextRefill;
    }
    public void setNextRefill(LocalDate nextRefill) {
        this.nextRefill = nextRefill;
    }

    // --- New getters & setters for DTO fields ---

    public Boolean getPrescriptionRequired() {
        return prescriptionRequired;
    }
    public void setPrescriptionRequired(Boolean prescriptionRequired) {
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

    public boolean isPrescriptionRequired() {
        return prescriptionRequired;
    }

}