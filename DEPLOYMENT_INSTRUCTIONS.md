# 🚀 CarbonChain Deployment Instructions

## ✅ Git Repository Ready!

Your code has been successfully committed to a local Git repository. Now follow these steps to push to GitHub and deploy:

## 📋 Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in to your account
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Repository settings:**
   - **Repository name:** `carbonchain-blue-carbon-registry`
   - **Description:** `Complete blockchain-based platform for blue carbon credit management with React frontend, FastAPI backend, and Aptos smart contracts`
   - **Visibility:** Public (recommended) or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. **Click "Create repository"**

## 📋 Step 2: Push Code to GitHub

After creating the repository, GitHub will show you commands. Use these in your terminal:

```bash
# Navigate to your project directory
cd "d:\school\CarbonChain-Deploy"

# Add the GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/carbonchain-blue-carbon-registry.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## 📋 Step 3: Deploy to Netlify

### Option A: Direct GitHub Integration (Recommended)

1. **Go to [netlify.com](https://netlify.com)** and sign in
2. **Click "New site from Git"**
3. **Connect to GitHub** and select your repository
4. **Configure build settings:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/build`
5. **Click "Deploy site"**

### Option B: Manual Deploy

1. **Build the frontend locally:**
   ```bash
   cd "d:\school\CarbonChain-Deploy\frontend"
   npm install
   npm run build
   ```

2. **Drag and drop** the `build` folder to Netlify

## 📋 Step 4: Deploy Backend (Optional)

For full functionality, deploy the backend to Heroku, Railway, or similar:

### Heroku Deployment:
```bash
# Install Heroku CLI first
cd "d:\school\CarbonChain-Deploy\backend"
heroku create carbonchain-api
git subtree push --prefix backend heroku main
```

### Railway Deployment:
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Select the `backend` folder
4. Deploy automatically

## 🌐 Expected URLs

After deployment, you'll get:
- **Frontend:** `https://carbonchain-blue-carbon-registry.netlify.app`
- **Backend:** `https://carbonchain-api.herokuapp.com` (if using Heroku)

## 🔧 Environment Variables

For production, set these environment variables:

**Frontend (.env):**
```env
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1
```

**Backend (.env):**
```env
DATABASE_URL=sqlite:///./blue_carbon_registry.db
APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1
CORS_ORIGINS=https://your-frontend-url.netlify.app
```

## 🎉 Success!

Once deployed, your CarbonChain platform will be live with:
- ✅ Complete carbon credit registration workflow
- ✅ AI-powered satellite analysis
- ✅ Multi-stage verification system
- ✅ Aptos blockchain integration
- ✅ Real-time market data from Binance
- ✅ Interactive impact dashboard

## 📞 Need Help?

If you encounter any issues:
1. Check the build logs in Netlify
2. Verify all files are properly pushed to GitHub
3. Ensure environment variables are set correctly
4. Check the README.md for detailed documentation

---

**🌊 Your Blue Carbon Registry Platform is Ready to Change the World! 🌍**
