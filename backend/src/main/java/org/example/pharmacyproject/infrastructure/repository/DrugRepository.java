package org.example.pharmacyproject.infrastructure.repository;

import org.example.pharmacyproject.infrastructure.entity.DrugEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrugRepository extends JpaRepository<DrugEntity, Long> {


}


