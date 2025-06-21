// src/hooks/useThemeMode.ts
import { useTheme } from '../contexts/ThemeContext';
import { useCallback, useMemo } from 'react';

/**
 * Custom hook that provides enhanced theme functionality
 *
 * @returns {Object} Theme utilities and properties
 */
export const useThemeMode = () => {
  const { mode, toggleTheme } = useTheme();

  // Check if the current theme is dark
  const isDarkMode = useMemo(() => mode === 'dark', [mode]);

  // Check if the current theme is light
  const isLightMode = useMemo(() => mode === 'light', [mode]);

  // Function to explicitly set the theme to dark
  const setDarkMode = useCallback(() => {
    if (mode !== 'dark') {
      toggleTheme();
    }
  }, [mode, toggleTheme]);

  // Function to explicitly set the theme to light
  const setLightMode = useCallback(() => {
    if (mode !== 'light') {
      toggleTheme();
    }
  }, [mode, toggleTheme]);

  // Get theme-specific colors for common use cases
  const themeColors = useMemo(() => ({
    // Text colors
    textPrimary: isDarkMode ? '#ffffff' : '#333333',
    textSecondary: isDarkMode ? '#b0b0b0' : '#666666',

    // Background colors
    backgroundPrimary: isDarkMode ? '#121212' : '#f5f5f5',
    backgroundSecondary: isDarkMode ? '#1e1e1e' : '#ffffff',

    // Interactive element colors
    buttonHover: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',

    // Border colors
    border: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
  }), [isDarkMode]);

  return {
    mode,                // Current theme mode ('light' or 'dark')
    isDarkMode,          // Boolean flag for dark mode
    isLightMode,         // Boolean flag for light mode
    toggleTheme,         // Function to toggle between light and dark
    setDarkMode,         // Function to explicitly set dark mode
    setLightMode,        // Function to explicitly set light mode
    themeColors,         // Object containing theme-specific colors
  };
};

export default useThemeMode;
