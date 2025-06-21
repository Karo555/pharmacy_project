import { toast, ToastOptions, TypeOptions } from 'react-toastify';

/**
 * Default toast configuration
 */
const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/**
 * Toast utility functions for consistent notifications across the application
 */
const toastUtils = {
  /**
   * Show a success toast
   * @param message The message to display
   * @param options Optional toast configuration
   */
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, { ...defaultOptions, ...options });
  },

  /**
   * Show an error toast
   * @param message The message to display
   * @param options Optional toast configuration
   */
  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, { ...defaultOptions, ...options });
  },

  /**
   * Show an info toast
   * @param message The message to display
   * @param options Optional toast configuration
   */
  info: (message: string, options?: ToastOptions) => {
    return toast.info(message, { ...defaultOptions, ...options });
  },

  /**
   * Show a warning toast
   * @param message The message to display
   * @param options Optional toast configuration
   */
  warning: (message: string, options?: ToastOptions) => {
    return toast.warning(message, { ...defaultOptions, ...options });
  },

  /**
   * Show a default/custom toast
   * @param message The message to display
   * @param type Optional toast type
   * @param options Optional toast configuration
   */
  show: (message: string, type: TypeOptions = 'default', options?: ToastOptions) => {
    return toast(message, { ...defaultOptions, type, ...options });
  },

  /**
   * Dismiss all toasts
   */
  dismiss: () => {
    toast.dismiss();
  },

  /**
   * Update an existing toast
   * @param toastId The ID of the toast to update
   * @param message The new message
   * @param options New configuration options
   */
  update: (toastId: string | number, message: string, options?: ToastOptions) => {
    if (toast.isActive(toastId)) {
      return toast.update(toastId, {
        render: message,
        ...options,
      });
    }
    return null;
  },

  /**
   * Creates a promise toast that updates based on the promise resolution
   * @param promise The promise to track
   * @param messages Configuration for pending/success/error messages
   * @param options Optional toast configuration
   */
  promise: <T>(
    promise: Promise<T>,
    messages: {
      pending: string;
      success: string;
      error: string;
    },
    options?: ToastOptions
  ) => {
    return toast.promise(promise, messages, { ...defaultOptions, ...options });
  },
};

export default toastUtils;
