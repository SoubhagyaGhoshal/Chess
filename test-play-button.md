# 🎮 Play Button Test Guide

## ✅ **Current Status:**
- **Frontend**: http://localhost:5173 ✅ RUNNING
- **Backend**: http://localhost:3000 ✅ RUNNING  
- **WebSocket**: ws://localhost:8080 ✅ RUNNING
- **Database**: PostgreSQL + chess_db ✅ CONNECTED

## 🔧 **Environment Files Configured:**
- `apps/frontend/.env` - Frontend environment variables
- `apps/backend/.env` - Backend environment variables
- `apps/ws/.env` - WebSocket environment variables
- `packages/db/.env` - Database environment variables

## 🎯 **How to Test the Play Button:**

### **Step 1: Open the Application**
1. Open your browser and go to **http://localhost:5173**
2. You should see the landing page with the chess board and play options

### **Step 2: Login as Guest**
1. Click on **"Login"** in the navigation
2. Enter a name (e.g., "TestPlayer")
3. Click **"Continue as Guest"**
4. You should be redirected to the game page

### **Step 3: Click Play Button**
1. On the game page, you should see a **"Play"** button
2. Click the **"Play"** button
3. The button should show **"Waiting for opponent..."** or similar

### **Step 4: Test with Two Players**
1. Open a **second browser window/tab**
2. Go to **http://localhost:5173**
3. Login as a different guest (e.g., "Player2")
4. Click **"Play"** button
5. Both players should be matched and the game should start

## 🔍 **What Should Happen:**

### **When You Click Play:**
1. **WebSocket Message Sent**: `{ type: "init_game" }`
2. **Game Created**: A new game is created in the database
3. **Waiting State**: You see "Waiting for opponent..."
4. **Game ID Generated**: A unique game ID is created
5. **Share Link**: You can share the game link with a friend

### **When Second Player Joins:**
1. **Game Starts**: Both players are matched
2. **Chess Board Appears**: The game board becomes interactive
3. **Turn System**: Players can make moves alternately
4. **Real-time Updates**: Moves are synchronized between players

## 🚨 **Troubleshooting:**

### **If Play Button Does Nothing:**
1. **Check Browser Console** (F12) for errors
2. **Check WebSocket Connection**: Look for WebSocket errors
3. **Check Network Tab**: Verify API calls are working

### **If WebSocket Connection Fails:**
1. **Verify WebSocket Server**: `./check-status.sh`
2. **Check Environment Variables**: Ensure `VITE_APP_WS_URL` is set
3. **Restart Services**: Use `./start-local.sh`

### **If Game Doesn't Start:**
1. **Check Database**: Ensure PostgreSQL is running
2. **Check JWT Tokens**: Verify authentication is working
3. **Check Logs**: Look at backend and WebSocket logs

## 🎯 **Expected Behavior:**

✅ **Single Player**: Click Play → See "Waiting for opponent..."  
✅ **Two Players**: Both click Play → Game starts automatically  
✅ **Game Board**: Interactive chess board appears  
✅ **Moves**: Players can make legal chess moves  
✅ **Real-time**: Moves appear instantly for both players  

## 🔧 **Quick Fix Commands:**

```bash
# Check all services
./check-status.sh

# Restart everything
./start-local.sh

# Check specific service
lsof -i :3000  # Backend
lsof -i :8080  # WebSocket  
lsof -i :5173  # Frontend
```

**Your Chess application should now be fully functional!** ♟️ 