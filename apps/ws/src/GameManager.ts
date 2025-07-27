import { WebSocket } from 'ws';
import {
  GAME_OVER,
  INIT_GAME,
  JOIN_GAME,
  MOVE,
  OPPONENT_DISCONNECTED,
  JOIN_ROOM,
  GAME_JOINED,
  GAME_NOT_FOUND,
  GAME_ALERT,
  GAME_ADDED,
  GAME_ENDED,
  EXIT_GAME,
} from './messages';
import { Game, isPromoting } from './Game';
import { socketManager, User } from './SocketManager';
import { Square } from 'chess.js';

// Define GameStatus enum locally instead of importing from Prisma
enum GameStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DRAW = 'DRAW',
  CHECKMATE = 'CHECKMATE',
  STALEMATE = 'STALEMATE',
  RESIGNATION = 'RESIGNATION',
  TIME_UP = 'TIME_UP'
}

export class GameManager {
  private games: Game[];
  private pendingGameId: string | null;
  private users: User[];

  constructor() {
    this.games = [];
    this.pendingGameId = null;
    this.users = [];
  }

  addUser(user: User) {
    this.users.push(user);
    this.addHandler(user);
  }

  removeUser(socket: WebSocket) {
    const user = this.users.find((user) => user.socket === socket);
    if (!user) {
      console.error('User not found?');
      return;
    }
    this.users = this.users.filter((user) => user.socket !== socket);
    socketManager.removeUser(user);
  }

  removeGame(gameId: string) {
    this.games = this.games.filter((g) => g.gameId !== gameId);
  }

  private addHandler(user: User) {
    user.socket.on('message', async (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === INIT_GAME) {
        if (this.pendingGameId) {
          const game = this.games.find((x) => x.gameId === this.pendingGameId);
          if (!game) {
            console.error('Pending game not found?');
            return;
          }
          if (user.userId === game.player1UserId) {
            socketManager.broadcast(
              game.gameId,
              JSON.stringify({
                type: GAME_ALERT,
                payload: {
                  message: 'Trying to Connect with yourself?',
                },
              }),
            );
            return;
          }
          socketManager.addUser(user, game.gameId);
          await game?.updateSecondPlayer(user.userId);
          this.pendingGameId = null;
        } else {
          const game = new Game(user.userId, null);
          this.games.push(game);
          this.pendingGameId = game.gameId;
          socketManager.addUser(user, game.gameId);
          socketManager.broadcast(
            game.gameId,
            JSON.stringify({
              type: GAME_ADDED,
              gameId:game.gameId,
            }),
          );
        }
      }

      if (message.type === MOVE) {
        const gameId = message.payload.gameId;
        const game = this.games.find((game) => game.gameId === gameId);
        if (game) {
          game.makeMove(user, message.payload.move);
          if (game.result) {
            this.removeGame(game.gameId);
          }
        }
      }

      if (message.type === EXIT_GAME){
        const gameId = message.payload.gameId;
        const game = this.games.find((game) => game.gameId === gameId);

        if (game) {
          game.exitGame(user);
          this.removeGame(game.gameId)
        }
      }

      if (message.type === JOIN_ROOM) {
        const gameId = message.payload?.gameId;
        if (!gameId) {
          return;
        }

        let availableGame = this.games.find((game) => game.gameId === gameId);

        // There is a game created but no second player available
        if (availableGame && !availableGame.player2UserId) {
          socketManager.addUser(user, availableGame.gameId);
          await availableGame.updateSecondPlayer(user.userId);
          return;
        }

        // For now, if game is not found in memory, return game not found
        // This simplifies the WebSocket server and removes database dependency
        if (!availableGame) {
          user.socket.send(
            JSON.stringify({
              type: GAME_NOT_FOUND,
            }),
          );
          return;
        }

        // Game found in memory, join it
        user.socket.send(
          JSON.stringify({
            type: GAME_JOINED,
            payload: {
              gameId,
              moves: availableGame.board.history({ verbose: true }),
              blackPlayer: {
                id: availableGame.player2UserId || 'unknown',
                name: 'Player 2',
              },
              whitePlayer: {
                id: availableGame.player1UserId,
                name: 'Player 1',
              },
              player1TimeConsumed: availableGame.getPlayer1TimeConsumed(),
              player2TimeConsumed: availableGame.getPlayer2TimeConsumed(),
            },
          }),
        );

        socketManager.addUser(user, gameId);
      }
    });
  }
}
