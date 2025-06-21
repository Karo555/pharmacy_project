import React from 'react';
import { Box, Container, Grid, Card, CardContent, Avatar, Typography, Divider, Stack } from '@mui/material';

interface Testimonial {
    name: string;
    role: string;
    avatar: string;
    quote: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        name: 'John Doe',
        role: 'Regular Customer',
        avatar: '/avatars/avatar1.png',
        quote: 'The prescription reminder feature has been a game-changer for managing my medications. Great service and fast delivery!',
        rating: 5,
    },
    {
        name: 'Jane Smith',
        role: 'Monthly Subscriber',
        avatar: '/avatars/avatar2.png',
        quote: 'As someone with chronic conditions, having a reliable pharmacy service is essential. Their pharmacists are knowledgeable and always available to answer questions.',
        rating: 5,
    },
];

const TestimonialsSection: React.FC = () => (
    <Box sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'transparent', // Changed from '#f9f9f9' to transparent
        position: 'relative',
        zIndex: 1
    }}>
        <Container>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 800, mb: 3 }}>
                What Our Customers Say
            </Typography>
            <Grid container spacing={4}>
                {testimonials.map((t, idx) => (
                    <Grid item xs={12} md={6} key={idx}>
                        <Card elevation={3} sx={{ borderRadius: 3, p: 2 }}>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                    <Avatar src={t.avatar} alt={t.name} sx={{ width: 56, height: 56 }} />
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            {t.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {t.role}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                                    "{t.quote}"
                                </Typography>
                                <Box>
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Box key={i} component="span" sx={{ color: '#FFD700', fontSize: '1.2rem' }}>
                                            ★
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);

export default TestimonialsSection;