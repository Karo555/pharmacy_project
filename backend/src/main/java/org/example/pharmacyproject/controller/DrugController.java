package org.example.pharmacyproject.controller;

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
@PreAuthorize("hasRole('ADMIN')")
public class DrugController {

    private final DrugService drugService;

    @Autowired
    public DrugController(DrugService drugService) {
        this.drugService = drugService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('READER')")
    public Page<GetDrugDto> getAllDrugs(Pageable pageable) {
        return drugService.getAll(pageable);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('READER')")
    public GetDrugDto getOne(@PathVariable long id){
        return drugService.getOne(id);
    }

    @PostMapping
    public ResponseEntity<CreateDrugResponseDto> create(@RequestBody CreateDrugDto drug){
        var newDrug = drugService.create(drug);
        return new ResponseEntity<>(newDrug, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        drugService.delete(id);
        return ResponseEntity.noContent().build();
    }

}