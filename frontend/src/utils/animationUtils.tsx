import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

// Custom hook for triggering animations when elements scroll into view
export const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls, inView };
};

// Custom hook for parallax effect on scroll
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    y: offset * speed,
    style: { transform: `translateY(${offset * speed}px)` }
  };
};

// Animation variants for different elements
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
};

// Shimmer effect for skeleton loading
export const ShimmerEffect = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      animation: 'shimmer 2s infinite linear',
      background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
      backgroundSize: '200% 100%',
    }}
  />
);

// Custom animated Box component using framer-motion
export const MotionBox = motion.div;
