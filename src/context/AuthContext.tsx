'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'SYSTEM_ADMIN' | 'PROPERTY_MANAGER' | 'TENANT' | 'VENDOR';
    avatarUrl?: string
    organization?: {
        id: string
        name: string
        slug: string
    }

}

interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User, tokens: AuthTokens) => void;
    logout: () => void;
    isLoading: boolean;
    hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const STORAGE_KEYS = {
    USER: 'rentflow_user',
    TOKENS: 'rentflow_tokens'
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Helper functions for localStorage
    const getStoredUser = (): User | null => {
        if (typeof window === 'undefined') return null;
        try {
            const userData = localStorage.getItem(STORAGE_KEYS.USER);
            return userData ? JSON.parse(userData) : null;
        } catch {
            return null;
        }
    };

    const getStoredTokens = (): AuthTokens | null => {
        if (typeof window === 'undefined') return null;
        try {
            const tokens = localStorage.getItem(STORAGE_KEYS.TOKENS);
            return tokens ? JSON.parse(tokens) : null;
        } catch {
            return null;
        }
    };

    const setStoredUser = (userData: User | null) => {
        if (userData) {
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
        } else {
            localStorage.removeItem(STORAGE_KEYS.USER);
        }
    };

    const setStoredTokens = (tokens: AuthTokens | null) => {
        if (tokens) {
            localStorage.setItem(STORAGE_KEYS.TOKENS, JSON.stringify(tokens));
        } else {
            localStorage.removeItem(STORAGE_KEYS.TOKENS);
        }
    };

    const initializeAuth = async () => {
        const storedUser = getStoredUser();

        if (storedUser) {
            setUser(storedUser);
        } else {
            console.log(' AuthContext - No user found in storage');
        }

        setIsLoading(false);
    };

    useEffect(() => {
        initializeAuth();
    }, []);

    const login = (userData: User, tokens: AuthTokens) => {
        setStoredUser(userData);
        setStoredTokens(tokens);
        setUser(userData);
    };

    const logout = () => {
        setStoredUser(null);
        setStoredTokens(null);
        setUser(null);
        router.push('/login');
    };

    const hasRole = (roles: string[]) => {
        return user ? roles.includes(user.role) : false;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}