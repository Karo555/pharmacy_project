import React from 'react';
import { Box, Container, Grid, Typography, Button, Chip } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const CallToActionSection: React.FC = () => (
    <Box sx={{
        py: { xs: 8, md: 10 },
        background: 'linear-gradient(135deg, rgba(67, 160, 71, 0.7), rgba(25, 118, 210, 0.7))', // Changed to semi-transparent
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1 // Added for proper stacking
    }}>
        <Container>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                        Ready to get started?
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 400, mb: 3, opacity: 0.9 }}>
                        Join thousands of customers who trust us with their health needs
                    </Typography>
                    <Chip
                        label="Free delivery on first order"
                        color="secondary"
                        sx={{ borderRadius: 4, py: 2.5, fontSize: '1rem', mb: { xs: 3, md: 0 } }}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                    <Button
                        component={RouterLink}
                        to="/register"
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForward />}
                        sx={{
                            borderRadius: 28,
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            backgroundColor: '#fff',
                            color: 'primary.main',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                transform: 'translateY(-3px)',
                                boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Sign Up Now
                    </Button>
                </Grid>
            </Grid>
        </Container>
    </Box>
);

export default CallToActionSection;