import React from 'react';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Button, Stack } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const Home: React.FC = () => {
    const { token } = useAuth();
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
            {/* Logo */}
            <Box
                component="img"
                src="/logo.png"
                alt="PharmaPlus Logo"
                sx={{ height: 80, mb: 3 }}
            />

            {/* Headline */}
            <Typography variant="h3" gutterBottom>
                Your health, our priority.
            </Typography>

            {/* Tagline */}
            <Typography variant="h6" color="text.secondary" paragraph>
                Fast, reliable online pharmacy—anywhere, anytime.
            </Typography>

            {/* Call-to-Action Buttons */}
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                <Button
                    component={RouterLink}
                    to="/login"
                    variant="contained"
                    size="large"
                >
                    Login
                </Button>
                <Button
                    component={RouterLink}
                    to="/register"
                    variant="outlined"
                    size="large"
                >
                    Register
                </Button>
            </Stack>
        </Container>
    );
};

export default Home;