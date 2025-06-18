package org.example.pharmacyproject.services;

import org.example.pharmacyproject.dtos.drugs.DrugDTO;

import java.util.List;

public interface DrugService {
    /**
     * Retrieve all drugs.
     * @return a list of DrugDto
     */
    List<DrugDTO> listAll();

    /**
     * Retrieve a single drug by its ID.
     * @param id the ID of the drug
     * @return the corresponding DrugDto
     */
    DrugDTO getById(Long id);
}


