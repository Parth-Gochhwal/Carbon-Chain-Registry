# 🚀 Backend Deployment Guide - CarbonChain API

## ✅ Backend Status Check

### **Your Backend is READY for Deployment!**

**What's Included:**
- ✅ FastAPI application (main.py - 619 lines)
- ✅ Database models (5 models: Project, Verification, BlockchainTransaction, CarbonCredit, MarketListing)
- ✅ Pydantic schemas for validation
- ✅ 7 Service modules (image analysis, carbon calculator, blockchain, etc.)
- ✅ 20+ API endpoints
- ✅ CORS middleware configured
- ✅ Real-time Binance price integration
- ✅ Aptos blockchain integration
- ✅ SQLAlchemy ORM with SQLite/PostgreSQL support
- ✅ Complete requirements.txt

---

## 📋 Backend Deployment Options

### **Option 1: Railway (Recommended - Easiest)**

**Why Railway:**
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Built-in PostgreSQL database
- ✅ Environment variables management
- ✅ Custom domains
- ✅ Easy to use

**Steps:**

1. **Go to [railway.app](https://railway.app)**

2. **Sign in with GitHub**

3. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose: `Nishat2006/carbonchain-blue-carbon-registry`

4. **Configure Service:**
   - Root Directory: `backend`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Or it will auto-detect from `Procfile`

5. **Add Environment Variables:**
   ```
   DATABASE_URL=postgresql://...  (Railway provides this automatically)
   APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1
   CORS_ORIGINS=https://your-frontend-url.vercel.app,http://localhost:3000
   ENVIRONMENT=production
   ```

6. **Add PostgreSQL Database (Optional but Recommended):**
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will automatically set DATABASE_URL

7. **Deploy:**
   - Railway will automatically deploy
   - You'll get a URL like: `https://your-app.railway.app`

8. **Update Frontend:**
   - Update `REACT_APP_API_URL` in your frontend to point to Railway URL

---

### **Option 2: Render**

**Why Render:**
- ✅ Free tier with PostgreSQL
- ✅ Auto-deploy from GitHub
- ✅ Easy setup

**Steps:**

1. **Go to [render.com](https://render.com)**

2. **Create New Web Service:**
   - Connect GitHub repository
   - Select: `carbonchain-blue-carbon-registry`

3. **Configure:**
   ```
   Name: carbonchain-api
   Root Directory: backend
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

4. **Add Environment Variables:**
   ```
   DATABASE_URL=postgresql://...
   APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1
   CORS_ORIGINS=https://your-frontend-url.vercel.app
   ```

5. **Create PostgreSQL Database:**
   - New → PostgreSQL
   - Copy connection string to DATABASE_URL

6. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (~5 minutes)

---

### **Option 3: Heroku**

**Steps:**

1. **Install Heroku CLI:**
   ```bash
   # Windows (using Chocolatey)
   choco install heroku-cli
   
   # Or download from heroku.com
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create Heroku App:**
   ```bash
   cd d:\school\CarbonChain-Deploy\backend
   heroku create carbonchain-api
   ```

4. **Add PostgreSQL:**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

5. **Set Environment Variables:**
   ```bash
   heroku config:set APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1
   heroku config:set CORS_ORIGINS=https://your-frontend-url.vercel.app
   heroku config:set ENVIRONMENT=production
   ```

6. **Deploy:**
   ```bash
   git subtree push --prefix backend heroku main
   ```

7. **Open App:**
   ```bash
   heroku open
   ```

---

### **Option 4: DigitalOcean App Platform**

**Steps:**

1. **Go to [digitalocean.com](https://digitalocean.com)**

2. **Create App:**
   - Apps → Create App
   - Connect GitHub repository

3. **Configure:**
   ```
   Source Directory: backend
   Type: Web Service
   Run Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

4. **Add Database:**
   - Add Component → Database → PostgreSQL

5. **Deploy:**
   - Click "Create Resources"

---

## 🔧 Backend Configuration Checklist

### **Files Created for Deployment:**

✅ **Procfile** - Tells hosting platform how to run your app
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

✅ **runtime.txt** - Specifies Python version
```
python-3.11.6
```

✅ **.env.example** - Environment variables template

✅ **requirements.txt** - All Python dependencies listed

---

## 🔍 Backend Readiness Verification

### **✅ What's Working:**

1. **✅ FastAPI Application**
   - Main app configured
   - CORS middleware enabled
   - Startup events configured
   - Error handling implemented

2. **✅ Database Layer**
   - SQLAlchemy ORM configured
   - 5 models defined (Project, Verification, BlockchainTransaction, CarbonCredit, MarketListing)
   - Database session management
   - Auto-create tables on startup

3. **✅ API Endpoints (20+)**
   - `POST /api/projects` - Create project
   - `GET /api/projects/{id}` - Get project
   - `POST /api/analysis/site-image/{id}` - Image analysis
   - `POST /api/analysis/satellite/{id}` - Satellite analysis
   - `POST /api/verification/{id}` - Create verification
   - `PUT /api/verification/{id}/approve` - Approve verification
   - `POST /api/blockchain/deploy/{id}` - Deploy contract
   - `POST /api/blockchain/mint-geonft/{id}` - Mint GeoNFT
   - `POST /api/blockchain/tokenize/{id}` - Tokenize credits
   - `GET /api/marketplace/live-prices` - Real-time prices
   - `GET /api/marketplace/statistics` - Market stats
   - `POST /api/marketplace/list/{id}` - List credits
   - `GET /api/dashboard/{id}` - Dashboard metrics
   - And more...

4. **✅ Services (7 modules)**
   - `image_analysis.py` - AI image processing
   - `carbon_calculator.py` - Carbon credit calculations
   - `blockchain_service.py` - Blockchain operations
   - `aptos_integration.py` - Aptos blockchain
   - `binance_price_service.py` - Real-time market data
   - `verification_service.py` - Verification workflow
   - `marketplace_service.py` - Trading operations

5. **✅ Real-time Features**
   - Binance API integration
   - Price updater (runs on startup)
   - Live market data
   - WebSocket ready (can be added)

---

## 🌐 After Backend Deployment

### **1. Update Frontend Environment Variables:**

Once your backend is deployed, update your frontend:

**For Vercel:**
```bash
# Go to Vercel Dashboard → Your Project → Settings → Environment Variables
REACT_APP_API_URL=https://your-backend-url.railway.app
```

**For Netlify:**
```bash
# Go to Netlify Dashboard → Site Settings → Environment Variables
REACT_APP_API_URL=https://your-backend-url.railway.app
```

### **2. Update CORS in Backend:**

Make sure your backend CORS settings include your frontend URL:

```python
# In main.py, line 42
allow_origins=[
    "http://localhost:3000",
    "https://your-frontend-url.vercel.app",  # Add your actual frontend URL
    "https://your-frontend-url.netlify.app"
]
```

### **3. Test API Endpoints:**

Visit your backend URL:
```
https://your-backend-url.railway.app/docs
```

You'll see the interactive API documentation (Swagger UI) where you can test all endpoints!

---

## 🧪 Local Testing (Before Deployment)

### **Test Backend Locally:**

1. **Install Dependencies:**
   ```bash
   cd d:\school\CarbonChain-Deploy\backend
   pip install -r requirements.txt
   ```

2. **Run Server:**
   ```bash
   python main.py
   ```

3. **Test API:**
   - Open: http://localhost:8000/docs
   - Try creating a project
   - Test endpoints

4. **Test with Frontend:**
   - Run frontend: `cd ../frontend && npm start`
   - Frontend will connect to backend via proxy
   - Test the complete flow

---

## 📊 Backend Deployment Status

| Component | Status | Notes |
|-----------|--------|-------|
| **FastAPI App** | ✅ Ready | 619 lines, fully configured |
| **Database Models** | ✅ Ready | 5 models defined |
| **API Endpoints** | ✅ Ready | 20+ endpoints |
| **Services** | ✅ Ready | 7 service modules |
| **CORS** | ✅ Configured | Needs frontend URL update |
| **Requirements** | ✅ Complete | All dependencies listed |
| **Procfile** | ✅ Created | For Heroku/Railway |
| **Runtime** | ✅ Created | Python 3.11.6 |
| **Environment** | ✅ Template | .env.example created |

---

## ⚠️ Important Notes

### **Database:**
- **Development:** Uses SQLite (file-based, included)
- **Production:** Should use PostgreSQL (Railway/Render provide free tier)
- Database tables are auto-created on first run

### **Aptos Blockchain:**
- Requires Aptos private key for transactions
- Testnet URL is configured by default
- Can work without it (endpoints will return mock data)

### **Binance API:**
- Currently uses public endpoints (no API key needed)
- Rate limited to 1200 requests/minute
- Works out of the box

### **File Uploads:**
- Image analysis endpoints accept file uploads
- Make sure hosting platform supports file uploads
- Railway and Render support this by default

---

## 🚀 Quick Start Deployment (Railway - Recommended)

**5-Minute Deployment:**

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. New Project → Deploy from GitHub
4. Select: `carbonchain-blue-carbon-registry`
5. Root Directory: `backend`
6. Add PostgreSQL database (optional)
7. Set environment variable:
   ```
   CORS_ORIGINS=https://your-frontend-url.vercel.app
   ```
8. Deploy!
9. Copy your Railway URL
10. Update frontend `REACT_APP_API_URL` with Railway URL
11. Redeploy frontend

**Done! Your full-stack app is live! 🎉**

---

## 🔗 Complete Deployment Flow

### **Step 1: Deploy Backend (Railway)**
```
1. Railway.app → New Project
2. Connect GitHub repo
3. Root: backend
4. Add PostgreSQL
5. Set CORS_ORIGINS
6. Deploy → Get URL
```

### **Step 2: Deploy Frontend (Vercel)**
```
1. Vercel.com → New Project
2. Import GitHub repo
3. Root: frontend
4. Set REACT_APP_API_URL=<railway-url>
5. Deploy → Get URL
```

### **Step 3: Update Backend CORS**
```
1. Update main.py CORS origins
2. Add Vercel URL
3. Push to GitHub
4. Railway auto-redeploys
```

### **Step 4: Test**
```
1. Visit frontend URL
2. Create a project
3. Go through all steps
4. Verify data persistence
```

---

## ✅ Final Checklist

**Before Deployment:**
- [x] Backend code complete
- [x] Requirements.txt ready
- [x] Procfile created
- [x] Runtime.txt created
- [x] .env.example created
- [x] All endpoints tested locally

**During Deployment:**
- [ ] Choose hosting platform (Railway recommended)
- [ ] Deploy backend
- [ ] Add PostgreSQL database
- [ ] Set environment variables
- [ ] Get backend URL

**After Deployment:**
- [ ] Update frontend REACT_APP_API_URL
- [ ] Update backend CORS_ORIGINS
- [ ] Test API endpoints (/docs)
- [ ] Test frontend integration
- [ ] Verify data persistence

---

## 🎉 Your Backend is 100% Ready!

**What You Have:**
- ✅ Complete FastAPI backend (619 lines)
- ✅ 20+ API endpoints
- ✅ 7 service modules
- ✅ Database integration
- ✅ Blockchain integration
- ✅ Real-time market data
- ✅ Deployment files ready
- ✅ All dependencies listed

**Next Step:** Choose Railway (easiest) and deploy in 5 minutes!

**Repository:** https://github.com/Nishat2006/carbonchain-blue-carbon-registry

---

**Built with ❤️ for climate action and sustainable development**
