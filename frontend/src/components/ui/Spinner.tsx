import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import '../../styles/globals.css';
import useThemeMode from '../../hooks/useThemeMode';

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
  color,
  thickness = 4,
  text,
  fullScreen = false,
  transparent = false,
}) => {
  const { isDarkMode, themeColors } = useThemeMode();

  // Use theme-aware color if none provided
  const spinnerColor = color || 'var(--color-primary)';

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
      backgroundColor: transparent
        ? isDarkMode
          ? 'rgba(0,0,0,0.7)'
          : 'rgba(255,255,255,0.7)'
        : themeColors.backgroundPrimary,
      transition: 'background-color 0.3s ease',
    }),
  };

  return (
    <Box className="spinner-container" sx={containerStyles}>
      <CircularProgress
        size={size}
        thickness={thickness}
        sx={{ color: spinnerColor }}
      />
      {text && (
        <Typography
          variant="body2"
          className="text-center mt-2"
          sx={{
            color: themeColors.textSecondary,
            marginTop: 2,
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default Spinner;
