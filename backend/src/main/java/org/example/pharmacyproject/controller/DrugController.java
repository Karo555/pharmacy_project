package org.example.pharmacyproject.controller;

import jakarta.validation.Valid;
import org.example.pharmacyproject.dto.drugs.CreateDrugDto;
import org.example.pharmacyproject.dto.drugs.CreateDrugResponseDto;
import org.example.pharmacyproject.dto.drugs.GetDrugDto;
import org.example.pharmacyproject.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/drugs")
public class DrugController {

    private final DrugService drugService;

    @Autowired
    public DrugController(DrugService drugService) {
        this.drugService = drugService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<GetDrugDto>> getAllDrugs(Pageable pageable) {
        Page<GetDrugDto> page = drugService.getAll(pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<GetDrugDto> getOne(@PathVariable long id) {
        GetDrugDto dto = drugService.getOne(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CreateDrugResponseDto> create(
            @Valid @RequestBody CreateDrugDto drug
    ) {
        CreateDrugResponseDto newDrug = drugService.create(drug);
        return ResponseEntity.status(HttpStatus.CREATED).body(newDrug);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GetDrugDto> update(
            @PathVariable long id,
            @Valid @RequestBody CreateDrugDto drug
    ) {
        GetDrugDto updated = drugService.update(id, drug);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        drugService.delete(id);
        return ResponseEntity.noContent().build();
    }
}