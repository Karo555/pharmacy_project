import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Custom hook to access auth context values
 */
export const useAuth = () => {
    return useContext(AuthContext);
};
