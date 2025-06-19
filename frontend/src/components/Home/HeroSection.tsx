import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Button, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import '../../styles/globals.css';

interface HeroProps {
    scrollY: number;
}

const HeroSection: React.FC<HeroProps> = ({ scrollY }) => {
    // Use the string version for the query to avoid the theme dependency issue
    const isMobile = useMediaQuery('(max-width:900px)');
    const [loaded, setLoaded] = useState(false);

    // Parallax offsets
    const patternOffset = scrollY * 0.2;
    const circleOffset = scrollY * 0.5;

    useEffect(() => {
        setLoaded(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <Box
            className="position-relative overflow-hidden"
            sx={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                color: '#fff',
                minHeight: { xs: 'calc(100vh - 64px)', md: '80vh' }
            }}
        >
            {/* Animated Background Elements */}
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

            {/* Abstract Circle Elements */}
            <Box
                component={motion.div}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="position-absolute"
                sx={{
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                    top: -100 + circleOffset,
                    right: '10%',
                }}
            />

            <Box
                component={motion.div}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                className="position-absolute"
                sx={{
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                    bottom: -50,
                    left: '5%',
                    transform: `translateY(${-circleOffset * 0.3}px)`,
                }}
            />

            <Box
                component={motion.div}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.15 }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                className="position-absolute"
                sx={{
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(150,100,255,0.15) 0%, rgba(150,100,255,0) 70%)',
                    top: '30%',
                    left: '-10%',
                }}
            />

            <Container
                component={motion.div}
                variants={containerVariants}
                initial="hidden"
                animate={loaded ? "visible" : "hidden"}
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    py: { xs: 6, sm: 8, md: 12 },
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: { xs: 'calc(100vh - 100px)', md: '70vh' }
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box component={motion.div} variants={itemVariants}>
                            <Typography
                                variant="h2"
                                gutterBottom
                                sx={{
                                    fontWeight: 800,
                                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                                    lineHeight: 1.2,
                                    backgroundImage: 'linear-gradient(45deg, #ffffff, #e0e0ff)',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    textShadow: '0 5px 25px rgba(0,0,0,0.1)',
                                    mb: 2
                                }}
                            >
                                Your health, our priority
                            </Typography>
                        </Box>

                        <Box component={motion.div} variants={itemVariants}>
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 4,
                                    maxWidth: 500,
                                    lineHeight: 1.6,
                                    fontSize: { xs: '1rem', md: '1.25rem' },
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontWeight: 400
                                }}
                            >
                                Professional online pharmacy with secure delivery and expert care available 24/7.
                            </Typography>
                        </Box>

                        <Box
                            component={motion.div}
                            variants={itemVariants}
                            sx={{
                                display: 'flex',
                                gap: 2,
                                flexWrap: 'wrap',
                                mt: 2
                            }}
                        >
                            <Button
                                component={RouterLink}
                                to="/register"
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    borderRadius: '50px',
                                    px: { xs: 3, md: 4 },
                                    py: 1.5,
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    color: '#6a00ea',
                                    fontWeight: 600,
                                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        background: '#ffffff',
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.25)',
                                    }
                                }}
                            >
                                Get Started
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/login"
                                variant="outlined"
                                size="large"
                                sx={{
                                    borderRadius: '50px',
                                    px: { xs: 3, md: 4 },
                                    py: 1.5,
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    borderColor: 'rgba(255,255,255,0.6)',
                                    color: '#fff',
                                    fontWeight: 600,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#ffffff',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        transform: 'translateY(-3px)',
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            textAlign: 'center',
                            display: { xs: isMobile ? 'none' : 'block', md: 'block' }
                        }}
                    >
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            sx={{
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                                    borderRadius: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    left: '50%',
                                    top: '50%',
                                    zIndex: -1
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src="/hero-illustration.png"
                                alt="Hero Illustration"
                                sx={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.2))',
                                    transform: `translateY(${-scrollY * 0.1}px)`,
                                    transition: 'transform 0.2s ease-out'
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HeroSection;