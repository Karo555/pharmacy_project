package org.example.pharmacyproject.services.impl;

import io.jsonwebtoken.*;
import org.example.pharmacyproject.entities.User;
import org.example.pharmacyproject.entities.tokens.RefreshToken;
import org.example.pharmacyproject.repositories.RefreshTokenRepository;
import org.example.pharmacyproject.services.TokenService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TokenServiceImpl implements TokenService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expirationMs}")
    private long jwtExpirationMs;

    @Value("${jwt.refreshExpirationMs}")
    private long refreshTokenDurationMs;

    private final RefreshTokenRepository refreshTokenRepository;

    public TokenServiceImpl(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    public String generateAccessToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("roles", List.of(user.getRole().toString()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }

    @Override
    public RefreshToken createRefreshToken(User user) {
        RefreshToken refreshToken = new RefreshToken(
                UUID.randomUUID().toString(),
                LocalDateTime.now().plusNanos(refreshTokenDurationMs * 1_000_000),
                user
        );
        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public boolean validateAccessToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // log invalid token
            return false;
        }
    }

    @Override
    public Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
    }

    @Override
    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<String> getRolesFromToken(String token) {
        Object rolesObj = getClaimsFromToken(token).get("roles");
        if (rolesObj instanceof List<?>) {
            return ((List<?>) rolesObj).stream()
                    .map(Object::toString)
                    .collect(Collectors.toList());
        }
        return List.of();
    }
}