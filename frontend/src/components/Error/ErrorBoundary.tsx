import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import HomeIcon from '@mui/icons-material/Home';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service here
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise, use the default error UI
      return (
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 2,
              background: 'var(--color-background)'
            }}
          >
            <ErrorOutlineIcon
              sx={{
                fontSize: 80,
                color: 'error.main',
                mb: 2
              }}
            />

            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: 'var(--color-text)'
              }}
            >
              Something went wrong
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: 'var(--color-text-secondary)',
                textAlign: 'center',
                maxWidth: '80%'
              }}
            >
              We're sorry, but there was an error rendering this part of the application.
            </Typography>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box
                sx={{
                  width: '100%',
                  mb: 4,
                  p: 2,
                  bgcolor: 'rgba(0,0,0,0.05)',
                  borderRadius: 1,
                  overflow: 'auto'
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Error Details:
                </Typography>
                <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
                  {this.state.error.toString()}
                </Typography>

                {this.state.errorInfo && (
                  <>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                      Component Stack:
                    </Typography>
                    <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace' }}>
                      {this.state.errorInfo.componentStack}
                    </Typography>
                  </>
                )}
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={this.handleReload}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: '50px'
                }}
              >
                Reload Page
              </Button>

              <Button
                component={Link}
                to="/"
                variant="outlined"
                color="primary"
                startIcon={<HomeIcon />}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: '50px'
                }}
              >
                Go to Home
              </Button>
            </Box>
          </Paper>
        </Container>
      );
    }

    // If there's no error, render the children
    return this.props.children;
  }
}

export default ErrorBoundary;
