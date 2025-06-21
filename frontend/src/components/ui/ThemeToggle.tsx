import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import useThemeMode from '../../hooks/useThemeMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  tooltip?: boolean;
}

/**
 * A component that renders a button to toggle between light and dark themes.
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'medium',
  tooltip = true
}) => {
  const { isDarkMode, toggleTheme } = useThemeMode();

  const button = (
    <IconButton
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      size={size}
      sx={{
        color: isDarkMode ? 'primary.light' : 'primary.main',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'rotate(12deg)',
        },
      }}
    >
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );

  if (tooltip) {
    return (
      <Tooltip title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
        {button}
      </Tooltip>
    );
  }

  return button;
};

export default ThemeToggle;
