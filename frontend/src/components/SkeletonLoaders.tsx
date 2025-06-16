// File: frontend/src/components/Skeletons.tsx
import React from 'react';
import {
    Box,
    Container,
    Skeleton,
    Card,
    CardContent,
    Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid';

export const HeroSkeleton: React.FC = () => (
    <Box sx={{ overflow: 'hidden' }}>
        <Box
            sx={{
                background: 'linear-gradient(135deg, #0a6cce, #6a00ea)',
                color: '#fff',
                position: 'relative',
                overflow: 'hidden',
                py: { xs: 8, md: 12 },
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ textAlign: { xs: 'center', md: 'left' }, zIndex: 1 }}
                    >
                        <Skeleton
                            variant="rectangular"
                            width={180}
                            height={36}
                            sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}
                        />
                        <Skeleton
                            variant="rectangular"
                            height={80}
                            sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}
                        />
                        <Skeleton
                            variant="rectangular"
                            height={60}
                            width="90%"
                            sx={{ mb: 4, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}
                        />
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            sx={{ mb: 4 }}
                        >
                            <Skeleton
                                variant="rectangular"
                                width={150}
                                height={50}
                                sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 28 }}
                            />
                            <Skeleton
                                variant="rectangular"
                                width={150}
                                height={50}
                                sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 28 }}
                            />
                        </Stack>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ display: { xs: 'none', md: 'block' }, zIndex: 1 }}
                    >
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={400}
                            sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 4 }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </Box>
);

export const FeaturesSkeleton: React.FC = () => (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
            <Skeleton
                variant="rectangular"
                width={250}
                height={60}
                sx={{ mx: 'auto', mb: 2, borderRadius: 2 }}
            />
            <Skeleton
                variant="rectangular"
                width={500}
                height={40}
                sx={{ mx: 'auto', mb: 6, borderRadius: 2 }}
            />

            <Grid container spacing={4}>
                {Array.from({ length: 4 }).map((_, idx) => (
                    <Grid item xs={12} sm={6} md={3} key={idx}>
                        <Card elevation={2} sx={{ borderRadius: 4, height: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                    <Skeleton variant="circular" width={60} height={60} />
                                </Box>
                                <Skeleton
                                    variant="rectangular"
                                    height={30}
                                    sx={{ mb: 1, borderRadius: 1 }}
                                />
                                <Skeleton
                                    variant="rectangular"
                                    height={80}
                                    sx={{ borderRadius: 1 }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);

export const StepsSkeleton: React.FC = () => (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'rgba(25,118,210,0.05)' }}>
        <Container maxWidth="lg">
            <Skeleton
                variant="rectangular"
                width={300}
                height={60}
                sx={{ mx: 'auto', mb: 2, borderRadius: 2 }}
            />
            <Skeleton
                variant="rectangular"
                width={500}
                height={40}
                sx={{ mx: 'auto', mb: 6, borderRadius: 2 }}
            />

            <Grid container spacing={4}>
                {Array.from({ length: 3 }).map((_, idx) => (
                    <Grid item xs={12} md={4} key={idx}>
                        <Card elevation={2} sx={{ borderRadius: 4, height: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Skeleton
                                        variant="circular"
                                        width={40}
                                        height={40}
                                        sx={{ mr: 2 }}
                                    />
                                    <Skeleton
                                        variant="rectangular"
                                        width={120}
                                        height={30}
                                        sx={{ borderRadius: 1 }}
                                    />
                                </Box>
                                <Skeleton
                                    variant="rectangular"
                                    height={100}
                                    sx={{ mb: 2, borderRadius: 1 }}
                                />
                                <Skeleton
                                    variant="rectangular"
                                    height={40}
                                    sx={{ width: '70%', borderRadius: 1 }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);

export const TestimonialsSkeleton: React.FC = () => (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
            <Skeleton
                variant="rectangular"
                width={300}
                height={60}
                sx={{ mx: 'auto', mb: 2, borderRadius: 2 }}
            />
            <Skeleton
                variant="rectangular"
                width={500}
                height={40}
                sx={{ mx: 'auto', mb: 6, borderRadius: 2 }}
            />

            <Grid container spacing={4} justifyContent="center">
                {Array.from({ length: 2 }).map((_, idx) => (
                    <Grid item xs={12} md={6} key={idx}>
                        <Card elevation={2} sx={{ borderRadius: 4, height: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <Skeleton
                                        variant="circular"
                                        width={60}
                                        height={60}
                                        sx={{ mr: 2 }}
                                    />
                                    <Box>
                                        <Skeleton variant="text" width={120} height={30} />
                                        <Skeleton variant="text" width={80} height={20} />
                                    </Box>
                                </Box>
                                <Skeleton
                                    variant="rectangular"
                                    height={120}
                                    sx={{ borderRadius: 1 }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);