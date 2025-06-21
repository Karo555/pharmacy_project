import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

const NotFound: React.FC = () => {
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
            fontSize: 100,
            color: 'var(--color-primary)',
            mb: 2
          }}
        />

        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            color: 'var(--color-text)'
          }}
        >
          404
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 3,
            color: 'var(--color-text-secondary)',
            textAlign: 'center'
          }}
        >
          Oops! The page you're looking for doesn't exist.
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
          The page you requested could not be found. It might have been removed,
          renamed, or didn't exist in the first place.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: '50px'
            }}
          >
            Back to Home
          </Button>

          <Button
            component={Link}
            to="/drugs"
            variant="outlined"
            color="primary"
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: '50px'
            }}
          >
            Browse Drugs
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound;
