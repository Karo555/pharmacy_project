package org.example.pharmacyproject.services;


import org.example.pharmacyproject.dtos.prescriptions.PrescriptionCreateRequestDTO;
import org.example.pharmacyproject.dtos.prescriptions.PrescriptionDTO;
import org.example.pharmacyproject.dtos.prescriptions.PrescriptionUpdateRequestDTO;

import java.util.List;

public interface PrescriptionService {

    /**
     * List all prescriptions for the current user.
     */
    List<PrescriptionDTO> listAll(Long userId);

    /**
     * Fetch a single prescription by its ID for the current user.
     */
    PrescriptionDTO getById(Long userId, Long prescriptionId);

    /**
     * Create a new prescription for the current user.
     */
    PrescriptionDTO create(Long userId, PrescriptionCreateRequestDTO dto);

    /**
     * Update an existing prescription belonging to the current user.
     */
    PrescriptionDTO update(Long userId, Long prescriptionId, PrescriptionUpdateRequestDTO dto);

    /**
     * Delete a prescription by its ID for the current user.
     */
    void delete(Long userId, Long prescriptionId);
}

