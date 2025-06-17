package org.example.pharmacyproject.seeding;

import jakarta.annotation.PostConstruct;
import org.example.pharmacyproject.entities.Role;
import org.example.pharmacyproject.repositories.RoleRepository;
import org.springframework.stereotype.Component;

@Component
public class RoleInitializer {

    private final RoleRepository roleRepo;

    public RoleInitializer(RoleRepository roleRepo) {
        this.roleRepo = roleRepo;
    }

    @PostConstruct
    public void seedRoles() {
        if (roleRepo.findByName("ROLE_USER").isEmpty()) {
            roleRepo.save(new Role("ROLE_USER"));
        }
        if (roleRepo.findByName("ROLE_ADMIN").isEmpty()) {
            roleRepo.save(new Role("ROLE_ADMIN"));
        }
    }
}

