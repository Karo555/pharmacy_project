// src/contexts/ThemeContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from '@mui/material';

// Define theme types
type ThemeMode = 'light' | 'dark';

// Define context type
interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as ThemeMode) || 'light';
  });

  // Define the light and dark themes
  const lightTheme = createTheme({
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#0a6cce',
      },
      secondary: {
        main: '#6a00ea',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
    },
  });

  const darkTheme = createTheme({
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    palette: {
      mode: 'dark',
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#9c27b0',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
  });

  // Function to toggle between light and dark mode
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };

  // Get the current theme based on the mode
  const theme: Theme = mode === 'light' ? lightTheme : darkTheme;

  // Apply theme to document body
  useEffect(() => {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${mode}-mode`);

    // You could also set specific CSS variables here if needed
    if (mode === 'dark') {
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = '#f5f5f5';
      document.body.style.color = '#333333';
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
