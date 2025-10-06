# 🔧 Deployment Configuration Fix

## ❌ Error Encountered:
```
sh: 1: react-scripts: not found
ERROR: failed to build: exit code: 127
```

## ✅ Root Cause:
The deployment platform was trying to build from the **root directory** instead of the **frontend directory**, causing `node_modules` to not be found.

## ✅ SOLUTION - Correct Deployment Settings

---

## 🚀 **VERCEL DEPLOYMENT (Recommended)**

### **Method 1: Vercel Dashboard (Easiest)**

1. **Go to [vercel.com](https://vercel.com)**
2. **New Project** → Import `carbonchain-blue-carbon-registry`
3. **IMPORTANT - Configure these settings:**

```
Framework Preset: Create React App
Root Directory: frontend
Build Command: npm run build
Output Directory: build
Install Command: npm install
Node Version: 18.x
```

4. **Environment Variables:**
```
REACT_APP_API_URL=https://your-backend-url.railway.app
```

5. **Deploy!**

### **Method 2: Vercel CLI**

```bash
cd d:\school\CarbonChain-Deploy\frontend
npm install -g vercel
vercel login
vercel --prod
```

When prompted:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- Project name? **carbonchain**
- Directory? **.** (current directory)
- Override settings? **No**

---

## 🚀 **NETLIFY DEPLOYMENT**

### **Method 1: Netlify Dashboard**

1. **Go to [netlify.com](https://netlify.com)**
2. **New site from Git** → Select repository
3. **IMPORTANT - Configure these settings:**

```
Base directory: frontend
Build command: npm install && npm run build
Publish directory: frontend/build
Node version: 18
```

4. **Environment Variables:**
```
REACT_APP_API_URL=https://your-backend-url.railway.app
```

5. **Deploy site!**

### **Method 2: Netlify CLI**

```bash
cd d:\school\CarbonChain-Deploy\frontend
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## 🚀 **RAILWAY DEPLOYMENT (For Backend)**

### **Backend Deployment:**

1. **Go to [railway.app](https://railway.app)**
2. **New Project** → **Deploy from GitHub**
3. **Select:** `carbonchain-blue-carbon-registry`
4. **IMPORTANT - Configure:**

```
Root Directory: backend
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
```

5. **Add PostgreSQL Database** (optional)
6. **Environment Variables:**
```
CORS_ORIGINS=https://your-frontend-url.vercel.app,http://localhost:3000
APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1
ENVIRONMENT=production
```

7. **Deploy!**

---

## 📋 **Updated Configuration Files**

### **✅ frontend/vercel.json** (Updated)
```json
{
  "buildCommand": "npm install && npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### **✅ frontend/netlify.toml** (Updated)
```toml
[build]
  publish = "build"
  command = "npm install && npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"
```

---

## 🎯 **CORRECT DEPLOYMENT CHECKLIST**

### **For Vercel:**
- ✅ Root Directory: **frontend** (NOT root!)
- ✅ Framework: Create React App
- ✅ Build Command: npm run build
- ✅ Output Directory: build
- ✅ Install Command: npm install
- ✅ Node Version: 18.x

### **For Netlify:**
- ✅ Base directory: **frontend** (NOT root!)
- ✅ Build command: npm install && npm run build
- ✅ Publish directory: frontend/build
- ✅ Node version: 18

### **For Railway (Backend):**
- ✅ Root Directory: **backend**
- ✅ Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
- ✅ Python Version: 3.11

---

## 🔍 **Why This Error Happened**

**Wrong Configuration:**
```
Root Directory: . (root of repository)
Build tries to run: npm run build
But node_modules is in: frontend/node_modules
Result: react-scripts not found ❌
```

**Correct Configuration:**
```
Root Directory: frontend
Build runs from: frontend/
Finds node_modules in: frontend/node_modules
Result: Build succeeds ✅
```

---

## 🚀 **QUICK FIX - Deploy Now**

### **Option 1: Vercel (3 minutes)**

1. Go to [vercel.com](https://vercel.com)
2. New Project → Import your repo
3. **Set Root Directory to: `frontend`** ⚠️ IMPORTANT
4. Deploy

### **Option 2: Netlify (3 minutes)**

1. Go to [netlify.com](https://netlify.com)
2. New site from Git → Select your repo
3. **Set Base directory to: `frontend`** ⚠️ IMPORTANT
4. Deploy

---

## ✅ **Verification After Deployment**

Once deployed successfully, you should see:

**Build Logs:**
```
✓ Installing dependencies
✓ Running npm install
✓ Building application
✓ Compiled successfully
✓ Build completed
✓ Deployment ready
```

**Your Live Site:**
- Homepage loads ✅
- All 6 steps visible ✅
- Navigation works ✅
- No console errors ✅

---

## 🎉 **Summary**

**The Fix:**
- ✅ Updated vercel.json with correct build commands
- ✅ Updated netlify.toml with npm install
- ✅ Documented correct Root Directory settings
- ✅ Pushed to GitHub

**Next Steps:**
1. Deploy to Vercel/Netlify with **Root Directory: frontend**
2. Deploy backend to Railway with **Root Directory: backend**
3. Update CORS settings
4. Test your live app!

**Your app is ready to deploy - just make sure to set the Root Directory correctly!**

---

**Repository:** https://github.com/Nishat2006/carbonchain-blue-carbon-registry
