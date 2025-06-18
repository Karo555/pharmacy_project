package org.example.pharmacyproject.dtos.drugs;

public class DrugDTO {
    private Long id;
    private String name;
    private String type;
    private String manufacturer;
    private String dosage;
    private String description;
    private boolean prescriptionRequired;

    public DrugDTO() {}

    public DrugDTO(Long id,
                   String name,
                   String type,
                   String manufacturer,
                   String dosage,
                   String description,
                   boolean prescriptionRequired) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.manufacturer = manufacturer;
        this.dosage = dosage;
        this.description = description;
        this.prescriptionRequired = prescriptionRequired;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isPrescriptionRequired() {
        return prescriptionRequired;
    }

    public void setPrescriptionRequired(boolean prescriptionRequired) {
        this.prescriptionRequired = prescriptionRequired;
    }
}