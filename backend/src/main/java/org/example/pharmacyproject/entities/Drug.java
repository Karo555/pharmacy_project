package org.example.pharmacyproject.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "drugs")
public class Drug {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String manufacturer;

    @Column(nullable = false)
    private String dosage;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(name = "prescription_required", nullable = false)
    private boolean prescriptionRequired;


    protected Drug() { }

    public Drug(Long id, String name, String type, String manufacturer, String dosage, String description, boolean prescriptionRequired) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.manufacturer = manufacturer;
        this.dosage = dosage;
        this.description = description;
        this.prescriptionRequired = prescriptionRequired;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getType() { return type; }
    public String getManufacturer() { return manufacturer; }
    public String getDosage() { return dosage; }
    public String getDescription() { return description; }
    public boolean isPrescriptionRequired() { return prescriptionRequired; }
}

