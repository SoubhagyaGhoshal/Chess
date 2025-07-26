# 🔧 Fix: "Trying to Connect with yourself?" Issue

## 🚨 **Problem Description:**
When you click the "Play" button, you get the error: **"Trying to Connect with yourself?"**

This happens because:
1. **JWT Secret Mismatch** - WebSocket server uses different JWT secret than backend
2. **Token Verification Fails** - WebSocket can't verify the user's JWT token
3. **User Recognition Issues** - WebSocket thinks you're trying to join your own game

## ✅ **Solution Applied:**

### **1. Fixed JWT Secret Mismatch**
Updated `apps/ws/.env` to use the same JWT secret as the backend:

```env
JWT_SECRET="chessdemo-local-dev-secret"
DATABASE_URL="postgresql://soubhagyaghoshal@localhost:5432/chess_db"
PORT=8080
```

### **2. Restarted All Services**
Killed all processes and restarted with correct configuration:
- ✅ WebSocket Server (Port 8080)
- ✅ Backend Server (Port 3000)  
- ✅ Frontend Server (Port 5173)

### **3. Verified JWT Token Generation**
Backend now generates valid JWT tokens that WebSocket can verify.

## 🎯 **How to Test the Fix:**

### **Step 1: Clear Browser Data**
1. **Clear browser cache and cookies** for localhost
2. **Close all browser tabs** with the chess app
3. **Open a fresh browser window**

### **Step 2: Test Single Player**
1. Go to **http://localhost:5173**
2. **Login as guest** with any name
3. **Click "Play"** button
4. Should see **"Waiting for opponent..."** (not the error)

### **Step 3: Test Two Players**
1. **Open a second browser window/tab**
2. Go to **http://localhost:5173**
3. **Login as a different guest** (different name)
4. **Click "Play"** button
5. **Both players should be matched** and game should start

## 🔍 **What Should Happen Now:**

### **✅ Correct Behavior:**
- **Single Player**: Click Play → See "Waiting for opponent..."
- **Two Players**: Both click Play → Game starts automatically
- **No More Errors**: "Trying to Connect with yourself?" should not appear
- **Proper Authentication**: JWT tokens work correctly

### **❌ If You Still See the Error:**
1. **Check browser console** (F12) for WebSocket errors
2. **Verify all services are running**: `./check-status.sh`
3. **Clear browser cache** completely
4. **Try incognito/private browsing mode**

## 🛠️ **Troubleshooting Commands:**

```bash
# Check service status
./check-status.sh

# Restart everything
./start-local.sh

# Check JWT tokens
curl -X POST http://localhost:3000/auth/guest \
  -H "Content-Type: application/json" \
  -d '{"name":"TestPlayer"}'

# Check WebSocket connection
lsof -i :8080
```

## 📋 **Environment Files Status:**

### **✅ Correctly Configured:**
- `apps/backend/.env` - Backend environment variables
- `apps/ws/.env` - WebSocket environment variables (FIXED)
- `apps/frontend/.env` - Frontend environment variables
- `packages/db/.env` - Database environment variables

### **🔑 JWT Secret Consistency:**
All services now use: `JWT_SECRET="chessdemo-local-dev-secret"`

## 🎮 **Expected Game Flow:**

1. **Login** → Get valid JWT token
2. **Click Play** → WebSocket accepts token, creates game
3. **Wait for Opponent** → Game in pending state
4. **Second Player Joins** → Game starts, both players matched
5. **Play Chess** → Interactive game board appears

## 🚀 **Ready to Play!**

**The "Trying to Connect with yourself?" issue should now be resolved!**

- **Frontend**: http://localhost:5173 ✅
- **Backend**: http://localhost:3000 ✅  
- **WebSocket**: ws://localhost:8080 ✅
- **Database**: PostgreSQL + chess_db ✅

**Try clicking the Play button now - it should work perfectly!** ♟️ 