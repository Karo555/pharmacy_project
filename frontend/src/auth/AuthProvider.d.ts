import { ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
}

export const AuthContext: React.Context<AuthContextType | null>;

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps): JSX.Element;

export const useAuth: () => AuthContextType;

export default useAuth;