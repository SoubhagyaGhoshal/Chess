# 🚀 Deployment Guide - Chess Application

This guide will help you deploy your Chess application to production. Since this is a full-stack application, we'll need to deploy different components to different platforms.

## 📋 **Deployment Overview**

| Component | Platform | Purpose |
|-----------|----------|---------|
| **Frontend** | Netlify | React application |
| **Backend API** | Railway/Render | Express.js API |
| **WebSocket Server** | Railway/Render | Real-time game server |
| **Database** | Supabase/Railway | PostgreSQL database |

## 🌐 **Step 1: Deploy Backend API**

### **Option A: Railway (Recommended)**

1. **Sign up for Railway** at [railway.app](https://railway.app)

2. **Create a new project** and connect your GitHub repository

3. **Add a new service** → **Deploy from GitHub repo**

4. **Configure the service:**
   - **Root Directory**: `apps/backend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

5. **Add environment variables:**
   ```env
   JWT_SECRET=your-secure-jwt-secret
   DATABASE_URL=your-database-url
   COOKIE_SECRET=your-secure-cookie-secret
   PORT=3000
   ALLOWED_HOSTS=https://your-netlify-app.netlify.app
   ```

6. **Deploy and get your API URL** (e.g., `https://your-backend.railway.app`)

### **Option B: Render**

1. **Sign up for Render** at [render.com](https://render.com)

2. **Create a new Web Service**

3. **Connect your GitHub repository**

4. **Configure the service:**
   - **Root Directory**: `apps/backend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

5. **Add environment variables** (same as Railway)

## 🔌 **Step 2: Deploy WebSocket Server**

### **Railway (Recommended)**

1. **Add another service** in your Railway project

2. **Configure the service:**
   - **Root Directory**: `apps/ws`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

3. **Add environment variables:**
   ```env
   JWT_SECRET=your-secure-jwt-secret
   DATABASE_URL=your-database-url
   PORT=8080
   ```

4. **Deploy and get your WebSocket URL** (e.g., `wss://your-websocket.railway.app`)

## 🗄️ **Step 3: Set up Database**

### **Option A: Supabase (Recommended)**

1. **Sign up for Supabase** at [supabase.com](https://supabase.com)

2. **Create a new project**

3. **Get your database URL** from Settings → Database

4. **Run migrations:**
   ```bash
   cd packages/db
   npx prisma db push --schema=./prisma/schema.prisma
   ```

### **Option B: Railway Database**

1. **Add a PostgreSQL service** in Railway

2. **Get the connection string** from the service

3. **Update your backend and WebSocket environment variables**

## 🎨 **Step 4: Deploy Frontend to Netlify**

### **Method 1: Deploy via Netlify UI**

1. **Sign up for Netlify** at [netlify.com](https://netlify.com)

2. **Click "New site from Git"**

3. **Connect your GitHub repository**

4. **Configure build settings:**
   - **Base directory**: `apps/frontend`
   - **Build command**: `yarn build`
   - **Publish directory**: `dist`

5. **Add environment variables:**
   ```env
   VITE_APP_BACKEND_URL=https://your-backend-url.railway.app
   VITE_APP_WS_URL=wss://your-websocket-url.railway.app
   ```

6. **Deploy**

### **Method 2: Deploy via Netlify CLI**

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Build the frontend:**
   ```bash
   cd apps/frontend
   yarn build
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

## ⚙️ **Step 5: Environment Configuration**

### **Frontend Environment Variables**

Create a `.env.production` file in `apps/frontend/`:

```env
VITE_APP_BACKEND_URL=https://your-backend-url.railway.app
VITE_APP_WS_URL=wss://your-websocket-url.railway.app
```

### **Backend Environment Variables**

In Railway/Render dashboard:

```env
JWT_SECRET=your-secure-jwt-secret-here
DATABASE_URL=postgresql://username:password@host:port/database
COOKIE_SECRET=your-secure-cookie-secret-here
PORT=3000
ALLOWED_HOSTS=https://your-netlify-app.netlify.app
```

### **WebSocket Environment Variables**

```env
JWT_SECRET=your-secure-jwt-secret-here
DATABASE_URL=postgresql://username:password@host:port/database
PORT=8080
```

## 🔧 **Step 6: Update Configuration Files**

### **Update Vite Configuration**

Make sure your `apps/frontend/vite.config.ts` has proper build settings:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 5173,
  },
})
```

### **Update Package.json Scripts**

Ensure your `apps/frontend/package.json` has:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

## 🧪 **Step 7: Testing Deployment**

1. **Test the frontend** at your Netlify URL
2. **Test the backend API** by visiting `https://your-backend-url.railway.app/v1/`
3. **Test WebSocket connection** using browser dev tools
4. **Test the complete flow** by creating a game and inviting a friend

## 🔒 **Step 8: Security Considerations**

### **Generate Secure Secrets**

```bash
# Generate JWT Secret
openssl rand -base64 32

# Generate Cookie Secret
openssl rand -base64 32
```

### **CORS Configuration**

Make sure your backend allows your Netlify domain:

```javascript
app.use(cors({
  origin: ['https://your-app.netlify.app'],
  credentials: true
}));
```

### **Environment Variables**

- Never commit `.env` files to Git
- Use platform-specific environment variable management
- Rotate secrets regularly

## 🚨 **Troubleshooting**

### **Common Issues**

1. **CORS Errors**
   - Check `ALLOWED_HOSTS` in backend environment
   - Ensure frontend URL is included

2. **WebSocket Connection Failed**
   - Verify WebSocket URL is correct
   - Check if WebSocket server is running

3. **Database Connection Issues**
   - Verify `DATABASE_URL` format
   - Check if database is accessible

4. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### **Debug Commands**

```bash
# Check backend logs
railway logs

# Check WebSocket logs
railway logs --service websocket

# Test database connection
npx prisma db push --schema=./packages/db/prisma/schema.prisma
```

## 📊 **Monitoring**

### **Railway Dashboard**
- Monitor API and WebSocket server performance
- Check logs for errors
- Monitor resource usage

### **Netlify Dashboard**
- Monitor frontend build status
- Check deployment logs
- Monitor site performance

### **Database Monitoring**
- Monitor connection pool usage
- Check query performance
- Monitor storage usage

## 🔄 **Continuous Deployment**

### **Automatic Deployments**

1. **Connect GitHub repository** to all platforms
2. **Set up branch protection** rules
3. **Configure automatic deployments** on push to main branch

### **Deployment Pipeline**

```yaml
# Example GitHub Actions workflow
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './apps/frontend/dist'
```

## 🎉 **Success!**

Once deployed, your Chess application will be available at:
- **Frontend**: `https://your-app.netlify.app`
- **Backend API**: `https://your-backend.railway.app`
- **WebSocket**: `wss://your-websocket.railway.app`

## 📞 **Support**

If you encounter issues:
1. Check platform-specific documentation
2. Review logs in platform dashboards
3. Verify environment variables
4. Test locally with production URLs

---

**Happy Deploying! 🚀** 