// src/main/java/org/example/pharmacyproject/controller/UserController.java
package org.example.pharmacyproject.controllers;

import jakarta.validation.Valid;
import org.example.pharmacyproject.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetUserProfileDto> getUser(@PathVariable("id") Long id) {
        GetUserProfileDto profile = userService.getProfile(id);
        return ResponseEntity.ok(profile);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<GetUserProfileDto> updateUser(
            @PathVariable("id") Long id,
            @Valid @RequestBody UpdateUserProfileDto dto
    ) {
        GetUserProfileDto updated = userService.updateProfile(id, dto);
        return ResponseEntity.ok(updated);
    }
}


