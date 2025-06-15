import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (newToken: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    user: null,
    login: async () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    // Fetch current user info if token is valid
    const fetchMe = async (jwt: string) => {
        try {
            const resp = await axios.get<User>('/api/me', {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            setUser(resp.data);
        } catch (err) {
            console.error('Failed to fetch current user:', err);
            logout(); // clear out invalid token/user
        }
    };

    // On mount, load token & user
    useEffect(() => {
        const stored = localStorage.getItem('token');
        if (stored) {
            setToken(stored);
            fetchMe(stored);
        }
    }, []);

    const login = async (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        await fetchMe(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);