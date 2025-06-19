package org.example.pharmacyproject.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.pharmacyproject.dtos.prescriptions.PrescriptionCreateRequestDTO;
import org.example.pharmacyproject.dtos.prescriptions.PrescriptionDTO;
import org.example.pharmacyproject.dtos.prescriptions.PrescriptionUpdateRequestDTO;
import org.example.pharmacyproject.entities.Drug;
import org.example.pharmacyproject.entities.Prescription;
import org.example.pharmacyproject.entities.User;
import org.example.pharmacyproject.repositories.PrescriptionRepository;
import org.example.pharmacyproject.repositories.UserRepository;
import org.example.pharmacyproject.services.PrescriptionService;
import org.springframework.stereotype.Service;
import org.example.pharmacyproject.repositories.DrugRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final UserRepository userRepository;
    private final DrugRepository drugRepository;

    public PrescriptionServiceImpl(PrescriptionRepository prescriptionRepository, UserRepository userRepository, DrugRepository drugRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.userRepository = userRepository;
        this.drugRepository = drugRepository;
    }


    private PrescriptionDTO toDTO(Prescription p) {
        PrescriptionDTO dto = new PrescriptionDTO();
        dto.setId(p.getId());
        dto.setUserId(p.getUser().getId());
        dto.setDrugName(p.getDrug().getName());
        dto.setDosage(p.getDosage());
        dto.setFrequency(p.getFrequency());
        dto.setPrescriptionRequired(p.isPrescriptionRequired());
        dto.setIssuedAt(p.getIssuedAt());
        dto.setExpiresAt(p.getExpiresAt());
        return dto;
    }

    @Override
    public List<PrescriptionDTO> listAll(Long userId) {
        return prescriptionRepository
                .findByUserId(userId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PrescriptionDTO getById(Long userId, Long prescriptionId) {
        Prescription p = prescriptionRepository
                .findByIdAndUserId(prescriptionId, userId);
        return toDTO(p);
    }

    @Override
    public PrescriptionDTO create(Long userId, PrescriptionCreateRequestDTO dto) {
        Optional<User> user = userRepository.findById(userId);
        // fetch the Drug entity
        Optional<Drug> drug = drugRepository.findById(dto.getDrugId());
        Prescription p = new Prescription();
        p.setUser(user.orElse(null));
        p.setDrug(drug.orElse(null));
        p.setDosage(dto.getDosage());
        p.setFrequency(dto.getFrequency());
        p.setPrescriptionRequired(dto.isPrescriptionRequired());
        p.setIssuedAt(dto.getIssuedAt());
        p.setExpiresAt(dto.getExpiresAt());

        Prescription saved = prescriptionRepository.save(p);
        return toDTO(saved);
    }

    @Override
    public PrescriptionDTO update(Long userId, Long prescriptionId, PrescriptionUpdateRequestDTO dto) {
        Prescription p = prescriptionRepository
                .findByIdAndUserId(prescriptionId, userId);

        p.setDosage(dto.getDosage());
        p.setFrequency(dto.getFrequency());
        p.setPrescriptionRequired(dto.isPrescriptionRequired());
        p.setIssuedAt(dto.getIssuedAt());
        p.setExpiresAt(dto.getExpiresAt());

        Prescription updated = prescriptionRepository.save(p);
        return toDTO(updated);
    }

    @Override
    public void delete(Long userId, Long prescriptionId) {
        Prescription p = prescriptionRepository
                .findByIdAndUserId(prescriptionId, userId);
        prescriptionRepository.delete(p);
    }
}