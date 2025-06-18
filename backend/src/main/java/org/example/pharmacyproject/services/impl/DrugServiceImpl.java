package org.example.pharmacyproject.services.impl;


import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.pharmacyproject.dtos.drugs.DrugDTO;
import org.example.pharmacyproject.entities.Drug;
import org.example.pharmacyproject.repositories.DrugRepository;
import org.example.pharmacyproject.services.DrugService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DrugServiceImpl implements DrugService {

    private final DrugRepository drugRepository;

    // Constructor injection ensures the repository is initialized
    public DrugServiceImpl(DrugRepository drugRepository) {
        this.drugRepository = drugRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DrugDTO> listAll() {
        return drugRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DrugDTO getById(Long id) {
        Drug drug = drugRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Drug not found with id: " + id));
        return toDTO(drug);
    }

    private DrugDTO toDTO(Drug drug) {
        return new DrugDTO(
                drug.getId(),
                drug.getName(),
                drug.getType(),
                drug.getManufacturer(),
                drug.getDosage(),
                drug.getDescription(),
                drug.isPrescriptionRequired()
        );
    }
}

