// API Configuration for different environments
const isProduction = import.meta.env.PROD;

// Use production URLs when deployed, localhost for development
export const API_URL = isProduction
    ? 'https://chess-backend-5ur9.onrender.com'
    : (import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000');

export const WS_URL = isProduction
    ? 'wss://chess-ws-1z6j.onrender.com'
    : (import.meta.env.VITE_WS_URL || 'ws://localhost:8080');

export const config = {
    apiUrl: API_URL,
    wsUrl: WS_URL,
    isDevelopment: import.meta.env.DEV,
    isProduction: isProduction,
};
