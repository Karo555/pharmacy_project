package org.example.pharmacyproject.service;

import org.example.pharmacyproject.dto.drugs.CreateDrugDto;
import org.example.pharmacyproject.dto.drugs.CreateDrugResponseDto;
import org.example.pharmacyproject.dto.drugs.GetDrugDto;
import org.example.pharmacyproject.infrastructure.entity.DrugEntity;
import org.example.pharmacyproject.infrastructure.repository.DrugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DrugService {

    private final DrugRepository drugRepository;

    @Autowired
    public DrugService(DrugRepository drugRepository) {
        this.drugRepository = drugRepository;
    }

    public List<GetDrugDto> getAll(){
        var drugs = drugRepository.findAll();
        return drugs.stream().map((drug) -> new GetDrugDto(drug.getId(), drug.getName(), drug.getManufacturer(), drug.getDescription(), drug.getDosage(), drug.getType(), drug.isPrescriptionRequired())).collect(Collectors.toList());
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

}
