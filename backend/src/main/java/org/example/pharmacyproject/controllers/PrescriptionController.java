package org.example.pharmacyproject.controllers;

import org.example.pharmacyproject.dtos.prescriptions.PrescriptionCreateRequestDTO;
import org.example.pharmacyproject.dtos.prescriptions.PrescriptionDTO;
import org.example.pharmacyproject.dtos.prescriptions.PrescriptionUpdateRequestDTO;
import org.example.pharmacyproject.services.PrescriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    /** List all prescriptions for the current user */
    @GetMapping
    public ResponseEntity<List<PrescriptionDTO>> listAll(
            @AuthenticationPrincipal(expression = "id") Long userId) {
        List<PrescriptionDTO> all = prescriptionService.listAll(userId);
        return ResponseEntity.ok(all);
    }

    /** Get a single prescription by ID for the current user */
    @GetMapping("/{id}")
    public ResponseEntity<PrescriptionDTO> getById(
            @AuthenticationPrincipal(expression = "id") Long userId,
            @PathVariable("id") Long prescriptionId) {
        PrescriptionDTO dto = prescriptionService.getById(userId, prescriptionId);
        return ResponseEntity.ok(dto);
    }

    /** Create a new prescription for the current user */
    @PostMapping
    public ResponseEntity<PrescriptionDTO> create(
            @AuthenticationPrincipal(expression = "id") Long userId,
            @Valid @RequestBody PrescriptionCreateRequestDTO request) {
        PrescriptionDTO created = prescriptionService.create(userId, request);
        return ResponseEntity.ok(created);
    }

    /** Update an existing prescription for the current user */
    @PutMapping("/{id}")
    public ResponseEntity<PrescriptionDTO> update(
            @AuthenticationPrincipal(expression = "id") Long userId,
            @PathVariable("id") Long prescriptionId,
            @Valid @RequestBody PrescriptionUpdateRequestDTO request) {
        PrescriptionDTO updated = prescriptionService.update(userId, prescriptionId, request);
        return ResponseEntity.ok(updated);
    }

    /** Delete a prescription by ID for the current user */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal(expression = "id") Long userId,
            @PathVariable("id") Long prescriptionId) {
        prescriptionService.delete(userId, prescriptionId);
        return ResponseEntity.noContent().build();
    }
}