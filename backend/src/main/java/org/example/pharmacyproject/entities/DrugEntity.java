package org.example.pharmacyproject.entities;
import jakarta.persistence.*;

@Entity
@Table(name="drugs", schema="pharmacy")
public class DrugEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name="id")
    private long id;

    @Basic
    @Column(name="name", nullable = false)
    private String name;

    @Basic
    @Column(name="manufacturer", nullable = false)
    private String manufacturer;

    @Basic
    @Column(name="description", nullable = false)
    private String description;

    @Basic
    @Column(name="dosage", nullable = false)
    private String dosage;

    @Basic
    @Column(name="type", nullable = false)
    private String type;

    @Basic
    @Column(name="prescriptionRequired")
    private boolean prescriptionRequired;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isPrescriptionRequired() {
        return prescriptionRequired;
    }

    public void setPrescriptionRequired(boolean prescriptionRequired) {
        this.prescriptionRequired = prescriptionRequired;
    }
}
