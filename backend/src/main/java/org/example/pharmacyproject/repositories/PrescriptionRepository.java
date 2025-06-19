package org.example.pharmacyproject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.example.pharmacyproject.entities.Prescription;

import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    // all prescriptions belonging to a given user
    List<Prescription> findByUserId(Long userId);

    // fetch a single prescription by its id *and* owner’s userId
    Prescription findByIdAndUserId(Long id, Long userId);
}
