import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Fade,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import '../../styles/globals.css';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  initialValue?: string;
  fullWidth?: boolean;
  debounceTime?: number;
  variant?: 'outlined' | 'filled' | 'standard';
  showClearButton?: boolean;
  minSearchLength?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  initialValue = '',
  fullWidth = true,
  debounceTime = 300,
  variant = 'outlined',
  showClearButton = true,
  minSearchLength = 2
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isTyping, setIsTyping] = useState(false);
  const theme = useTheme();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prevSearchTermRef = useRef<string>(initialValue);

  // Handle debounced search
  useEffect(() => {
    // Don't trigger search when component first mounts with empty initialValue
    if (searchTerm === initialValue && initialValue === '' && prevSearchTermRef.current === initialValue) return;

    // Don't search again if the term hasn't changed
    if (searchTerm === prevSearchTermRef.current) return;

    setIsTyping(true);

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsTyping(false);
      if (searchTerm.length >= minSearchLength || searchTerm === '') {
        prevSearchTermRef.current = searchTerm;
        onSearch(searchTerm);
      }
    }, debounceTime);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [searchTerm, debounceTime, initialValue, minSearchLength, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <Paper
      elevation={2}
      className="rounded-lg"
      sx={{
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 3,
        },
        '&:focus-within': {
          boxShadow: 4,
          borderColor: 'primary.main',
        },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <TextField
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        variant={variant}
        fullWidth={fullWidth}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: showClearButton && searchTerm ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={handleClear}
                edge="end"
                size="small"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
          sx: {
            paddingY: 0.5,
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }
        }}
        className="search-input"
        aria-label="Search"
      />

      {/* Activity indicator */}
      <Fade in={isTyping}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: '100%',
            background: `linear-gradient(90deg, 
              ${theme.palette.primary.main} 0%, 
              ${theme.palette.secondary.main} 50%, 
              ${theme.palette.primary.main} 100%)`,
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite',
            '@keyframes loading': {
              '0%': {
                backgroundPosition: '0% 0%'
              },
              '100%': {
                backgroundPosition: '100% 0%'
              }
            }
          }}
        />
      </Fade>
    </Paper>
  );
};

export default SearchBar;
