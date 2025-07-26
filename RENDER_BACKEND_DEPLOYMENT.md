# 🚀 Render Backend Deployment Guide

This guide will help you deploy your Chess application backend to Render.

## 📋 **Prerequisites**

- GitHub repository with your Chess application
- Render account (free tier available)
- Database (PostgreSQL) - can be set up on Render or use external service

## 🌐 **Step 1: Set up Database**

### **Option A: Render PostgreSQL (Recommended)**

1. **Go to Render Dashboard** → **New** → **PostgreSQL**

2. **Configure the database:**
   - **Name**: `chess-db`
   - **Database**: `chess_db`
   - **User**: `chess_user`
   - **Plan**: Free (or paid for production)

3. **Copy the connection string** from the database dashboard

### **Option B: External Database (Supabase, Railway, etc.)**

Use your existing database connection string.

## 🔧 **Step 2: Deploy Backend to Render**

### **Method 1: Using Render Dashboard**

1. **Go to Render Dashboard** → **New** → **Web Service**

2. **Connect your GitHub repository**

3. **Configure the service:**
   - **Name**: `chess-backend`
   - **Root Directory**: `apps/backend`
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

4. **Add Environment Variables:**
   ```env
   NODE_ENV=production
   PORT=3000
   JWT_SECRET=your-secure-jwt-secret-here
   COOKIE_SECRET=your-secure-cookie-secret-here
   DATABASE_URL=postgresql://username:password@host:port/database
   ALLOWED_HOSTS=https://your-frontend-domain.com
   ```

5. **Click "Create Web Service"**

### **Method 2: Using render.yaml (Infrastructure as Code)**

1. **The `render.yaml` file is already created** in `apps/backend/`

2. **Go to Render Dashboard** → **New** → **Blueprint**

3. **Connect your GitHub repository**

4. **Render will automatically detect the `render.yaml` file**

5. **Update the environment variables** in the dashboard:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `ALLOWED_HOSTS` - Your frontend domain

## 🔐 **Step 3: Generate Secure Secrets**

### **Generate JWT Secret**
```bash
openssl rand -base64 32
```

### **Generate Cookie Secret**
```bash
openssl rand -base64 32
```

### **Set Environment Variables in Render**

1. **Go to your backend service** in Render dashboard
2. **Click "Environment"** tab
3. **Add the following variables:**

   ```env
   NODE_ENV=production
   PORT=3000
   JWT_SECRET=your-generated-jwt-secret
   COOKIE_SECRET=your-generated-cookie-secret
   DATABASE_URL=postgresql://username:password@host:port/database
   ALLOWED_HOSTS=https://your-frontend-domain.com
   ```

## 🗄️ **Step 4: Set up Database Schema**

### **Option A: Using Render Shell**

1. **Go to your backend service** in Render dashboard
2. **Click "Shell"** tab
3. **Run the following commands:**

   ```bash
   cd packages/db
   npx prisma db push
   npx prisma generate
   ```

### **Option B: Using Local Development**

1. **Update your local `.env`** with the production database URL
2. **Run migrations locally:**

   ```bash
   cd packages/db
   npx prisma db push
   ```

## 🔍 **Step 5: Test the Deployment**

### **Test API Endpoints**

1. **Get your backend URL** from Render dashboard (e.g., `https://chess-backend.onrender.com`)

2. **Test the health endpoint:**
   ```bash
   curl https://your-backend-url.onrender.com/v1/
   ```

3. **Test guest authentication:**
   ```bash
   curl -X POST https://your-backend-url.onrender.com/auth/guest \
     -H "Content-Type: application/json" \
     -d '{"name":"TestPlayer"}'
   ```

### **Expected Responses**

- **Health Check**: Should return a success message
- **Guest Auth**: Should return user data with JWT token

## ⚙️ **Step 6: Configure CORS**

### **Update CORS Settings**

Make sure your backend allows your frontend domain. The CORS configuration should include:

```javascript
app.use(cors({
  origin: process.env.ALLOWED_HOSTS?.split(',') || ['http://localhost:5173'],
  credentials: true,
  methods: 'GET,POST,PUT,DELETE',
}));
```

### **Set ALLOWED_HOSTS**

In Render environment variables, set:
```env
ALLOWED_HOSTS=https://your-frontend-domain.com,https://your-frontend-domain.netlify.app
```

## 🔄 **Step 7: Automatic Deployments**

### **Enable Auto-Deploy**

1. **In Render dashboard**, go to your backend service
2. **Click "Settings"** tab
3. **Enable "Auto-Deploy"** for your main branch

### **Deployment Triggers**

- **Push to main branch** → Automatic deployment
- **Manual deployment** → Available in dashboard

## 📊 **Step 8: Monitoring**

### **View Logs**

1. **Go to your backend service** in Render dashboard
2. **Click "Logs"** tab
3. **Monitor for errors and performance**

### **Health Checks**

Render automatically performs health checks. Make sure your app responds to:
- `GET /` or `GET /health`

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Build Failures**
   - Check if all dependencies are in `package.json`
   - Verify Node.js version compatibility
   - Check build logs in Render dashboard

2. **Database Connection Issues**
   - Verify `DATABASE_URL` format
   - Check if database is accessible from Render
   - Ensure database schema is migrated

3. **CORS Errors**
   - Verify `ALLOWED_HOSTS` includes your frontend domain
   - Check CORS configuration in backend code

4. **JWT Errors**
   - Ensure `JWT_SECRET` is set correctly
   - Verify JWT token format in requests

### **Debug Commands**

```bash
# Check if backend is running
curl https://your-backend-url.onrender.com/v1/

# Test database connection
curl https://your-backend-url.onrender.com/auth/guest \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'

# Check environment variables
# (View in Render dashboard → Environment tab)
```

## 🔒 **Security Best Practices**

### **Environment Variables**

- ✅ **Never commit secrets** to Git
- ✅ **Use Render's environment variable management**
- ✅ **Rotate secrets regularly**
- ✅ **Use strong, random secrets**

### **CORS Configuration**

- ✅ **Only allow necessary domains**
- ✅ **Use HTTPS in production**
- ✅ **Validate origin headers**

### **Database Security**

- ✅ **Use connection pooling**
- ✅ **Limit database access**
- ✅ **Regular backups**

## 📈 **Performance Optimization**

### **Render Free Tier Limits**

- **512 MB RAM**
- **0.1 CPU**
- **750 hours/month**
- **Sleeps after 15 minutes of inactivity**

### **Optimization Tips**

1. **Enable connection pooling** for database
2. **Use caching** where appropriate
3. **Optimize bundle size**
4. **Monitor memory usage**

## 🎉 **Success!**

Your backend is now deployed at:
**`https://your-backend-name.onrender.com`**

### **Next Steps**

1. **Deploy WebSocket server** (separate service)
2. **Deploy frontend** to Netlify
3. **Update frontend environment variables**
4. **Test the complete application**

## 📞 **Support**

If you encounter issues:

1. **Check Render documentation**: [render.com/docs](https://render.com/docs)
2. **Review service logs** in Render dashboard
3. **Verify environment variables**
4. **Test endpoints** with curl or Postman

---

**Happy Deploying! 🚀** 