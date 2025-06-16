package org.example.pharmacyproject.config;

import org.example.pharmacyproject.infrastructure.entity.DrugEntity;
import org.example.pharmacyproject.infrastructure.repository.DrugRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner loadSampleDrugs(DrugRepository drugRepository) {
        return args -> {
            if (drugRepository.count() == 0) {
                List<DrugEntity> samples = List.of(
                        create("Aspirin", "Bayer", "Pain relief and anti-inflammatory", "500mg", "Tablet", false),
                        create("Paracetamol", "Tylenol", "Fever reducer and pain reliever", "500mg", "Tablet", false),
                        create("Amoxicillin", "GSK", "Broad-spectrum antibiotic", "250mg", "Capsule", true),
                        create("Ibuprofen", "Advil", "Ibuprofen for pain and inflammation", "200mg", "Tablet", false),
                        create("Cetirizine", "Zyrtec", "Non-drowsy antihistamine", "10mg", "Tablet", false),
                        create("Metformin", "Merck", "Type 2 diabetes management", "500mg", "Tablet", true)
                );
                drugRepository.saveAll(samples);
            }
        };
    }

    private DrugEntity create(String name,
                              String manufacturer,
                              String description,
                              String dosage,
                              String type,
                              boolean prescriptionRequired) {
        DrugEntity d = new DrugEntity();
        d.setName(name);
        d.setManufacturer(manufacturer);
        d.setDescription(description);
        d.setDosage(dosage);
        d.setType(type);
        d.setPrescriptionRequired(prescriptionRequired);
        return d;
    }
}