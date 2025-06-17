package org.example.pharmacyproject.services.impl;

import org.example.pharmacyproject.entities.Role;
import org.example.pharmacyproject.repositories.RoleRepository;
import org.example.pharmacyproject.services.RoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Role findByName(String name) {
        return roleRepository.findByName(name)
                .orElseThrow(() ->
                        new IllegalArgumentException("Role not found: " + name)
                );
    }
}