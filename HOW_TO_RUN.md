# 🎮 How to Run the Chess Application

## ✅ **Current Status: ALL SERVICES RUNNING!**

Your Chess application is currently running successfully:
- 🌐 **Frontend**: http://localhost:5173
- ⚙️ **Backend**: http://localhost:3000  
- 🔌 **WebSocket**: ws://localhost:8080

## 🚀 **How to Start the Application**

### **Option 1: Use the Startup Script (Recommended)**
```bash
./start-local.sh
```

### **Option 2: Start Services Manually**

**Terminal 1 - WebSocket Server:**
```bash
cd apps/ws
yarn dev
```

**Terminal 2 - Backend Server:**
```bash
cd apps/backend
yarn dev
```

**Terminal 3 - Frontend Server:**
```bash
cd apps/frontend
yarn dev
```

### **Option 3: Check Service Status**
```bash
./check-status.sh
```

## 🎯 **How to Use the Application**

1. **Open your browser** and go to **http://localhost:5173**
2. You'll see the Chess application interface
3. **Sign up/Login** (guest authentication works)
4. **Create or join games** and start playing chess!

## 🛑 **How to Stop the Application**

### **If using startup script:**
Press `Ctrl+C` in the terminal where you ran `./start-local.sh`

### **If running manually:**
Press `Ctrl+C` in each terminal window

### **Force stop all services:**
```bash
pkill -f "vite" && pkill -f "yarn dev" && pkill -f "dist/index.js"
```

## 🔧 **Troubleshooting**

### **Port Already in Use Error:**
```bash
# Kill processes using the ports
lsof -ti:3000 | xargs kill -9
lsof -ti:8080 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

### **Database Issues:**
```bash
# Restart PostgreSQL
brew services restart postgresql@14

# Recreate database
dropdb chess_db && createdb chess_db
cd packages/db && yarn db:push
```

### **Dependencies Issues:**
```bash
# Reinstall dependencies
yarn install
```

## 📱 **Access URLs**

- **Main Application**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Health Check**: http://localhost:3000/v1/

## 🎮 **Features Available**

- ✅ User registration and login
- ✅ Guest authentication
- ✅ Real-time chess games
- ✅ Game history
- ✅ Rating system
- ✅ Multiple game modes

## 📝 **Notes**

- The application uses PostgreSQL for data storage
- WebSocket handles real-time game communication
- All services are configured for local development
- OAuth providers use placeholder values (guest auth works fine)

**Your Chess application is ready to play!** ♟️ 