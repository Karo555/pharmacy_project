import React, { useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from "../hooks/useAuth";
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import PartnersSection from '../components/Home/PartnersSection';
import CallToActionSection from '../components/Home/CallToActionSection';

const Home: React.FC = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);

    // simulate load
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ overflowX: 'hidden' }}>
            <HeroSection scrollY={0} />
            <FeaturesSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <PartnersSection />
            <CallToActionSection />
        </Box>
    );
};

export default Home;
