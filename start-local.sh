#!/bin/bash

echo "🚀 Starting Chess Application Locally..."

# Kill any existing processes
echo "🧹 Cleaning up existing processes..."
pkill -f "vite" 2>/dev/null || true
pkill -f "yarn dev" 2>/dev/null || true
pkill -f "dist/index.js" 2>/dev/null || true
sleep 3

# Check if PostgreSQL is running
if ! brew services list | grep -q "postgresql.*started"; then
    echo "❌ PostgreSQL is not running. Starting it..."
    brew services start postgresql@14
    sleep 3
fi

# Check if database exists, create if not
if ! psql -lqt | cut -d \| -f 1 | grep -qw chess_db; then
    echo "📊 Creating database..."
    createdb chess_db
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    yarn install
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd packages/db && yarn db:generate && cd ../..

# Push database schema
echo "🗄️  Setting up database schema..."
cd packages/db && yarn db:push && cd ../..

echo "✅ Database setup complete!"

# Start all services
echo "🎯 Starting services..."

# Start WebSocket server
echo "🔌 Starting WebSocket server on port 8080..."
cd apps/ws && yarn dev &
WS_PID=$!

# Start Backend server
echo "⚙️  Starting Backend server on port 3000..."
cd apps/backend && yarn dev &
BACKEND_PID=$!

# Start Frontend server
echo "🌐 Starting Frontend server on port 5173..."
cd apps/frontend && yarn dev &
FRONTEND_PID=$!

# Wait a moment for services to start
sleep 5

echo ""
echo "🎉 Chess Application is now running!"
echo ""
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:3000"
echo "🔌 WebSocket: ws://localhost:8080"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $WS_PID $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait 