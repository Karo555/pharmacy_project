import React, { useEffect, useState, useRef } from 'react';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Avatar,
    Stack,
    Paper,
    Divider,
    useMediaQuery,
    useTheme,
    Fab,
    CardMedia,
    CardActions,
    Chip,
    IconButton,
    Zoom,
    Fade,
    CircularProgress,
} from '@mui/material';
import {
    LocalShipping,
    HeadsetMic,
    Lock,
    Alarm,
    ArrowForward,
    KeyboardArrowRight,
    HealthAndSafety,
    AccessTime,
    MedicalServices,
    ThumbUp,
    PlayArrow,
    LocalPharmacyOutlined,
    LocalPharmacy,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { HeroSkeleton, FeaturesSkeleton, StepsSkeleton, TestimonialsSkeleton } from '../../components/SkeletonLoaders';
import { AnimateOnScroll } from '../../utils/animationUtils';

const features = [
    {
        icon: <LocalShipping fontSize="large" sx={{ color: '#1976d2' }} />,
        title: 'Fast Delivery',
        description: 'Medications delivered to your doorstep within 24 hours.',
        color: '#1976d2',
        hoverColor: '#1565c0'
    },
    {
        icon: <HeadsetMic fontSize="large" sx={{ color: '#7e57c2' }} />,
        title: '24/7 Expert Support',
        description: 'Pharmacists available around the clock to answer your questions.',
        color: '#7e57c2',
        hoverColor: '#6a4caf'
    },
    {
        icon: <Lock fontSize="large" sx={{ color: '#43a047' }} />,
        title: 'Secure Payments',
        description: 'Your financial information is protected with bank-level security.',
        color: '#43a047',
        hoverColor: '#388e3c'
    },
    {
        icon: <Alarm fontSize="large" sx={{ color: '#f44336' }} />,
        title: 'Prescription Reminders',
        description: 'Never miss a dose with our smart reminder system.',
        color: '#f44336',
        hoverColor: '#e53935'
    },
];

const steps = [
    {
        icon: <MedicalServices fontSize="large" />,
        label: 'Upload Prescription',
        description: 'Take a photo or upload your doctor\'s prescription through our secure platform.',
        color: '#1976d2',
        detail: 'Our intelligent image recognition can process even handwritten prescriptions accurately.'
    },
    {
        icon: <HealthAndSafety fontSize="large" />,
        label: 'Pharmacist Review',
        description: 'Our licensed pharmacists verify your prescription and prepare your medication.',
        color: '#7e57c2',
        detail: 'Each prescription is reviewed by a qualified pharmacist to ensure accuracy and safety.'
    },
    {
        icon: <LocalShipping fontSize="large" />,
        label: 'Delivered to Your Door',
        description: 'Receive your medication in discreet packaging with temperature control when needed.',
        color: '#43a047',
        detail: 'Real-time tracking allows you to know exactly when your medications will arrive.'
    },
];

const testimonials = [
    {
        name: 'John Doe',
        role: 'Regular Customer',
        avatar: '../../avatar1.png',
        quote: 'The prescription reminder feature has been a game-changer for managing my medications. Great service and fast delivery!',
        rating: 5
    },
    {
        name: 'Jane Smith',
        role: 'Monthly Subscriber',
        avatar: '/avatar2.png',
        quote: 'As someone with chronic conditions, having a reliable pharmacy service is essential. Their pharmacists are knowledgeable and always available to answer questions.',
        rating: 5
    },
];

const partners = [
    { name: 'Partner A', logo: '/placeholder-logo.png' },
    { name: 'Partner B', logo: '/placeholder-logo.png' },
    { name: 'Partner C', logo: '/placeholder-logo.png' },
];

const Home: React.FC = () => {
    const { token } = useAuth();
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Add loading states for different sections
    const [isLoading, setIsLoading] = useState(true);
    const [featuresLoaded, setFeaturesLoaded] = useState(false);
    const [stepsLoaded, setStepsLoaded] = useState(false);
    const [testimonialsLoaded, setTestimonialsLoaded] = useState(false);
    const [partnersLoaded, setPartnersLoaded] = useState(false);

    useEffect(() => {
        // Simulating content loading with different timings for each section
        const heroTimer = setTimeout(() => {
            setHeroLoaded(true);
        }, 800);

        const featuresTimer = setTimeout(() => {
            setFeaturesLoaded(true);
        }, 1000);

        const stepsTimer = setTimeout(() => {
            setStepsLoaded(true);
        }, 1200);

        const testimonialsTimer = setTimeout(() => {
            setTestimonialsLoaded(true);
        }, 1400);

        const partnersTimer = setTimeout(() => {
            setPartnersLoaded(true);
        }, 1600);

        // Main loading state for the entire page
        const mainTimer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        // Handle scroll events for parallax effect
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            clearTimeout(heroTimer);
            clearTimeout(featuresTimer);
            clearTimeout(stepsTimer);
            clearTimeout(testimonialsTimer);
            clearTimeout(partnersTimer);
            clearTimeout(mainTimer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    // Calculate parallax values based on scroll position
    const heroParallaxValue = scrollY * 0.4;
    const patternParallaxValue = scrollY * 0.2;
    const circleParallaxValue = scrollY * 0.5;
    const waveDividerParallaxValue = scrollY * 0.3;

    return (
        <Box sx={{ overflow: 'hidden' }}>
            {/* Hero Section */}
            {!heroLoaded ? (
                <HeroSkeleton />
            ) : (
                <Paper
                    elevation={0}
                    sx={{
                        background: 'linear-gradient(135deg, #0a6cce, #6a00ea)',
                        color: '#fff',
                        borderRadius: 0,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Animated background elements */}
                    <Box
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            opacity: 0.1,
                            background: 'url(/pattern.png) repeat',
                            transform: `translateY(${patternParallaxValue}px)`,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            width: '300px',
                            height: '300px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                            top: `calc(-150px + ${circleParallaxValue}px)`,
                            right: '10%',
                            animation: 'pulse 15s infinite',
                            '@keyframes pulse': {
                                '0%': { transform: 'scale(1)', opacity: 0.1 },
                                '50%': { transform: 'scale(1.2)', opacity: 0.2 },
                                '100%': { transform: 'scale(1)', opacity: 0.1 },
                            },
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                            bottom: `calc(50px + ${circleParallaxValue}px)`,
                            left: '5%',
                            animation: 'float 20s infinite ease-in-out',
                            '@keyframes float': {
                                '0%': { transform: 'translateY(0px)' },
                                '50%': { transform: 'translateY(-20px)' },
                                '100%': { transform: 'translateY(0px)' },
                            },
                        }}
                    />

                    <Container maxWidth="lg">
                        <Grid container spacing={3} sx={{ py: { xs: 8, md: 12 } }}>
                            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' }, zIndex: 1, display: 'flex', alignItems: 'center' }}>
                                <Fade in={heroLoaded} timeout={1000}>
                                    <Box>
                                        <Box
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                mb: 3,
                                                background: 'rgba(255,255,255,0.1)',
                                                borderRadius: 8,
                                                py: 0.75,
                                                px: 2,
                                                backdropFilter: 'blur(10px)',
                                            }}
                                        >
                                            <LocalPharmacy sx={{ mr: 1, color: '#61dafb' }} />
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                Trusted by 10,000+ customers
                                            </Typography>
                                        </Box>

                                        <Typography
                                            variant="h2"
                                            component="h1"
                                            gutterBottom
                                            sx={{
                                                fontWeight: 800,
                                                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                                                textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                                                background: 'linear-gradient(90deg, #ffffff, #e0e0ff)',
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                mb: 2,
                                            }}
                                        >
                                            Your health, our priority
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                mb: 4,
                                                fontWeight: 400,
                                                maxWidth: { md: '90%' },
                                                lineHeight: 1.6,
                                                opacity: 0.9,
                                                textShadow: '0px 1px 2px rgba(0,0,0,0.1)',
                                            }}
                                        >
                                            Professional online pharmacy with secure delivery and expert care available 24/7.
                                        </Typography>

                                        <Stack
                                            direction={{ xs: 'column', sm: 'row' }}
                                            spacing={2}
                                            sx={{
                                                justifyContent: { xs: 'center', md: 'flex-start' },
                                                mb: { xs: 4, md: 6 }
                                            }}
                                        >
                                            <Zoom in={heroLoaded} style={{ transitionDelay: '300ms' }}>
                                                <Button
                                                    component={RouterLink}
                                                    to="/register"
                                                    variant="contained"
                                                    size="large"
                                                    sx={{
                                                        borderRadius: '28px',
                                                        px: 4,
                                                        py: 1.5,
                                                        fontSize: '1.1rem',
                                                        fontWeight: 600,
                                                        backgroundColor: 'white',
                                                        color: 'primary.main',
                                                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                                            transform: 'translateY(-4px) scale(1.02)',
                                                            boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                                                        },
                                                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                    }}
                                                    endIcon={<ArrowForward />}
                                                >
                                                    Get Started
                                                </Button>
                                            </Zoom>

                                            <Zoom in={heroLoaded} style={{ transitionDelay: '500ms' }}>
                                                <Button
                                                    component={RouterLink}
                                                    to="/login"
                                                    variant="outlined"
                                                    size="large"
                                                    sx={{
                                                        borderRadius: '28px',
                                                        px: 4,
                                                        py: 1.5,
                                                        fontSize: '1.1rem',
                                                        fontWeight: 600,
                                                        color: '#fff',
                                                        borderColor: 'rgba(255,255,255,0.6)',
                                                        backdropFilter: 'blur(5px)',
                                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                                        '&:hover': {
                                                            borderColor: '#fff',
                                                            backgroundColor: 'rgba(255,255,255,0.15)',
                                                            transform: 'translateY(-4px)',
                                                        },
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                >
                                                    Sign In
                                                </Button>
                                            </Zoom>
                                        </Stack>

                                        <Fade in={heroLoaded} style={{ transitionDelay: '600ms' }}>
                                            <Stack
                                                direction="row"
                                                spacing={3}
                                                sx={{
                                                    alignItems: 'center',
                                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                                }}
                                            >
                                                <IconButton
                                                    sx={{
                                                        bgcolor: 'rgba(255,255,255,0.1)',
                                                        backdropFilter: 'blur(10px)',
                                                        color: 'white',
                                                        '&:hover': {
                                                            bgcolor: 'rgba(255,255,255,0.2)',
                                                        }
                                                    }}
                                                >
                                                    <PlayArrow />
                                                </IconButton>
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    Watch how it works
                                                </Typography>
                                            </Stack>
                                        </Fade>
                                    </Box>
                                </Fade>
                            </Grid>

                            {isMediumScreen && (
                                <Grid item md={6} sx={{ zIndex: 1 }}>
                                    <Zoom in={heroLoaded} style={{ transitionDelay: '800ms' }}>
                                        <Box
                                            component="img"
                                            src="/hero-image.png"
                                            alt="Online Pharmacy"
                                            sx={{
                                                width: '100%',
                                                maxWidth: 550,
                                                height: 'auto',
                                                display: 'block',
                                                ml: 'auto',
                                                filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.3))',
                                                transform: 'translateY(-20px)',
                                                animation: 'float-image 6s ease-in-out infinite',
                                                '@keyframes float-image': {
                                                    '0%': { transform: 'translateY(-20px)' },
                                                    '50%': { transform: 'translateY(-35px)' },
                                                    '100%': { transform: 'translateY(-20px)' },
                                                },
                                            }}
                                        />
                                    </Zoom>
                                </Grid>
                            )}
                        </Grid>
                    </Container>

                    {/* Wave divider */}
                    <Box
                        sx={{
                            height: '150px',
                            overflow: 'hidden',
                            position: 'relative',
                            marginTop: '-50px',
                        }}
                    >
                        <Box
                            component="svg"
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320"
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                bottom: 0,
                                transform: `translateY(${waveDividerParallaxValue}px)`,
                            }}
                        >
                            <path
                                fill="#ffffff"
                                fillOpacity="1"
                                d="M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,149.3C672,128,768,128,864,149.3C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            />
                        </Box>
                    </Box>
                </Paper>
            )}

            {/* Feature Highlights */}
            {!featuresLoaded ? (
                <FeaturesSkeleton />
            ) : (
                <AnimateOnScroll animation="animate__fadeInUp" threshold={0.1}>
                    <Box sx={{ py: { xs: 6, md: 10 }, position: 'relative' }}>
                        <Container maxWidth="lg">
                            <Fade in={true} timeout={1000}>
                                <Box>
                                    <Typography
                                        variant="h3"
                                        align="center"
                                        gutterBottom
                                        sx={{
                                            fontWeight: 800,
                                            mb: 2,
                                            background: 'linear-gradient(90deg, #1976d2, #6a00ea)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            textShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                                        }}
                                    >
                                        Our Features
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        color="text.secondary"
                                        sx={{ mb: 6, maxWidth: 700, mx: 'auto', fontWeight: 400 }}
                                    >
                                        Designed to make managing your health easier and more convenient
                                    </Typography>

                                    <Grid container spacing={4}>
                                        {features.map((feature, index) => (
                                            <Grid item xs={12} sm={6} md={3} key={feature.title}>
                                                <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }}>
                                                    <Card
                                                        elevation={4}
                                                        sx={{
                                                            borderRadius: 4,
                                                            height: '100%',
                                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                            transform: 'translateY(0)',
                                                            position: 'relative',
                                                            overflow: 'hidden',
                                                            '&:hover': {
                                                                transform: 'translateY(-12px)',
                                                                boxShadow: (theme) => `0 12px 28px rgba(0,0,0,0.15), 0 0 0 2px ${feature.hoverColor}22`,
                                                                '& .feature-icon-container': {
                                                                    transform: 'scale(1.1)',
                                                                    backgroundColor: `${feature.hoverColor}22`,
                                                                },
                                                                '& .feature-icon': {
                                                                    transform: 'scale(1.15)',
                                                                    color: feature.hoverColor,
                                                                },
                                                                '& .feature-pill': {
                                                                    opacity: 1,
                                                                    transform: 'translateY(0)',
                                                                }
                                                            },
                                                            '&::before': {
                                                                content: '""',
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                width: '100%',
                                                                height: '4px',
                                                                background: `linear-gradient(90deg, ${feature.color}, ${feature.hoverColor})`,
                                                                opacity: 0.8,
                                                            }
                                                        }}
                                                    >
                                                        <Box sx={{
                                                            textAlign: 'center',
                                                            pt: 5,
                                                            pb: 3,
                                                            px: 3,
                                                            position: 'relative',
                                                        }}>
                                                            <Box
                                                                className="feature-pill"
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: 12,
                                                                    right: 12,
                                                                    borderRadius: '12px',
                                                                    backgroundColor: `${feature.color}22`,
                                                                    color: feature.color,
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: 600,
                                                                    px: 1.5,
                                                                    py: 0.5,
                                                                    opacity: 0,
                                                                    transform: 'translateY(-10px)',
                                                                    transition: 'all 0.3s ease-out',
                                                                }}
                                                            >
                                                                Popular
                                                            </Box>
                                                            <Box
                                                                className="feature-icon-container"
                                                                sx={{
                                                                    display: 'inline-flex',
                                                                    p: 2,
                                                                    borderRadius: '50%',
                                                                    mb: 2.5,
                                                                    backgroundColor: `${feature.color}11`,
                                                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                                }}
                                                            >
                                                                <Box
                                                                    className="feature-icon"
                                                                    sx={{
                                                                        color: feature.color,
                                                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                                    }}
                                                                >
                                                                    {feature.icon}
                                                                </Box>
                                                            </Box>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    fontWeight: 700,
                                                                    mb: 1.5,
                                                                    color: 'text.primary',
                                                                }}
                                                            >
                                                                {feature.title}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                                sx={{
                                                                    lineHeight: 1.6,
                                                                    mb: 2.5
                                                                }}
                                                            >
                                                                {feature.description}
                                                            </Typography>
                                                            <Button
                                                                size="small"
                                                                sx={{
                                                                    color: feature.color,
                                                                    borderRadius: '12px',
                                                                    textTransform: 'none',
                                                                    fontWeight: 600,
                                                                    '&:hover': {
                                                                        backgroundColor: `${feature.color}11`,
                                                                    }
                                                                }}
                                                                endIcon={<ArrowForward fontSize="small" />}
                                                            >
                                                                Learn more
                                                            </Button>
                                                        </Box>
                                                    </Card>
                                                </Zoom>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </Fade>
                        </Container>
                    </Box>
                </AnimateOnScroll>
            )}

            {/* How It Works */}
            {!stepsLoaded ? (
                <StepsSkeleton />
            ) : (
                <AnimateOnScroll animation="animate__fadeInRight" threshold={0.1} delay={0.2}>
                    <Box
                        sx={{
                            py: { xs: 8, md: 12 },
                            backgroundColor: theme.palette.mode === 'light' ? 'rgba(25, 118, 210, 0.05)' : 'rgba(66, 66, 66, 0.6)',
                            position: 'relative',
                        }}
                    >
                        {/* Top wave divider */}
                        <Box
                            sx={{
                                height: '150px',
                                overflow: 'hidden',
                                position: 'absolute',
                                top: '-1px',
                                left: 0,
                                right: 0,
                                transform: 'rotate(180deg)',
                            }}
                        >
                            <Box
                                component="svg"
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1440 320"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <path
                                    fill="#ffffff"
                                    fillOpacity="1"
                                    d="M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,149.3C672,128,768,128,864,149.3C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                                />
                            </Box>
                        </Box>

                        <Container maxWidth="lg" sx={{ pt: 8 }}>
                            <Fade in={true} timeout={1000}>
                                <Box>
                                    <Typography
                                        variant="h3"
                                        align="center"
                                        gutterBottom
                                        sx={{
                                            fontWeight: 800,
                                            mb: 2,
                                            background: 'linear-gradient(90deg, #43a047, #1976d2)',
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            textShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                                        }}
                                    >
                                        How It Works
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        color="text.secondary"
                                        sx={{ mb: 8, maxWidth: 700, mx: 'auto', fontWeight: 400 }}
                                    >
                                        Get your medications in three simple steps
                                    </Typography>

                                    <Grid container spacing={5} alignItems="stretch">
                                        {steps.map((step, index) => (
                                            <Grid item xs={12} md={4} key={step.label}>
                                                <Zoom in={true} style={{ transitionDelay: `${index * 200}ms` }}>
                                                    <Paper
                                                        elevation={4}
                                                        sx={{
                                                            p: 4,
                                                            height: '100%',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            textAlign: 'center',
                                                            borderRadius: 4,
                                                            position: 'relative',
                                                            overflow: 'hidden',
                                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                            '&:hover': {
                                                                transform: 'translateY(-12px)',
                                                                boxShadow: `0 18px 40px rgba(0,0,0,0.12)`,
                                                                '& .step-number': {
                                                                    transform: 'scale(1.12) rotate(10deg)',
                                                                    boxShadow: `0 6px 20px ${step.color}80`,
                                                                },
                                                                '& .step-icon': {
                                                                    transform: 'scale(1.1) rotate(-5deg)',
                                                                    color: 'white',
                                                                },
                                                                '& .step-highlight': {
                                                                    opacity: 1,
                                                                }
                                                            },
                                                        }}
                                                    >
                                                        <Box
                                                            className="step-highlight"
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                width: '100%',
                                                                height: '100%',
                                                                background: `linear-gradient(135deg, ${step.color}05 0%, ${step.color}15 100%)`,
                                                                opacity: 0,
                                                                transition: 'opacity 0.5s ease',
                                                                zIndex: 0,
                                                            }}
                                                        />

                                                        <Box
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                right: 0,
                                                                height: '5px',
                                                                background: `linear-gradient(90deg, ${step.color}, ${step.color}aa)`,
                                                            }}
                                                        />

                                                        <Box
                                                            className="step-number"
                                                            sx={{
                                                                position: 'absolute',
                                                                top: 16,
                                                                left: 16,
                                                                width: 30,
                                                                height: 30,
                                                                borderRadius: '50%',
                                                                backgroundColor: step.color,
                                                                color: 'white',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontWeight: 'bold',
                                                                fontSize: '1rem',
                                                                boxShadow: `0 4px 10px ${step.color}40`,
                                                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                                zIndex: 2,
                                                            }}
                                                        >
                                                            {index + 1}
                                                        </Box>

                                                        <Avatar
                                                            sx={{
                                                                bgcolor: step.color,
                                                                width: 80,
                                                                height: 80,
                                                                mb: 2.5,
                                                                mt: 1.5,
                                                                boxShadow: `0 6px 16px ${step.color}40`,
                                                                position: 'relative',
                                                                zIndex: 1,
                                                            }}
                                                        >
                                                            <Box
                                                                className="step-icon"
                                                                sx={{
                                                                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                                }}
                                                            >
                                                                {step.icon}
                                                            </Box>
                                                        </Avatar>

                                                        <Typography
                                                            variant="h5"
                                                            sx={{
                                                                mb: 2,
                                                                fontWeight: 700,
                                                                color: step.color,
                                                                position: 'relative',
                                                                zIndex: 1,
                                                            }}
                                                        >
                                                            {step.label}
                                                        </Typography>

                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                flex: 1,
                                                                mb: 2,
                                                                position: 'relative',
                                                                zIndex: 1,
                                                                fontWeight: 500,
                                                                color: 'text.primary',
                                                            }}
                                                        >
                                                            {step.description}
                                                        </Typography>

                                                        <Box
                                                            sx={{
                                                                backgroundColor: `${step.color}15`,
                                                                borderRadius: 2,
                                                                p: 1.5,
                                                                width: '100%',
                                                                position: 'relative',
                                                                zIndex: 1,
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    color: 'text.secondary',
                                                                    fontSize: '0.875rem',
                                                                    fontStyle: 'italic',
                                                                }}
                                                            >
                                                                {step.detail}
                                                            </Typography>
                                                        </Box>

                                                        {index < steps.length - 1 && (
                                                            <Box
                                                                sx={{
                                                                    display: { xs: 'none', md: 'block' },
                                                                    position: 'absolute',
                                                                    right: -30,
                                                                    top: '50%',
                                                                    transform: 'translateY(-50%)',
                                                                    color: step.color,
                                                                    zIndex: 1,
                                                                    animation: 'pulse-arrow 1.5s infinite ease-in-out',
                                                                    '@keyframes pulse-arrow': {
                                                                        '0%': { transform: 'translateY(-50%) translateX(0)' },
                                                                        '50%': { transform: 'translateY(-50%) translateX(5px)' },
                                                                        '100%': { transform: 'translateY(-50%) translateX(0)' },
                                                                    }
                                                            }}
                                                            >
                                                                <KeyboardArrowRight sx={{ fontSize: 40 }} />
                                                            </Box>
                                                        )}
                                                    </Paper>
                                                </Zoom>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            mt: 6,
                                        }}
                                    >
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            sx={{
                                                borderRadius: 28,
                                                px: 4,
                                                py: 1.5,
                                                fontSize: '1rem',
                                                fontWeight: 500,
                                                borderColor: 'rgba(25, 118, 210, 0.5)',
                                                '&:hover': {
                                                    borderColor: '#1976d2',
                                                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                                }
                                            }}
                                            endIcon={<PlayArrow />}
                                        >
                                            Watch Demo
                                        </Button>
                                    </Box>
                                </Box>
                            </Fade>
                        </Container>

                        {/* Bottom wave divider */}
                        <Box
                            sx={{
                                height: '150px',
                                overflow: 'hidden',
                                position: 'absolute',
                                bottom: '-1px',
                                left: 0,
                                right: 0,
                            }}
                        >
                            <Box
                                component="svg"
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1440 320"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <path
                                    fill="#ffffff"
                                    fillOpacity="1"
                                    d="M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,149.3C672,128,768,128,864,149.3C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                                />
                            </Box>
                        </Box>
                    </Box>
                </AnimateOnScroll>
            )}

            {/* Testimonials */}
            {!testimonialsLoaded ? (
                <TestimonialsSkeleton />
            ) : (
                <AnimateOnScroll animation="animate__fadeInUp" threshold={0.1} delay={0.3}>
                    <Box sx={{ py: { xs: 8, md: 12 } }}>
                        <Container maxWidth="lg">
                            <Typography
                                variant="h3"
                                align="center"
                                gutterBottom
                                sx={{ fontWeight: 700 }}
                            >
                                What Our Customers Say
                            </Typography>
                            <Typography
                                variant="h6"
                                align="center"
                                color="text.secondary"
                                sx={{ mb: 6, maxWidth: 700, mx: 'auto', fontWeight: 400 }}
                            >
                                Join thousands of satisfied customers who trust our service
                            </Typography>

                            <Grid container spacing={4}>
                                {testimonials.map((t, index) => (
                                    <Grid item xs={12} md={6} key={t.name}>
                                        <Card
                                            elevation={4}
                                            sx={{
                                                height: '100%',
                                                borderRadius: 4,
                                                position: 'relative',
                                                overflow: 'visible',
                                                transition: 'transform 0.3s',
                                                '&:hover': {
                                                    transform: 'translateY(-8px)',
                                                }
                                            }}
                                        >
                                            <CardContent sx={{ p: 4 }}>
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: -20,
                                                        left: 30,
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: '50%',
                                                        backgroundColor: '#1976d2',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                                    }}
                                                >
                                                    <ThumbUp sx={{ color: 'white' }} />
                                                </Box>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontStyle: 'italic',
                                                        mb: 3,
                                                        lineHeight: 1.7,
                                                        fontSize: '1.1rem',
                                                    }}
                                                >
                                                    "{t.quote}"
                                                </Typography>
                                                <Divider sx={{ mb: 3 }} />
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Avatar
                                                        src={t.avatar}
                                                        alt={t.name}
                                                        sx={{ width: 56, height: 56 }}
                                                    />
                                                    <Box>
                                                        <Typography variant="subtitle1" fontWeight={600}>
                                                            {t.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {t.role}
                                                        </Typography>
                                                        <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                                                            {[...Array(t.rating)].map((_, i) => (
                                                                <Box
                                                                    key={i}
                                                                    component="span"
                                                                    sx={{
                                                                        color: '#FFB400',
                                                                        fontSize: '18px'
                                                                    }}
                                                                >
                                                                    ★
                                                                </Box>
                                                            ))}
                                                        </Stack>
                                                    </Box>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mt: 6
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{
                                        borderRadius: 28,
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1rem',
                                    }}
                                    endIcon={<ArrowForward />}
                                >
                                    View All Reviews
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                </AnimateOnScroll>
            )}

            {/* Partners Section */}
            {!partnersLoaded ? (
                <Box sx={{ py: 8, height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <AnimateOnScroll animation="animate__fadeInUp" threshold={0.1} delay={0.2}>
                    <Box
                        sx={{
                            py: 8,
                            backgroundColor: 'rgba(0,0,0,0.02)'
                        }}
                    >
                        <Container maxWidth="lg">
                            <Typography
                                variant="h4"
                                align="center"
                                sx={{ mb: 2, fontWeight: 600 }}
                            >
                                Our Partners
                            </Typography>
                            <Typography
                                variant="body1"
                                align="center"
                                color="text.secondary"
                                sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
                            >
                                Working with trusted healthcare providers
                            </Typography>

                            <Paper
                                elevation={2}
                                sx={{
                                    py: 5,
                                    px: 3,
                                    borderRadius: 4,
                                    backgroundColor: 'white'
                                }}
                            >
                                <Grid
                                    container
                                    spacing={4}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    {partners.map((p) => (
                                        <Grid item key={p.name} xs={6} sm={4} md={4}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: 100,
                                                    filter: 'grayscale(100%)',
                                                    opacity: 0.7,
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        filter: 'grayscale(0%)',
                                                        opacity: 1,
                                                    },
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={p.logo}
                                                    alt={p.name}
                                                    sx={{ height: 60, maxWidth: '100%' }}
                                                />
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Container>
                    </Box>
                </AnimateOnScroll>
            )}

            {/* Call to action */}
            <AnimateOnScroll animation="animate__fadeIn" threshold={0.1} delay={0.1}>
                <Box
                    sx={{
                        background: 'linear-gradient(135deg, #43a047, #1976d2)',
                        color: 'white',
                        py: { xs: 8, md: 10 },
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            opacity: 0.1,
                            background: 'url(/pattern.png) repeat',
                        }}
                    />
                    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={8}>
                                <Typography
                                    variant="h3"
                                    sx={{ fontWeight: 700, mb: 2 }}
                                >
                                    Ready to get started?
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 400, mb: 3, opacity: 0.9 }}
                                >
                                    Join thousands of customers who trust us with their health needs
                                </Typography>
                                <Chip
                                    label="Free delivery on first order"
                                    color="secondary"
                                    sx={{
                                        borderRadius: 4,
                                        py: 2.5,
                                        fontSize: '1rem',
                                        mb: { xs: 3, md: 0 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                                <Button
                                    component={RouterLink}
                                    to="/register"
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        borderRadius: 28,
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        backgroundColor: 'white',
                                        color: 'primary.main',
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                    endIcon={<ArrowForward />}
                                >
                                    Sign Up Now
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </AnimateOnScroll>
        </Box>
    );
};

export default Home;
