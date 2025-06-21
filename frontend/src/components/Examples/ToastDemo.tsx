// src/components/Examples/ToastDemo.tsx
import React, { useState } from 'react';
import { Button, Typography, Box, Paper, Stack } from '@mui/material';
import { showSuccess, showError, showInfo, showLoading, dismissToast, updateToast } from '../../utils/toast';

const ToastDemo: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Example of a simple toast notification
  const handleSimpleSuccess = () => {
    showSuccess('Operation completed successfully!');
  };

  const handleSimpleError = () => {
    showError('Something went wrong. Please try again.');
  };

  const handleSimpleInfo = () => {
    showInfo('This is an informational message');
  };

  // Example of a loading toast that updates with the result
  const handleAsyncOperation = async () => {
    setIsSubmitting(true);
    const loadingToastId = showLoading('Processing your request...');

    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 80% chance of success (for demo purposes)
      if (Math.random() > 0.2) {
        updateToast(loadingToastId, 'Operation completed successfully!', 'success');
      } else {
        throw new Error('Simulated error');
      }
    } catch (error) {
      updateToast(loadingToastId, 'Failed to complete the operation', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Toast Notification Examples
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Click the buttons below to see different types of toast notifications.
      </Typography>

      <Stack spacing={2} direction="column">
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Basic Toast Notifications
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSimpleSuccess}
            >
              Success Toast
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleSimpleError}
            >
              Error Toast
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={handleSimpleInfo}
            >
              Info Toast
            </Button>
          </Stack>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Loading State with Toast
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAsyncOperation}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Simulate API Request'}
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            This example shows a loading toast that updates to success or error based on the result.
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ToastDemo;
