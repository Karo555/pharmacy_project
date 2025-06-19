package org.example.pharmacyproject.controllers;

import org.example.pharmacyproject.dtos.drugs.DrugDTO;
import org.example.pharmacyproject.services.PublicDrugService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for providing public access to limited drug information.
 * These endpoints are accessible without authentication.
 */
@RestController
@RequestMapping("/api/public/drugs")
public class PublicDrugController {

    private final PublicDrugService publicDrugService;

    public PublicDrugController(PublicDrugService publicDrugService) {
        this.publicDrugService = publicDrugService;
    }

    /**
     * GET /api/public/drugs
     * List public drugs with limited information
     */
    @GetMapping
    public ResponseEntity<List<DrugDTO>> listPublicDrugs() {
        List<DrugDTO> drugs = publicDrugService.listPublicDrugs();
        return ResponseEntity.ok(drugs);
    }

    /**
     * GET /api/public/drugs/search
     * Search public drugs by name, manufacturer, or description
     */
    @GetMapping("/search")
    public ResponseEntity<List<DrugDTO>> searchPublicDrugs(@RequestParam(required = false) String query) {
        List<DrugDTO> drugs = publicDrugService.searchPublicDrugs(query);
        return ResponseEntity.ok(drugs);
    }

    /**
     * GET /api/public/drugs/{id}
     * Get a single public drug by its ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<DrugDTO> getPublicDrugById(@PathVariable Long id) {
        DrugDTO dto = publicDrugService.getPublicDrugById(id);
        return ResponseEntity.ok(dto);
    }
}
