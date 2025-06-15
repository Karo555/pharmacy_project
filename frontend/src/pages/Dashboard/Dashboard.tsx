import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Container sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="body1" paragraph>
                Welcome to your dashboard!
            </Typography>
            <Box>
                <Button variant="contained" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;