import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3023';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000
});

api.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            console.log('API Request:', config.method?.toUpperCase(), config.url);
            return config;
        } catch (error) {
            console.error('Error in request interceptor:', error);
            return config;
        }
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('API Error:', error.message);

        if (error.response) {
            console.error('Response error data:', error.response.data);
            console.error('Response error status:', error.response.status);

            if (error.response.status === 401) {
                console.log('Unauthorized access, clearing token');
                localStorage.removeItem('token');

            }
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Request setup error:', error.message);
        }

        return Promise.reject(error);
    }
); 