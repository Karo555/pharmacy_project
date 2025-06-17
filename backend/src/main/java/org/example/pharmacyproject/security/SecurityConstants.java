package org.example.pharmacyproject.security;

public final class SecurityConstants {
    private SecurityConstants() {}

    public static final String HEADER_STRING = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String[] PUBLIC_URLS = {
            "/api/auth/**",
            "/api/password/**"
    };
}

