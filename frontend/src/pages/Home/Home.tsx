import React from 'react';
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
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const features = [
    {
        icon: <LocalShipping fontSize="large" sx={{ color: '#1976d2' }} />,
        title: 'Fast Delivery',
        description: 'Medications delivered to your doorstep within 24 hours.'
    },
    {
        icon: <HeadsetMic fontSize="large" sx={{ color: '#7e57c2' }} />,
        title: '24/7 Expert Support',
        description: 'Pharmacists available around the clock to answer your questions.'
    },
    {
        icon: <Lock fontSize="large" sx={{ color: '#43a047' }} />,
        title: 'Secure Payments',
        description: 'Your financial information is protected with bank-level security.'
    },
    {
        icon: <Alarm fontSize="large" sx={{ color: '#f44336' }} />,
        title: 'Prescription Reminders',
        description: 'Never miss a dose with our smart reminder system.'
    },
];

const steps = [
    {
        icon: <MedicalServices fontSize="large" />,
        label: 'Upload Prescription',
        description: 'Take a photo or upload your doctor\'s prescription through our secure platform.'
    },
    {
        icon: <HealthAndSafety fontSize="large" />,
        label: 'Pharmacist Review',
        description: 'Our licensed pharmacists verify your prescription and prepare your medication.'
    },
    {
        icon: <LocalShipping fontSize="large" />,
        label: 'Delivered to Your Door',
        description: 'Receive your medication in discreet packaging with temperature control when needed.'
    },
];

const testimonials = [
    {
        name: 'John Doe',
        role: 'Regular Customer',
        avatar: '/avatar1.png',
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

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <Box sx={{ overflow: 'hidden' }}>
            {/* Hero Section */}
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
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: 0.1,
                        background: 'url(/pattern.png) repeat',
                    }}
                />
                <Container maxWidth="lg">
                    <Grid container spacing={3} sx={{ py: { xs: 8, md: 12 } }} alignItems="center">
                        <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' }, zIndex: 1 }}>
                            <Box
                                component="img"
                                src="/logo.png"
                                alt="Logo"
                                sx={{ height: 80, mb: 3, display: 'inline-block' }}
                            />
                            <Typography
                                variant="h2"
                                component="h1"
                                gutterBottom
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    textShadow: '0px 2px 4px rgba(0,0,0,0.2)'
                                }}
                            >
                                Your health, our priority
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 4,
                                    fontWeight: 400,
                                    maxWidth: { md: '80%' },
                                    lineHeight: 1.6,
                                    opacity: 0.9
                                }}
                            >
                                Professional online pharmacy with secure delivery and expert care.
                            </Typography>
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                                sx={{
                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                    mb: { xs: 4, md: 0 }
                                }}
                            >
                                <Button
                                    component={RouterLink}
                                    to="/register"
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        borderRadius: '28px',
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        backgroundColor: 'white',
                                        color: 'primary.main',
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                                        },
                                        transition: 'all 0.3s ease-in-out',
                                    }}
                                    endIcon={<ArrowForward />}
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
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        color: '#fff',
                                        borderColor: 'rgba(255,255,255,0.6)',
                                        '&:hover': {
                                            borderColor: '#fff',
                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                        },
                                    }}
                                >
                                    Sign In
                                </Button>
                            </Stack>
                        </Grid>
                        {isMediumScreen && (
                            <Grid item md={6} sx={{ zIndex: 1 }}>
                                <Box
                                    component="img"
                                    src="/hero-image.png"
                                    alt="Online Pharmacy"
                                    sx={{
                                        width: '100%',
                                        maxWidth: 500,
                                        height: 'auto',
                                        display: 'block',
                                        ml: 'auto',
                                        filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.25))',
                                        transform: 'translateY(-20px)',
                                    }}
                                />
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

            {/* Feature Highlights */}
            <Box sx={{ py: { xs: 6, md: 10 }, position: 'relative' }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            mb: 1
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
                                <Card
                                    elevation={4}
                                    sx={{
                                        borderRadius: 4,
                                        height: '100%',
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                                        },
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Box sx={{
                                        textAlign: 'center',
                                        pt: 4,
                                        pb: 2,
                                        px: 2
                                    }}>
                                        <Box
                                            sx={{
                                                display: 'inline-flex',
                                                p: 1.5,
                                                borderRadius: '50%',
                                                mb: 2,
                                                backgroundColor: `rgba(${index % 2 === 0 ? '25, 118, 210' : '126, 87, 194'}, 0.1)`,
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {feature.description}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* How It Works */}
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
                    <Typography
                        variant="h3"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 700 }}
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
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: '8px',
                                            background: index === 0 ? '#1976d2' : index === 1 ? '#7e57c2' : '#43a047',
                                        }}
                                    />
                                    <Avatar
                                        sx={{
                                            bgcolor: index === 0 ? '#1976d2' : index === 1 ? '#7e57c2' : '#43a047',
                                            width: 64,
                                            height: 64,
                                            mb: 2,
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                                        }}
                                    >
                                        {step.icon}
                                    </Avatar>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {step.label}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ flex: 1 }}
                                    >
                                        {step.description}
                                    </Typography>

                                    {index < steps.length - 1 && (
                                        <Box
                                            sx={{
                                                display: { xs: 'none', md: 'block' },
                                                position: 'absolute',
                                                right: -30,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: 'primary.main',
                                                zIndex: 1,
                                            }}
                                        >
                                            <KeyboardArrowRight sx={{ fontSize: 40 }} />
                                        </Box>
                                    )}
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
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

            {/* Testimonials */}
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

            {/* Partners Section */}
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

            {/* Call to action */}
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
        </Box>
    );
};

export default Home;
