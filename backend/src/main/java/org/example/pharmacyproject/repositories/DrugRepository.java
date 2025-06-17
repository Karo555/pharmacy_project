package org.example.pharmacyproject.repositories;

import org.example.pharmacyproject.entities.DrugEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrugRepository extends JpaRepository<DrugEntity, Long> {


}


