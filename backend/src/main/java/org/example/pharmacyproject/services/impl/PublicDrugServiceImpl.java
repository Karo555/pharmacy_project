package org.example.pharmacyproject.services.impl;

import org.example.pharmacyproject.dtos.drugs.DrugDTO;
import org.example.pharmacyproject.entities.Drug;
import org.example.pharmacyproject.repositories.DrugRepository;
import org.example.pharmacyproject.services.PublicDrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of PublicDrugService that provides limited drug information to unauthenticated users.
 */
@Service
public class PublicDrugServiceImpl implements PublicDrugService {

    private final DrugRepository drugRepository;
    private static final int MAX_PUBLIC_RESULTS = 20;

    @Autowired
    public PublicDrugServiceImpl(DrugRepository drugRepository) {
        this.drugRepository = drugRepository;
    }

    @Override
    public List<DrugDTO> listPublicDrugs() {
        return drugRepository.findAll().stream()
                .map(this::convertToPublicDTO)
                .limit(MAX_PUBLIC_RESULTS)
                .collect(Collectors.toList());
    }

    @Override
    public List<DrugDTO> searchPublicDrugs(String query) {
        if (query == null || query.trim().isEmpty()) {
            return listPublicDrugs();
        }

        String normalizedQuery = query.toLowerCase().trim();

        return drugRepository.findAll().stream()
                .filter(drug -> matchesDrugSearchCriteria(drug, normalizedQuery))
                .map(this::convertToPublicDTO)
                .limit(MAX_PUBLIC_RESULTS)
                .collect(Collectors.toList());
    }

    @Override
    public DrugDTO getPublicDrugById(Long id) {
        return drugRepository.findById(id)
                .map(this::convertToPublicDTO)
                .orElseThrow(() -> new RuntimeException("Drug not found with id: " + id));
    }

    /**
     * Converts a Drug entity to a DrugDTO with only the information suitable for public access.
     */
    private DrugDTO convertToPublicDTO(Drug drug) {
        DrugDTO dto = new DrugDTO();
        dto.setId(drug.getId());
        dto.setName(drug.getName());
        dto.setManufacturer(drug.getManufacturer());
        dto.setDescription(drug.getDescription());
        dto.setPrescriptionRequired(drug.isPrescriptionRequired());

        // Omit sensitive information like:
        // - Detailed composition
        // - Exact pricing
        // - Stock levels
        // - Internal codes

        return dto;
    }

    /**
     * Checks if a drug matches the search criteria.
     */
    private boolean matchesDrugSearchCriteria(Drug drug, String query) {
        return (drug.getName() != null && drug.getName().toLowerCase().contains(query)) ||
               (drug.getManufacturer() != null && drug.getManufacturer().toLowerCase().contains(query)) ||
               (drug.getDescription() != null && drug.getDescription().toLowerCase().contains(query));
    }
}
