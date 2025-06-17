package org.example.pharmacyproject.services;

import org.example.pharmacyproject.dtos.user.password.change.PasswordChangeRequestDTO;
import org.example.pharmacyproject.dtos.user.password.change.PasswordChangeResponseDTO;
import org.example.pharmacyproject.dtos.user.profile.UserProfileResponseDTO;
import org.example.pharmacyproject.dtos.user.profile.UserProfileUpdateRequestDTO;


public interface UserService {
    UserProfileResponseDTO getProfile(Long userId);
    UserProfileResponseDTO updateProfile(Long userId, UserProfileUpdateRequestDTO dto);
    PasswordChangeResponseDTO changePassword(Long userId, PasswordChangeRequestDTO dto);
    UserProfileResponseDTO getProfileByEmail(String email);
    UserProfileResponseDTO updateProfileByEmail(String email, UserProfileUpdateRequestDTO dto);
}