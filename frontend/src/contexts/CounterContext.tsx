import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our context state
interface CounterContextType {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// Create the context with a default value
const CounterContext = createContext<CounterContextType | undefined>(undefined);

// Custom hook for using the counter context
export const useCounterContext = () => {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error('useCounterContext must be used within a CounterProvider');
  }
  return context;
};

// Props for the provider component
interface CounterProviderProps {
  children: ReactNode;
}

// Provider component that wraps parts of the app that need counter state
export const CounterProvider: React.FC<CounterProviderProps> = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);

  const value = {
    count,
    increment,
    decrement,
    reset
  };

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
};
