import jwt from 'jsonwebtoken';
import { User } from '../SocketManager';
import { WebSocket } from 'ws';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export interface userJwtClaims {
  userId: string;
  name: string;
  isGuest?: boolean;
}

export const extractAuthUser = (token: string, ws: WebSocket): User => {
  try {
    if (!token) {
      console.log('No token provided, creating guest user');
      return new User(ws, { userId: 'guest', name: 'Guest', isGuest: true });
    }
    
    console.log('JWT_SECRET being used:', JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET) as userJwtClaims;
    return new User(ws, decoded);
  } catch (error: any) {
    console.log('JWT verification failed:', error.message);
    console.log('Token received:', token);
    // Return a guest user if JWT verification fails
    return new User(ws, { userId: 'guest', name: 'Guest', isGuest: true });
  }
};
