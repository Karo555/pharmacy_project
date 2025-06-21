import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/redux/hooks';
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
  selectCount
} from '../../store/redux/counterSlice';

const CounterReduxExample: React.FC = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Redux Toolkit Counter Example
      </Typography>

      <Typography variant="h3" align="center" sx={{ my: 3 }}>
        {count}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Button variant="contained" color="secondary" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
        <Button variant="outlined" onClick={() => dispatch(reset())}>
          Reset
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" onClick={() => dispatch(incrementByAmount(5))}>
          Add 5
        </Button>
      </Box>
    </Paper>
  );
};

export default CounterReduxExample;
