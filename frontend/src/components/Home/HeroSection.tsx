import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface HeroProps {
    scrollY: number;
}

const HeroSection: React.FC<HeroProps> = ({ scrollY }) => {
    // Parallax offsets
    const patternOffset = scrollY * 0.2;
    const circleOffset = scrollY * 0.5;

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #0a6cce, #6a00ea)', color: '#fff' }}>
            {/* Animated Background Shapes */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: "url('/pattern.png') repeat",
                    opacity: 0.1,
                    transform: `translateY(${patternOffset}px)`,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                    top: -150 + circleOffset,
                    right: '10%',
                }}
            />

            <Container sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 12 } }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h2"
                            gutterBottom
                            sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.5rem' } }}
                        >
                            Your health, our priority
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4, maxWidth: 500, lineHeight: 1.5 }}>
                            Professional online pharmacy with secure delivery and expert care available 24/7.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                component={RouterLink}
                                to="/register"
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForwardIcon />}
                                sx={{ borderRadius: '28px', px: 4, py: 1.5 }}
                            >
                                Get Started
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/login"
                                variant="outlined"
                                size="large"
                                sx={{
                                    borderRadius: '28px',
                                    px: 4,
                                    py: 1.5,
                                    borderColor: 'rgba(255,255,255,0.6)',
                                    color: '#fff',
                                }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                        <Box
                            component="img"
                            src="/hero-illustration.png"
                            alt="Hero Illustration"
                            sx={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HeroSection;