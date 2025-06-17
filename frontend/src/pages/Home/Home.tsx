import React, { useEffect, useState, useRef } from 'react';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Paper,
    useMediaQuery,
    useTheme,
    Zoom,
    Fade,
    CircularProgress, IconButton,
} from '@mui/material';
import {
    LocalPharmacy,
    PlayArrow,
    ArrowForward,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import pattern from '../../../assets/pattern.png';

const Home: React.FC = () => {
    const { token } = useAuth();
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.up('md'));
    const [loaded, setLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simulate load
        const timer = setTimeout(() => setLoaded(true), 800);
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    const patternOffset = scrollY * 0.2;

    return (
        <Box sx={{ overflow: 'hidden' }} ref={scrollRef}>
            {!loaded ? (
                <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Paper elevation={0} sx={{ position: 'relative', borderRadius: 0, background: 'linear-gradient(135deg, #0a6cce, #6a00ea)', color: '#fff' }}>
                    {/* Parallax background pattern */}
                    <Box
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${pattern})`,
                            backgroundRepeat: 'repeat',
                            opacity: 0.1,
                            transform: `translateY(${patternOffset}px)`,
                        }}
                    />

                    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <Fade in={loaded} timeout={1000}>
                                    <Box>
                                        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 2, background: 'linear-gradient(90deg, #ffffff, #e0e0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                            Your health, our priority
                                        </Typography>
                                        <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                                            Professional online pharmacy with secure delivery and expert care available 24/7.
                                        </Typography>
                                        <Zoom in={loaded} style={{ transitionDelay: '300ms' }}>
                                            <Button
                                                component={RouterLink}
                                                to="/register"
                                                variant="contained"
                                                size="large"
                                                sx={{ mr: 2, borderRadius: '28px', px: 4, py: 1.5, fontWeight: 600 }}
                                                endIcon={<ArrowForward />}
                                            >
                                                Get Started
                                            </Button>
                                        </Zoom>
                                        <Zoom in={loaded} style={{ transitionDelay: '500ms' }}>
                                            <Button
                                                component={RouterLink}
                                                to="/login"
                                                variant="outlined"
                                                size="large"
                                                sx={{ borderRadius: '28px', px: 4, py: 1.5, borderColor: 'rgba(255,255,255,0.6)', color: '#fff' }}
                                            >
                                                Sign In
                                            </Button>
                                        </Zoom>
                                        <Fade in={loaded} style={{ transitionDelay: '700ms' }}>
                                            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
                                                <IconButton sx={{ color: 'white', mr: 1 }}>
                                                    <PlayArrow />
                                                </IconButton>
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    Watch how it works
                                                </Typography>
                                            </Box>
                                        </Fade>
                                    </Box>
                                </Fade>
                            </Grid>

                            {isMedium && (
                                <Grid item md={6}>
                                    <Fade in={loaded} timeout={1200}>
                                        <Box
                                            component="img"
                                            src={pattern}
                                            alt="Hero graphic"
                                            sx={{ width: '100%', maxWidth: 550, ml: 'auto', transform: 'translateY(-20px)' }}
                                        />
                                    </Fade>
                                </Grid>
                            )}
                        </Grid>
                    </Container>
                </Paper>
            )}
        </Box>
    );
};

export default Home;