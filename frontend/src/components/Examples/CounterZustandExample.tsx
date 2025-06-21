import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import useCounterStore, { useCount, useCounterActions } from '../../store/useCounterStore';

const CounterZustandExample: React.FC = () => {
  // Option 1: Using the full store
  // const { count, increment, decrement, reset } = useCounterStore();

  // Option 2: Using selectors for better performance (recommended)
  const count = useCount();
  const { increment, decrement, reset } = useCounterActions();

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Zustand Counter Example
      </Typography>

      <Typography variant="h3" align="center" sx={{ my: 3 }}>
        {count}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={increment}>
          Increment
        </Button>
        <Button variant="contained" color="secondary" onClick={decrement}>
          Decrement
        </Button>
        <Button variant="outlined" onClick={reset}>
          Reset
        </Button>
      </Box>
    </Paper>
  );
};

export default CounterZustandExample;
