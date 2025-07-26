import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';
import { extractAuthUser } from './auth';
import dotenv from 'dotenv';

dotenv.config();

const wss = new WebSocketServer({ port: Number(process.env.PORT) || 8080 });

const gameManager = new GameManager();

wss.on('connection', function connection(ws, req) {
  //@ts-ignore
  const { searchParams } = new URL(req.url, `ws://${req.headers.host}`);
  const token: string = searchParams.get('token') || '';
  const user = extractAuthUser(token, ws);
  gameManager.addUser(user);

  ws.on('close', () => {
    gameManager.removeUser(ws);
  });
});

console.log('done');
