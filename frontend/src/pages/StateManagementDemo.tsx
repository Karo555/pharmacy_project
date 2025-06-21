import React from 'react';
import { Container, Typography, Divider, Box } from '@mui/material';
import CounterContextExample from '../components/Examples/CounterContextExample';
import CounterZustandExample from '../components/Examples/CounterZustandExample';
import CounterReduxExample from '../components/Examples/CounterReduxExample';

const StateManagementDemo: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        React State Management Examples
      </Typography>

      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        This page demonstrates three different approaches to global state management in React.
      </Typography>

      <Box sx={{ my: 4 }}>
        <CounterContextExample />
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ my: 4 }}>
        <CounterZustandExample />
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ my: 4 }}>
        <CounterReduxExample />
      </Box>
    </Container>
  );
};

export default StateManagementDemo;
