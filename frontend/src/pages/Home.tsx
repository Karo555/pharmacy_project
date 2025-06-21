import React, { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Fade } from '@mui/material';
import { useAuth } from "../hooks/useAuth";
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import PartnersSection from '../components/Home/PartnersSection';
import CallToActionSection from '../components/Home/CallToActionSection';
import Silk from '../components/ui/Silk';

const Home: React.FC = () => {
    const { token } = useAuth();
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
    }, []);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <Box sx={{ overflowX: 'hidden', position: 'relative' }}>
            {/* Silk background for the entire page */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -3,
                }}
            >
                <Silk
                    speed={5}
                    scale={1.2}
                    noiseIntensity={2.5}
                    rotation={0.2}
                    useDynamicTheme={true}
                />
            </Box>

            {/* Semi-transparent overlay to ensure text readability */}
            <Box
                sx={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.3), rgba(0, 0, 0, 0.4))',
                    zIndex: -2,
                }}
            />

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
