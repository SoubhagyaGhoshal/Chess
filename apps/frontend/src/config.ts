// API Configuration for different environments
export const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080';

export const config = {
    apiUrl: API_URL,
    wsUrl: WS_URL,
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
};
