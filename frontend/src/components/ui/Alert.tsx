import React, { useState, useEffect } from 'react';
import { Alert as MuiAlert, AlertTitle, Snackbar, Box, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/globals.css';
import useThemeMode from '../../hooks/useThemeMode';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
  autoHideDuration?: number;
  showIcon?: boolean;
  isSnackbar?: boolean;
  isStatic?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  autoHideDuration = 5000,
  showIcon = true,
  isSnackbar = false,
  isStatic = false,
}) => {
  const [open, setOpen] = useState(true);
  const { isDarkMode, themeColors } = useThemeMode();

  useEffect(() => {
    if (!isStatic && !isSnackbar && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, isStatic, isSnackbar]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'var(--color-success)';
      case 'error':
        return 'var(--color-error)';
      case 'warning':
        return 'var(--color-warning)';
      case 'info':
        return 'var(--color-info)';
      default:
        return 'var(--color-info)';
    }
  };

  const alertContent = (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <MuiAlert
        severity={type}
        variant="filled"
        className={`shadow-md rounded-md ${isStatic ? '' : 'mb-4'}`}
        sx={{
          '& .MuiAlert-icon': {
            display: showIcon ? 'flex' : 'none',
          },
          bgcolor: getBackgroundColor(),
          color: 'white',
          boxShadow: isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
            className="text-white"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {title && <AlertTitle className="font-semibold">{title}</AlertTitle>}
        <Box className="text-sm py-1">{message}</Box>
      </MuiAlert>
    </motion.div>
  );

  if (isSnackbar) {
    return (
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: themeColors.backgroundSecondary,
            color: themeColors.textPrimary
          }
        }}
      >
        {alertContent}
      </Snackbar>
    );
  }

  return <AnimatePresence>{open && alertContent}</AnimatePresence>;
};

export default Alert;
