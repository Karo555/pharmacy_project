import React from 'react';
import { Box, Container, Grid, Card, Typography, Button, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import LockIcon from '@mui/icons-material/Lock';
import AlarmIcon from '@mui/icons-material/Alarm';
import { motion } from 'framer-motion';
import '../../styles/globals.css';

const features = [
    {
        icon: <LocalShippingIcon fontSize="large" />,
        title: 'Fast Delivery',
        description: 'Medications delivered to your doorstep within 24 hours.',
        color: 'var(--color-primary)',
        hoverColor: 'var(--color-primary-dark)',
    },
    {
        icon: <HeadsetMicIcon fontSize="large" />,
        title: '24/7 Expert Support',
        description: 'Pharmacists available around the clock to answer your questions.',
        color: 'var(--color-secondary)',
        hoverColor: '#6a4caf',
    },
    {
        icon: <LockIcon fontSize="large" />,
        title: 'Secure Payments',
        description: 'Your financial information is protected with bank-level security.',
        color: 'var(--color-success)',
        hoverColor: '#388e3c',
    },
    {
        icon: <AlarmIcon fontSize="large" />,
        title: 'Prescription Reminders',
        description: 'Never miss a dose with our smart reminder system.',
        color: 'var(--color-accent)',
        hoverColor: '#e53935',
    },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
    const theme = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="full-width"
            style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100%'
            }}
        >
            <Card
                className="card shadow-md rounded-lg p-4"
                sx={{
                    height: '100%',
                    width: '100%',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'rgba(30, 30, 30, 0.7)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between', // Changed to space-between for better layout
                    textAlign: 'center',
                    padding: '2rem',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 'var(--shadow-lg)',
                    }
                }}
            >
                <Box
                    sx={{
                        mb: 3,
                        color: feature.color,
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            p: 3, // Increased padding for larger icon area
                            borderRadius: '50%',
                            bgcolor: `${feature.color}25`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '80px', // Fixed width
                            height: '80px', // Fixed height
                        }}
                    >
                        {feature.icon}
                    </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            color: '#ffffff',
                            height: '32px', // Fixed height for title
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {feature.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 3,
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            color: 'rgba(255, 255, 255, 0.85)',
                            height: '80px', // Fixed height for description
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {feature.description}
                    </Typography>
                </Box>
                <Button
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        color: feature.color,
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: `${feature.color}20`,
                        }
                    }}
                >
                    Learn More
                </Button>
            </Card>
        </motion.div>
    );
};

const FeaturesSection: React.FC = () => {
    return (
        <Box
            sx={{
                py: { xs: 8, md: 12 },
                backgroundColor: 'transparent',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}
        >
            {/* Background Elements */}
            <Box
                sx={{
                    position: 'absolute',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(25,118,210,0.05) 0%, rgba(25,118,210,0) 70%)',
                    top: -500,
                    left: '10%',
                    zIndex: 0,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(126,87,194,0.05) 0%, rgba(126,87,194,0) 70%)',
                    bottom: -200,
                    right: '5%',
                    zIndex: 0,
                }}
            />

            <Container
                maxWidth="lg"
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    sx={{ textAlign: 'center', mb: 6 }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            background: 'linear-gradient(135deg, #1976d2, #7e57c2)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Our Features
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 400,
                            color: 'text.secondary',
                            maxWidth: 700,
                            mx: 'auto',
                            fontSize: { xs: '1rem', md: '1.1rem' },
                        }}
                    >
                        Discover the innovative services that set our pharmacy apart and make managing your health easier than ever.
                    </Typography>
                </Box>

                <Grid
                    container
                    spacing={4}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%'
                    }}
                >
                    {features.map((feature, idx) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={3}
                            key={idx}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                height: { xs: 'auto', md: '400px' }, // Fixed height for desktop
                            }}
                        >
                            <FeatureCard feature={feature} index={idx} />
                        </Grid>
                    ))}
                </Grid>

                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true, margin: "-50px" }}
                    sx={{
                        mt: 8,
                        textAlign: 'center'
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            borderRadius: '50px',
                            px: 4,
                            py: 1.5,
                            fontWeight: 600,
                            background: 'linear-gradient(90deg, #1976d2, #7e57c2)',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                background: 'linear-gradient(90deg, #1565c0, #6a4caf)',
                                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.15)',
                            }
                        }}
                    >
                        Explore All Services
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default FeaturesSection;