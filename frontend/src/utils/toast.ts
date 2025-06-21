// src/utils/toast.ts
import toast from 'react-hot-toast';

/**
 * Toast utility functions for displaying consistent notification messages
 */
export const showSuccess = (message: string) => {
  return toast.success(message);
};

export const showError = (message: string) => {
  return toast.error(message);
};

export const showInfo = (message: string) => {
  return toast(message);
};

export const showLoading = (message: string = 'Loading...') => {
  return toast.loading(message);
};

/**
 * Dismiss a specific toast by its ID
 */
export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};

/**
 * Update an existing toast (useful for loading -> success/error transitions)
 */
export const updateToast = (
  toastId: string,
  message: string,
  type: 'success' | 'error' | 'loading' | 'blank' = 'blank'
) => {
  const options = { id: toastId };

  switch (type) {
    case 'success':
      return toast.success(message, options);
    case 'error':
      return toast.error(message, options);
    case 'loading':
      return toast.loading(message, options);
    default:
      return toast(message, options);
  }
};
