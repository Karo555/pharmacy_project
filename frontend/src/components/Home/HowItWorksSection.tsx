import React from 'react';
import { Box, Container, Grid, Paper, Avatar, Typography } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const steps = [
    {
        icon: <MedicalServicesIcon fontSize="large" />,
        label: 'Upload Prescription',
        description: 'Take a photo or upload your doctor\'s prescription through our secure platform.',
        color: '#1976d2',
    },
    {
        icon: <HealthAndSafetyIcon fontSize="large" />,
        label: 'Pharmacist Review',
        description: 'Our licensed pharmacists verify your prescription and prepare your medication.',
        color: '#7e57c2',
    },
    {
        icon: <LocalShippingIcon fontSize="large" />,
        label: 'Delivered to Your Door',
        description: 'Receive your medication in discreet packaging with temperature control when needed.',
        color: '#43a047',
    },
];

const HowItWorksSection: React.FC = () => (
    <Box sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'transparent', // Changed from '#fff' to transparent
        position: 'relative',
        zIndex: 1 // Added for proper stacking
    }}>
        <Container>
            <Typography
                variant="h3"
                align="center"
                gutterBottom
                sx={{ fontWeight: 800, mb: 3 }}
            >
                How It Works
            </Typography>
            <Grid container spacing={4}>
                {steps.map((step, idx) => (
                    <Grid item xs={12} md={4} key={idx}>
                        <Paper
                            elevation={3}
                            sx={{ p: 4, textAlign: 'center', position: 'relative', borderRadius: 3 }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: step.color,
                                    width: 80,
                                    height: 80,
                                    mb: 2,
                                    mx: 'auto',
                                }}
                            >
                                {step.icon}
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                {`${idx + 1}. ${step.label}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {step.description}
                            </Typography>
                            {idx < steps.length - 1 && (
                                <Box sx={{ position: 'absolute', top: '50%', right: -20, transform: 'translateY(-50%)' }}>
                                    <KeyboardArrowRightIcon sx={{ fontSize: 36, color: step.color }} />
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);

export default HowItWorksSection;