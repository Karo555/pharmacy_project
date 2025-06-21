import React from 'react';
import { Box, Toolbar, Paper } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import useThemeMode from '../../hooks/useThemeMode';

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
                transition: 'background-color 0.3s ease, color 0.3s ease'
            }}
        >
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
    );
};

export default Layout;