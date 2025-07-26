// Frontend configuration with environment variable support
export const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL || 'https://chess-2-y063.onrender.com';
export const WS_URL = import.meta.env.VITE_APP_WS_URL || 'ws://localhost:8080'; 