package org.example.pharmacyproject.services;

import org.example.pharmacyproject.dtos.drugs.CreateDrugDto;
import org.example.pharmacyproject.dtos.drugs.CreateDrugResponseDto;
import org.example.pharmacyproject.dtos.drugs.GetDrugDto;
import org.example.pharmacyproject.entities.DrugEntity;
import org.example.pharmacyproject.repositories.DrugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DrugService {

    private final DrugRepository drugRepository;

    @Autowired
    public DrugService(DrugRepository drugRepository) {
        this.drugRepository = drugRepository;
    }

    // Pagination & sorting
    public Page<GetDrugDto> getAll(Pageable pageable) {
        return drugRepository.findAll(pageable)
                .map(drug -> new GetDrugDto(
                        drug.getId(),
                        drug.getName(),
                        drug.getManufacturer(),
                        drug.getDescription(),
                        drug.getDosage(),
                        drug.getType(),
                        drug.isPrescriptionRequired()
                ));
    }

    public GetDrugDto getOne(long id){
        var drugEntity = drugRepository.findById(id).orElseThrow(() -> new RuntimeException("Drug not found"));
        return new GetDrugDto(drugEntity.getId(), drugEntity.getName(), drugEntity.getManufacturer(), drugEntity.getDescription(), drugEntity.getDosage(), drugEntity.getType(), drugEntity.isPrescriptionRequired());
    }

    public CreateDrugResponseDto create(CreateDrugDto drug){
        var drugEntity = new DrugEntity();

        drugEntity.setName(drug.getName());
        drugEntity.setManufacturer(drug.getManufacturer());
        drugEntity.setDescription(drug.getDescription());
        drugEntity.setDosage(drug.getDosage());
        drugEntity.setType(drug.getType());
        drugEntity.setPrescriptionRequired(drug.isPrescriptionRequired());

        var newDrug = drugRepository.save(drugEntity);

        return new CreateDrugResponseDto(newDrug.getId(), newDrug.getName(), newDrug.getManufacturer(), newDrug.getDescription(), newDrug.getDosage(), newDrug.getType(), newDrug.isPrescriptionRequired());
    }

    public void delete(long id){
        if(!drugRepository.existsById(id)){
            throw new RuntimeException("Drug not found");
        }
        drugRepository.deleteById(id);
    }

    // Full update
    public GetDrugDto update(long id, CreateDrugDto dto) {
        DrugEntity drug = drugRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Drug not found"));
        drug.setName(dto.getName());
        drug.setManufacturer(dto.getManufacturer());
        drug.setDescription(dto.getDescription());
        drug.setDosage(dto.getDosage());
        drug.setType(dto.getType());
        drug.setPrescriptionRequired(dto.isPrescriptionRequired());

        DrugEntity updated = drugRepository.save(drug);
        return new GetDrugDto(
                updated.getId(),
                updated.getName(),
                updated.getManufacturer(),
                updated.getDescription(),
                updated.getDosage(),
                updated.getType(),
                updated.isPrescriptionRequired()
        );
    }

}