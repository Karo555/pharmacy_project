import React from 'react';
import { Box, Toolbar } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        {/* spacer equal to AppBar height */}
        <Toolbar />
        <Box component="main" sx={{ flex: 1, p: 3 }}>
            {children}
        </Box>
        <Footer />
    </Box>
);

export default Layout;