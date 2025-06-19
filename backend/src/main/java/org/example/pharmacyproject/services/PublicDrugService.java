package org.example.pharmacyproject.services;

import org.example.pharmacyproject.dtos.drugs.DrugDTO;

import java.util.List;

/**
 * Service interface for public drug operations.
 * These operations don't require authentication and provide limited drug information.
 */
public interface PublicDrugService {

    /**
     * List public drugs with limited information.
     *
     * @return a list of DrugDTOs with limited information
     */
    List<DrugDTO> listPublicDrugs();

    /**
     * Search public drugs by name, manufacturer, or description.
     *
     * @param query the search query
     * @return a list of matching DrugDTOs with limited information
     */
    List<DrugDTO> searchPublicDrugs(String query);

    /**
     * Get a single public drug by ID with limited information.
     *
     * @param id the drug ID
     * @return the DrugDTO with limited information
     */
    DrugDTO getPublicDrugById(Long id);
}
