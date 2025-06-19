import React, { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress, Fade } from '@mui/material';
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
    const [scrollY, setScrollY] = useState(0);
    const [sectionsVisible, setSectionsVisible] = useState({
        features: false,
        howItWorks: false,
        testimonials: false,
        partners: false,
        callToAction: false
    });

    // Refs for intersection observer
    const featuresRef = useRef(null);
    const howItWorksRef = useRef(null);
    const testimonialsRef = useRef(null);
    const partnersRef = useRef(null);
    const callToActionRef = useRef(null);

    // Handle scroll for parallax effects
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Set up intersection observers for animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetId = entry.target.id;
                    setSectionsVisible(prev => ({ ...prev, [targetId]: true }));
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        if (featuresRef.current) observer.observe(featuresRef.current);
        if (howItWorksRef.current) observer.observe(howItWorksRef.current);
        if (testimonialsRef.current) observer.observe(testimonialsRef.current);
        if (partnersRef.current) observer.observe(partnersRef.current);
        if (callToActionRef.current) observer.observe(callToActionRef.current);

        return () => observer.disconnect();
    }, [loading]);

    // simulate load
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(135deg, #0a6cce, #6a00ea)'
            }}>
                <CircularProgress sx={{ color: 'white' }} size={60} />
            </Box>
        );
    }

    return (
        <Box sx={{ overflowX: 'hidden' }}>
            <HeroSection scrollY={scrollY} />

            <Fade in={sectionsVisible.features} timeout={1000}>
                <Box ref={featuresRef} id="features">
                    <FeaturesSection />
                </Box>
            </Fade>

            <Fade in={sectionsVisible.howItWorks} timeout={1000}>
                <Box ref={howItWorksRef} id="howItWorks">
                    <HowItWorksSection />
                </Box>
            </Fade>

            <Fade in={sectionsVisible.testimonials} timeout={1000}>
                <Box ref={testimonialsRef} id="testimonials">
                    <TestimonialsSection />
                </Box>
            </Fade>

            <Fade in={sectionsVisible.partners} timeout={1000}>
                <Box ref={partnersRef} id="partners">
                    <PartnersSection />
                </Box>
            </Fade>

            <Fade in={sectionsVisible.callToAction} timeout={1000}>
                <Box ref={callToActionRef} id="callToAction">
                    <CallToActionSection />
                </Box>
            </Fade>
        </Box>
    );
};

export default Home;
