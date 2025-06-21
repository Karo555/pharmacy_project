import { create } from 'zustand';

// Define the store state type
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// Create the store
const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Selectors (optional but recommended for performance)
export const useCount = () => useCounterStore((state) => state.count);
export const useCounterActions = () => ({
  increment: useCounterStore((state) => state.increment),
  decrement: useCounterStore((state) => state.decrement),
  reset: useCounterStore((state) => state.reset),
});

export default useCounterStore;
