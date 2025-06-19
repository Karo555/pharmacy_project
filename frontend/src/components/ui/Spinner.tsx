import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import '../../styles/globals.css';

interface SpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
  text?: string;
  fullScreen?: boolean;
  transparent?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 40,
  color = 'var(--color-primary)',
  thickness = 4,
  text,
  fullScreen = false,
  transparent = false,
}) => {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-4)',
    ...(fullScreen && {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      backgroundColor: transparent ? 'rgba(255,255,255,0.7)' : 'var(--color-background)',
    }),
  };

  return (
    <Box className="spinner-container" sx={containerStyles}>
      <CircularProgress
        size={size}
        thickness={thickness}
        sx={{ color }}
      />
      {text && (
        <Typography
          variant="body2"
          className="text-center mt-2 text-gray"
          sx={{ color: 'var(--color-text-light)' }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default Spinner;
