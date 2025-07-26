# ♟️ Chess Application

A modern, real-time multiplayer chess platform built with React, Node.js, and WebSocket technology. Players can create games, invite friends, and play chess in real-time with a beautiful, responsive interface.

## ✨ Features

- **🎮 Real-time Multiplayer Chess**: Play chess with friends in real-time
- **👤 Guest Authentication**: Quick guest login with custom usernames
- **🔗 Game Sharing**: Share game links with opponents
- **🎨 Beautiful UI**: Modern, responsive design with multiple themes
- **📱 Mobile Responsive**: Works perfectly on desktop and mobile devices
- **⚡ Real-time Updates**: Instant move synchronization between players
- **🏆 Rating System**: Track player performance and ratings
- **🔒 Secure Authentication**: JWT-based authentication system

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Recoil** - State management
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **JWT** - JSON Web Tokens for authentication
- **Passport.js** - Authentication middleware
- **CORS** - Cross-origin resource sharing

### Database & Real-time
- **PostgreSQL** - Primary database
- **Prisma** - Database ORM and migrations
- **WebSocket** - Real-time game communication
- **Socket.io** - WebSocket library for Node.js

### Development Tools
- **Turbo** - Monorepo build system
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Yarn** - Package manager

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **Yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SoubhagyaGhoshal/Chess.git
   cd Chess
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up the database**
   ```bash
   # Create PostgreSQL database
   createdb chess_db
   
   # Push database schema
   cd packages/db
   npx prisma db push
   cd ../..
   ```

4. **Configure environment variables**

   Create `.env` files in the following directories:

   **`apps/backend/.env`**
   ```env
   JWT_SECRET="your-jwt-secret-here"
   DATABASE_URL="postgresql://username@localhost:5432/chess_db"
   COOKIE_SECRET="your-cookie-secret-here"
   PORT=3000
   ALLOWED_HOSTS="http://localhost:5173"
   ```

   **`apps/ws/.env`**
   ```env
   JWT_SECRET="your-jwt-secret-here"
   DATABASE_URL="postgresql://username@localhost:5432/chess_db"
   PORT=8080
   ```

   **`packages/db/.env`**
   ```env
   DATABASE_URL="postgresql://username@localhost:5432/chess_db"
   ```

5. **Start the application**

   **Option 1: Use the startup script (Recommended)**
   ```bash
   ./start-local.sh
   ```

   **Option 2: Start services manually**

   Terminal 1 - WebSocket Server:
   ```bash
   cd apps/ws
   yarn dev
   ```

   Terminal 2 - Backend Server:
   ```bash
   cd apps/backend
   yarn dev
   ```

   Terminal 3 - Frontend Server:
   ```bash
   cd apps/frontend
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 🎮 How to Play

### Getting Started
1. **Visit the application** at http://localhost:5173
2. **Click "Login"** in the navigation
3. **Enter a username** and click "Enter as Guest"
4. **Click "Play"** to create a new game
5. **Share the game link** with your opponent

### Playing a Game
1. **Wait for your opponent** to join using the shared link
2. **Make moves** by clicking and dragging pieces
3. **View move history** in the sidebar
4. **Use the chat** to communicate with your opponent
5. **Resign or offer draw** when needed

## 📁 Project Structure

```
Chess/
├── apps/
│   ├── frontend/          # React frontend application
│   ├── backend/           # Express.js backend API
│   ├── ws/               # WebSocket server for real-time games
│   └── native/           # React Native mobile app
├── packages/
│   ├── db/               # Database schema and migrations
│   ├── store/            # Shared state management
│   ├── ui/               # Shared UI components
│   └── eslint-config/    # Shared ESLint configuration
├── start-local.sh        # Startup script for all services
└── README.md            # This file
```

## 🔧 Development

### Available Scripts

**Frontend (`apps/frontend`)**
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build

**Backend (`apps/backend`)**
- `yarn dev` - Start development server with auto-reload
- `yarn build` - Build TypeScript to JavaScript
- `yarn start` - Start production server

**WebSocket (`apps/ws`)**
- `yarn dev` - Start WebSocket server with auto-reload
- `yarn build` - Build TypeScript to JavaScript
- `yarn start` - Start production server

**Database (`packages/db`)**
- `npx prisma db push` - Push schema changes to database
- `npx prisma generate` - Generate Prisma client
- `npx prisma studio` - Open database GUI

### Code Quality

- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **TypeScript** - Type checking

Run linting:
```bash
yarn lint
```

## 🌐 Deployment

### Environment Variables

Make sure to set the following environment variables in production:

- `JWT_SECRET` - Secure random string for JWT signing
- `DATABASE_URL` - PostgreSQL connection string
- `COOKIE_SECRET` - Secure random string for cookie signing
- `ALLOWED_HOSTS` - Comma-separated list of allowed frontend URLs

### Production Build

1. **Build all applications**
   ```bash
   yarn build
   ```

2. **Start production servers**
   ```bash
   # Backend
   cd apps/backend && yarn start
   
   # WebSocket
   cd apps/ws && yarn start
   
   # Frontend (serve built files)
   cd apps/frontend && yarn preview
   ```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Chess.js** - Chess game logic and move validation
- **React Chessboard** - Chess board component
- **Tailwind CSS** - Utility-first CSS framework
- **Prisma** - Database ORM and migrations

## 📞 Support

If you encounter any issues or have questions:

1. **Check the documentation** in the `/docs` folder
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information

---

**Happy Chess Playing! ♟️**

Built with ❤️ using modern web technologies.

