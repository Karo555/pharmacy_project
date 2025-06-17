package org.example.pharmacyproject.services;


import io.jsonwebtoken.Claims;
import org.example.pharmacyproject.entities.User;
import org.example.pharmacyproject.entities.tokens.RefreshToken;

import java.util.List;

public interface TokenService {
    /**
     * Generates a signed JWT access token containing user claims.
     */
    String generateAccessToken(User user);

    /**
     * Creates and persists a refresh token linked to the user.
     */
    RefreshToken createRefreshToken(User user);

    /**
     * Validates the integrity and expiration of an access token.
     */
    boolean validateAccessToken(String token);

    /**
     * Parses and returns all claims from a valid token.
     */
    Claims getClaimsFromToken(String token);

    /**
     * Extracts the username (subject) claim from the token.
     */
    String getUsernameFromToken(String token);

    /**
     * Extracts the roles claim (user authorities) from the token.
     */
    List<String> getRolesFromToken(String token);
}
