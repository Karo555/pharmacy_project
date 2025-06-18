import React from 'react';
import { Box, Container, Grid, Card, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import LockIcon from '@mui/icons-material/Lock';
import AlarmIcon from '@mui/icons-material/Alarm';

const features = [
    {
        icon: <LocalShippingIcon fontSize="large" />,
        title: 'Fast Delivery',
        description: 'Medications delivered to your doorstep within 24 hours.',
        color: '#1976d2',
        hoverColor: '#1565c0',
    },
    {
        icon: <HeadsetMicIcon fontSize="large" />,
        title: '24/7 Expert Support',
        description: 'Pharmacists available around the clock to answer your questions.',
        color: '#7e57c2',
        hoverColor: '#6a4caf',
    },
    {
        icon: <LockIcon fontSize="large" />,
        title: 'Secure Payments',
        description: 'Your financial information is protected with bank-level security.',
        color: '#43a047',
        hoverColor: '#388e3c',
    },
    {
        icon: <AlarmIcon fontSize="large" />,
        title: 'Prescription Reminders',
        description: 'Never miss a dose with our smart reminder system.',
        color: '#f44336',
        hoverColor: '#e53935',
    },
];

const FeaturesSection: React.FC = () => (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#f9f9f9' }}>
        <Container>
            <Typography
                variant="h3"
                align="center"
                gutterBottom
                sx={{ fontWeight: 800, mb: 3 }}
            >
                Our Features
            </Typography>
            <Grid container spacing={4}>
                {features.map((feature, idx) => (
                    <Grid item xs={12} sm={6} md={3} key={idx}>
                        <Card
                            elevation={3}
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                borderRadius: 3,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: `0 12px 28px ${feature.hoverColor}33`,
                                },
                            }}
                        >
                            <Box sx={{ mb: 2, color: feature.color }}>{feature.icon}</Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                {feature.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {feature.description}
                            </Typography>
                            <Button
                                size="small"
                                endIcon={<ArrowForwardIcon />}
                                sx={{ color: feature.color, textTransform: 'none' }}
                            >
                                Learn More
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);

export default FeaturesSection;