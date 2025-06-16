package org.example.pharmacyproject.dto.drugs;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreateDrugDto {
    @NotBlank(message = "Name is required")
    @Size(max = 255, message = "Name must be at most 255 characters")
    private String name;

    @NotBlank(message = "Manufacturer is required")
    @Size(max = 255, message = "Manufacturer must be at most 255 characters")
    private String manufacturer;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Dosage is required")
    private String dosage;

    @NotBlank(message = "Type is required")
    private String type;

    private boolean prescriptionRequired;

    public CreateDrugDto(String name,
                         String manufacturer,
                         String description,
                         String dosage,
                         String type,
                         boolean prescriptionRequired) {
        this.name = name;
        this.manufacturer = manufacturer;
        this.description = description;
        this.dosage = dosage;
        this.type = type;
        this.prescriptionRequired = prescriptionRequired;
    }

    public CreateDrugDto() {
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
