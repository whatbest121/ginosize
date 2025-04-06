'use client';

import { api } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/auth-provider';

interface LoginCredentials {
    username: string;
    password: string;
    onSuccess?: () => void;
}

interface SignupCredentials {
    username: string;
    password: string;
}

interface AuthResponse {
    message: string;
    token?: string;
}

const AUTH_STATUS_KEY = 'authStatus';

export function useAuth() {
    const { isAuthenticated, setIsAuthenticated } = useAuthContext();
    const router = useRouter();
    const queryClient = useQueryClient();


    const registerMutation = useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const { username, password } = credentials;
            try {
                const { data } = await api.post<AuthResponse>('/auth/signup', { username, password });
                return { response: data, credentials };
            } catch (error) {
                console.error('register error:', error);
                throw error;
            }
        },
        onSuccess: (data) => {
            if (data) {
                router.push('/login');
            } else {
                console.error('Login successful but no token received');
            }
        },
        onError: (error) => {
            console.error('Register mutation error:', error);
        }

    })
    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const { username, password } = credentials;
            try {
                const response = await api.post<AuthResponse>('/auth/login', { username, password });
                return { response: response.data, credentials };
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },
        onSuccess: (data) => {
            const { response, credentials } = data;
            if (response.token) {
                localStorage.setItem('token', response.token);
                setIsAuthenticated(true);

                queryClient.invalidateQueries({ queryKey: [AUTH_STATUS_KEY] });

                if (credentials.onSuccess) {
                    credentials.onSuccess();
                } else {
                    router.push('/items');
                }
            } else {
                console.error('Login successful but no token received');
            }
        },
        onError: (error) => {
            console.error('Login mutation error:', error);
        }
    });

    const signupMutation = useMutation({
        mutationFn: async (credentials: SignupCredentials) => {
            try {
                const response = await api.post<AuthResponse>('/auth/signup', credentials);
                return response.data;
            } catch (error) {
                console.error('Signup error:', error);
                throw error;
            }
        },
        onSuccess: () => {
            router.push('/login');
        },
        onError: (error) => {
            console.error('Signup mutation error:', error);
        }
    });

    const logout = () => {
        try {
            localStorage.removeItem('token');
            setIsAuthenticated(false);

            queryClient.invalidateQueries({ queryKey: [AUTH_STATUS_KEY] });

            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return {
        isAuthenticated,
        register: registerMutation.mutate,
        registerLoading: registerMutation.isPending,
        registerError: registerMutation.error,
        login: loginMutation.mutate,
        loginLoading: loginMutation.isPending,
        loginError: loginMutation.error,
        signup: signupMutation.mutate,
        signupLoading: signupMutation.isPending,
        signupError: signupMutation.error,
        logout,
    };
} 