package org.example.pharmacyproject.controllers;

import lombok.RequiredArgsConstructor;
import org.example.pharmacyproject.dtos.drugs.DrugDTO;
import org.example.pharmacyproject.services.DrugService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drugs")
public class DrugController {

    private final DrugService drugService;

    // Constructor injection ensures drugService is properly initialized
    public DrugController(DrugService drugService) {
        this.drugService = drugService;
    }

    /**
     * GET /api/drugs
     * List all drugs
     */
    @GetMapping
    public ResponseEntity<List<DrugDTO>> listAllDrugs() {
        List<DrugDTO> drugs = drugService.listAll();
        return ResponseEntity.ok(drugs);
    }

    /**
     * GET /api/drugs/{id}
     * Get a single drug by its ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<DrugDTO> getDrugById(@PathVariable Long id) {
        DrugDTO dto = drugService.getById(id);
        return ResponseEntity.ok(dto);
    }
}