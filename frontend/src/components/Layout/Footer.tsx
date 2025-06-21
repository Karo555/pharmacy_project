import React from 'react';
import { Box, Container, Typography, Link, Grid, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import useThemeMode from '../../hooks/useThemeMode';

const Footer: React.FC = () => {
    const { themeColors } = useThemeMode();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.dark',
                color: 'white',
                py: 4,
                mt: 'auto',
                borderTop: `1px solid ${themeColors.border}`,
                transition: 'background-color 0.3s ease'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                            © {new Date().getFullYear()} MedTrack. All rights reserved.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                            <Link component={RouterLink} to="/terms" color="inherit" sx={{ mx: 1 }}>Terms</Link>
                            <Link component={RouterLink} to="/privacy" color="inherit" sx={{ mx: 1 }}>Privacy</Link>
                            <IconButton component="a" href="https://facebook.com" color="inherit">
                                <Facebook />
                            </IconButton>
                            <IconButton component="a" href="https://twitter.com" color="inherit">
                                <Twitter />
                            </IconButton>
                            <IconButton component="a" href="https://instagram.com" color="inherit">
                                <Instagram />
                            </IconButton>
                            <IconButton component="a" href="https://linkedin.com" color="inherit">
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;