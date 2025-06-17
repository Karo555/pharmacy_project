import api from '../utils/axios';
import {
    RegistrationRequestDTO,
    RegistrationResponseDTO,
    LoginRequestDTO,
    LoginResponseDTO,
    RefreshTokenRequestDTO,
    RefreshTokenResponseDTO,
    PasswordResetRequestDTO,
    PasswordResetResponseDTO,
    PasswordResetConfirmDTO,
    PasswordChangeResponseDTO,
    UserProfileResponseDTO,
    UserProfileUpdateRequestDTO,
    PasswordChangeRequestDTO
} from 'types/auth';

/**
 * Register a new user
 */
export const register = (
    data: RegistrationRequestDTO
): Promise<RegistrationResponseDTO> => {
    return api.post<RegistrationResponseDTO>('/auth/register', data)
        .then(response => response.data);
};

/**
 * Log in and retrieve tokens
 */
export const login = (
    data: LoginRequestDTO
): Promise<LoginResponseDTO> => {
    return api.post<LoginResponseDTO>('/auth/login', data)
        .then(response => response.data);
};

/**
 * Refresh access token
 */
export const refreshToken = (
    data: RefreshTokenRequestDTO
): Promise<RefreshTokenResponseDTO> => {
    return api.post<RefreshTokenResponseDTO>('/auth/refresh-token', data)
        .then(response => response.data);
};

/**
 * Send password reset email
 */
export const requestPasswordReset = (
    data: PasswordResetRequestDTO
): Promise<PasswordResetResponseDTO> => {
    return api.post<PasswordResetResponseDTO>('/auth/password/reset', data)
        .then(response => response.data);
};

/**
 * Confirm password reset with token
 */
export const confirmPasswordReset = (
    data: PasswordResetConfirmDTO
): Promise<PasswordChangeResponseDTO> => {
    return api.post<PasswordChangeResponseDTO>('/auth/password/reset/confirm', data)
        .then(response => response.data);
};

/**
 * Get current user's profile
 */
export const getProfile = (): Promise<UserProfileResponseDTO> => {
    return api.get<UserProfileResponseDTO>('/profile')
        .then(response => response.data);
};

/**
 * Update current user's profile
 */
export const updateProfile = (
    data: UserProfileUpdateRequestDTO
): Promise<UserProfileResponseDTO> => {
    return api.put<UserProfileResponseDTO>('/profile', data)
        .then(response => response.data);
};

/**
 * Change password when logged in
 */
export const changePassword = (
    data: PasswordChangeRequestDTO
): Promise<PasswordChangeResponseDTO> => {
    return api.post<PasswordChangeResponseDTO>('/profile/password', data)
        .then(response => response.data);
};