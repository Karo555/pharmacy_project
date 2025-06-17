/**
 * Registration
 */
export interface RegistrationRequestDTO {
    email: string;
    password: string;
}

export interface RegistrationResponseDTO {
    id: number;
    email: string;
    registeredAt: string; // ISO date string
    role: string;
}

/**
 * Login
 */
export interface LoginRequestDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    id: number;
    email: string;
    token: string;
    role: string;
    issuedAt: string;  // ISO date string
    expiresAt: string; // ISO date string
}

/**
 * Token Refresh
 */
export interface RefreshTokenRequestDTO {
    refreshToken: string;
}

export interface RefreshTokenResponseDTO {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    issuedAt: string;  // ISO date string
    expiresAt: string; // ISO date string
}

/**
 * Password Reset (Forgot Password)
 */
export interface PasswordResetRequestDTO {
    email: string;
}

export interface PasswordResetResponseDTO {
    message: string;
    timestamp: string; // ISO date string
}

export interface PasswordResetConfirmDTO {
    token: string;
    newPassword: string;
}

/**
 * Password Change (Logged In)
 */
export interface PasswordChangeRequestDTO {
    oldPassword: string;
    newPassword: string;
}

export interface PasswordChangeResponseDTO {
    message: string;
    updatedAt: string; // ISO date string
}

/**
 * User Profile
 */
export interface UserProfileResponseDTO {
    id: number;
    email: string;
    address?: string;
    phoneNumber?: string;
    paymentMethod?: string;
    role: string;
    registeredAt: string; // ISO date string
    updatedAt: string;    // ISO date string
}

export interface UserProfileUpdateRequestDTO {
    address: string;
    phoneNumber: string;
    paymentMethod: string;
}

/**
 * Error Response
 */
export interface ErrorResponseDTO {
    status: number;
    message: string;
    timestamp: string; // ISO date string
    path: string;
}