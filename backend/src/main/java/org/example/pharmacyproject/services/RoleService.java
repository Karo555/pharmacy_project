package org.example.pharmacyproject.services;

import org.example.pharmacyproject.entities.Role;

public interface RoleService {
    /**
     * Fetches a Role by its name, e.g. "ROLE_USER" or "ROLE_ADMIN".
     * @throws IllegalArgumentException if not found
     */
    Role findByName(String name);
}
