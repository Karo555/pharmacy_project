import React from 'react';
import { Box, Toolbar, Paper } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import useThemeMode from '../../hooks/useThemeMode';
import Aurora from '../ui/Aurora';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { themeColors } = useThemeMode();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bgcolor: themeColors.backgroundPrimary,
                color: themeColors.textPrimary,
                transition: 'background-color 0.3s ease, color 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Aurora background for the entire page */}
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0
            }}>
                <Aurora
                    colorStops={["#0A2463", "#3E92CC", "#2176FF"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </Box>

            {/* Content with higher z-index */}
            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                {/* spacer equal to AppBar height */}
                <Toolbar />
                <Paper
                    component="main"
                    elevation={0}
                    sx={{
                        flex: 1,
                        p: 3,
                        bgcolor: 'transparent',
                        color: 'inherit'
                    }}
                >
                    {children}
                </Paper>
                <Footer />
            </Box>
        </Box>
    );
};

export default Layout;