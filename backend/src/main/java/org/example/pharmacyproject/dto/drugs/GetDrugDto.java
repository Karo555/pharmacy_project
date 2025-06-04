package org.example.pharmacyproject.dto.drugs;

public class GetDrugDto {

    private long id;
    private String name;
    private String manufacturer;
    private String description;
    private String dosage;
    private String type;
    private boolean prescriptionRequired;


    public GetDrugDto(long id, String name, String manufacturer, String description, String dosage, String type, boolean prescriptionRequired) {
        this.id = id;
        this.name = name;
        this.manufacturer = manufacturer;
        this.description = description;
        this.dosage = dosage;
        this.type = type;
        this.prescriptionRequired = prescriptionRequired;
    }

    public GetDrugDto() {
    }

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
