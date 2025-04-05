'use client';

import { api } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LoginCredentials {
    username: string;
    password: string;
}

interface SignupCredentials {
    username: string;
    password: string;
}

interface AuthResponse {
    message: string;
    token?: string;
}

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem('token');
        }
        return false;
    });
    const router = useRouter();

    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const response = await api.post<AuthResponse>('/auth/login', credentials);
            return response.data;
        },
        onSuccess: (data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                router.push('/');
            }
        },
    });

    const signupMutation = useMutation({
        mutationFn: async (credentials: SignupCredentials) => {
            const response = await api.post<AuthResponse>('/auth/signup', credentials);
            return response.data;
        },
        onSuccess: () => {
            router.push('/login');
        },
    });

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        router.push('/login');
    };

    return {
        isAuthenticated,
        login: loginMutation.mutate,
        loginLoading: loginMutation.isPending,
        loginError: loginMutation.error,
        signup: signupMutation.mutate,
        signupLoading: signupMutation.isPending,
        signupError: signupMutation.error,
        logout,
    };
} 