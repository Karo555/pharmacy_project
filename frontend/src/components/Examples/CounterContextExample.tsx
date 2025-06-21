import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useCounterContext } from '../contexts/CounterContext';

const CounterContextExample: React.FC = () => {
  const { count, increment, decrement, reset } = useCounterContext();

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Context API Counter Example
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

export default CounterContextExample;
