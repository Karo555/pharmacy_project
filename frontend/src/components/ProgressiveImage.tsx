import React, { useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from '../pages/Home/Home.module.css';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  placeholderSrc,
  className,
  style,
  width,
  height
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Generate a very low quality placeholder if not provided
  const placeholder = placeholderSrc || `${src}?w=20&q=10`;

  return (
    <Box
      className={className}
      style={{
        ...style,
        overflow: 'hidden',
        position: 'relative',
        width,
        height
      }}
    >
      {!isLoaded && (
        <Box
          className="skeleton"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1
          }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="100%"
            sx={{
              bgcolor: 'rgba(200, 200, 200, 0.1)',
              '&::after': {
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                animation: 'wave 1.6s linear 0.5s infinite'
              }
            }}
          />
        </Box>
      )}

      {/* Placeholder image with blur effect */}
      <Box
        component="img"
        src={placeholder}
        alt={alt}
        className={`${styles.placeholderImage} ${isLoaded ? styles.fadeOut : ''}`}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(20px)',
          transform: 'scale(1.1)',
          transition: 'opacity 0.3s ease-out',
          opacity: isLoaded ? 0 : 1,
          zIndex: 2
        }}
      />

      {/* Actual image */}
      <LazyLoadImage
        alt={alt}
        src={src}
        effect="opacity"
        afterLoad={() => setIsLoaded(true)}
        beforeLoad={() => setIsVisible(true)}
        wrapperClassName={styles.imageWrapper}
        className={`${styles.actualImage} ${isLoaded ? styles.fadeIn : ''}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in',
          zIndex: 3,
          position: 'relative'
        }}
      />
    </Box>
  );
};

export default ProgressiveImage;
