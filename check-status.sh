#!/bin/bash

echo "🔍 Checking Chess Application Status..."
echo ""

# Check if services are running
echo "📊 Service Status:"
echo "=================="

# Check Backend (Port 3000)
if lsof -i :3000 >/dev/null 2>&1; then
    echo "✅ Backend (Port 3000): RUNNING"
    curl -s http://localhost:3000/v1/ >/dev/null && echo "   API Response: OK" || echo "   API Response: ERROR"
else
    echo "❌ Backend (Port 3000): NOT RUNNING"
fi

# Check WebSocket (Port 8080)
if lsof -i :8080 >/dev/null 2>&1; then
    echo "✅ WebSocket (Port 8080): RUNNING"
else
    echo "❌ WebSocket (Port 8080): NOT RUNNING"
fi

# Check Frontend (Port 5173)
if lsof -i :5173 >/dev/null 2>&1; then
    echo "✅ Frontend (Port 5173): RUNNING"
    curl -s -I http://localhost:5173 | head -1 | grep -q "200" && echo "   Web Response: OK" || echo "   Web Response: ERROR"
else
    echo "❌ Frontend (Port 5173): NOT RUNNING"
fi

echo ""
echo "🌐 Access URLs:"
echo "==============="
echo "Frontend: http://localhost:5173"
echo "Backend API: http://localhost:3000"
echo "WebSocket: ws://localhost:8080"
echo ""

# Check database
echo "🗄️  Database Status:"
echo "==================="
if pg_isready -q; then
    echo "✅ PostgreSQL: RUNNING"
    if psql -lqt | cut -d \| -f 1 | grep -qw chess_db; then
        echo "✅ Database 'chess_db': EXISTS"
    else
        echo "❌ Database 'chess_db': NOT FOUND"
    fi
else
    echo "❌ PostgreSQL: NOT RUNNING"
fi

echo ""
echo "🎮 Ready to play chess! ♟️" 