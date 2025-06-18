import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';

interface Partner {
    name: string;
    logo: string;
}

const partners: Partner[] = [
    { name: 'Partner A', logo: '/partners/partner1.png' },
    { name: 'Partner B', logo: '/partners/partner2.png' },
    { name: 'Partner C', logo: '/partners/partner3.png' },
];

const PartnersSection: React.FC = () => (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#fff' }}>
        <Container>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Our Partners
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {partners.map((p, idx) => (
                    <Grid item xs={6} sm={4} md={3} key={idx}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 3,
                                filter: 'grayscale(100%)',
                                opacity: 0.7,
                                transition: 'filter 0.3s, opacity 0.3s',
                                '&:hover': {
                                    filter: 'grayscale(0%)',
                                    opacity: 1,
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src={p.logo}
                                alt={p.name}
                                sx={{ maxHeight: 60, width: 'auto' }}
                            />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);

export default PartnersSection;