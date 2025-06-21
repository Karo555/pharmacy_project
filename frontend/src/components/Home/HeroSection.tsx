import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Button, InputBase, useMediaQuery, Paper, InputAdornment } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import TrueFocus from './TrueFocus';
import '../../styles/globals.css';

interface HeroProps {
    scrollY: number;
}

const HeroSection: React.FC<HeroProps> = ({ scrollY }) => {
    // Use the string version for the query to avoid the theme dependency issue
    const isMobile = useMediaQuery('(max-width:900px)');
    const [loaded, setLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Parallax offsets for subtle movement
    const patternOffset = scrollY * 0.1;

    useEffect(() => {
        // Set loaded to true immediately to prevent initial blue background
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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const navigate = useNavigate();

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Use React Router navigation instead of direct location change
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <Box
            className="position-relative overflow-hidden"
            sx={{
                background: 'transparent',
                color: '#fff',
                minHeight: { xs: 'calc(100vh - 64px)', md: '80vh' },
                zIndex: 1,
                position: 'relative',
            }}
        >
            {/* Background Pattern Texture */}
            <Box
                sx={{
                    position: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url('/pattern.png'), linear-gradient(0deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)`,
                    backgroundRepeat: 'repeat, no-repeat',
                    backgroundSize: '300px, cover',
                    opacity: 0.07,
                    transform: `translateY(${patternOffset}px)`,
                    zIndex: -1,
                }}
            />


            <Container
                component={motion.div}
                variants={containerVariants}
                initial="hidden"
                animate={loaded ? "visible" : "hidden"}
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    py: { xs: 8, sm: 10, md: 12 },
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: { xs: 'calc(100vh - 100px)', md: '75vh' }
                }}
            >
                <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
                    <Grid item xs={12} md={7}>
                        <Box component={motion.div} variants={itemVariants}>
                            <Typography
                                variant="h1"
                                className="mb-4"
                                sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                                    lineHeight: 1.1,
                                    letterSpacing: '-0.02em',
                                    color: '#ffffff',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                    mb: { xs: 3, md: 4 }
                                }}
                            >
                                <TrueFocus
                                    sentence="Your health, our priority"
                                    manualMode={false}
                                    blurAmount={5}
                                    borderColor="#ffffff"
                                    glowColor="rgba(255, 255, 255, 0.6)"
                                    animationDuration={2}
                                    pauseBetweenAnimations={1}
                                />
                            </Typography>
                        </Box>

                        <Box component={motion.div} variants={itemVariants}>
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 5,
                                    maxWidth: 580,
                                    lineHeight: 1.6,
                                    fontSize: { xs: '1.1rem', md: '1.35rem' },
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontWeight: 400
                                }}
                            >
                                Professional online pharmacy with secure delivery and expert care available 24/7. Find medications you need easily.
                            </Typography>
                        </Box>

                        {/* Prominent Search Bar */}
                        <Box
                            component={motion.div}
                            variants={itemVariants}
                            sx={{ mb: 5 }}
                        >
                            <Paper
                                component="form"
                                elevation={4}
                                onSubmit={handleSearchSubmit}
                                sx={{
                                    p: '4px 6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: '50px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                                    maxWidth: 500,
                                    transition: 'all 0.3s ease',
                                    '&:hover, &:focus-within': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                                        backgroundColor: '#ffffff'
                                    }
                                }}
                            >
                                <InputBase
                                    sx={{
                                        ml: 2,
                                        flex: 1,
                                        fontSize: '1.1rem',
                                        py: 1.2,
                                        color: 'var(--color-text)'
                                    }}
                                    placeholder="Search for medications..."
                                    inputProps={{ 'aria-label': 'search medications' }}
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SearchIcon color="primary" />
                                        </InputAdornment>
                                    }
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        borderRadius: '50px',
                                        px: { xs: 3, md: 4 },
                                        py: 1.2,
                                        ml: 1,
                                        mr: 0.5,
                                        fontSize: '1rem',
                                        backgroundColor: 'var(--color-primary)',
                                        fontWeight: 600,
                                        textTransform: 'none'
                                    }}
                                >
                                    Search
                                </Button>
                            </Paper>
                        </Box>

                        <Box
                            component={motion.div}
                            variants={itemVariants}
                            sx={{
                                display: 'flex',
                                gap: 3,
                                flexWrap: 'wrap',
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
                                    px: { xs: 3.5, md: 4.5 },
                                    py: 1.8,
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    background: '#ffffff',
                                    color: 'var(--color-primary)',
                                    fontWeight: 600,
                                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'none',
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
                                    px: { xs: 3.5, md: 4.5 },
                                    py: 1.8,
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    borderColor: 'rgba(255,255,255,0.8)',
                                    borderWidth: 2,
                                    color: '#fff',
                                    fontWeight: 600,
                                    textTransform: 'none',
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
                        md={5}
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
                            {/*<Box*/}
                            {/*    component="img"*/}
                            {/*    src="/hero-illustration.png"*/}
                            {/*    alt="Hero Illustration"*/}
                            {/*    sx={{*/}
                            {/*        maxWidth: '100%',*/}
                            {/*        height: 'auto',*/}
                            {/*        filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.2))',*/}
                            {/*        transform: `translateY(${-scrollY * 0.1}px)`,*/}
                            {/*        transition: 'transform 0.2s ease-out'*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HeroSection;

