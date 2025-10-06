# 🌊 CarbonChain - Blue Carbon Registry Platform

A complete blockchain-based platform for managing blue carbon credits from mangrove restoration projects.

## 🚀 Features

- **🌱 Project Registration** - Complete carbon credit project onboarding
- **🛰️ AI Analysis** - Satellite imagery and site analysis
- **🔍 Multi-Stage Verification** - Internal, third-party, and legal verification
- **⛓️ Blockchain Integration** - Aptos smart contracts for immutable records
- **🪙 Tokenization** - ERC-20 compatible carbon credit tokens
- **🌍 Global Marketplace** - Real-time trading with live market data
- **📊 Impact Dashboard** - Real-time environmental and social impact tracking
- **💹 Live Pricing** - Binance API integration for real-time market data

## 🏗️ Tech Stack

### Frontend
- React 18
- Modern responsive UI
- Real-time data updates
- Progressive Web App ready

### Backend
- Python FastAPI
- SQLAlchemy ORM
- Real-time Binance API integration
- Comprehensive REST API

### Blockchain
- Aptos Move smart contracts
- GeoNFT (location-bound NFTs)
- Automated tokenization
- On-chain verification

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd CarbonChain-Deploy
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
pip install -r requirements.txt

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Start the application**

**Backend (Terminal 1):**
```bash
cd backend
python main.py
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## 📁 Project Structure

```
CarbonChain-Deploy/
├── backend/                 # Python FastAPI Backend
│   ├── main.py             # Main API application
│   ├── models.py           # Database models
│   ├── schemas.py          # Pydantic schemas
│   ├── database.py         # Database configuration
│   ├── requirements.txt    # Python dependencies
│   └── services/           # Business logic modules
│       ├── image_analysis.py
│       ├── carbon_calculator.py
│       ├── blockchain_service.py
│       ├── aptos_integration.py
│       ├── binance_price_service.py
│       ├── verification_service.py
│       └── marketplace_service.py
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── InitialAssessment.js
│   │   │   ├── VerificationSteps.js
│   │   │   ├── BlockchainRegistry.js
│   │   │   ├── SmartContracts.js
│   │   │   ├── CarbonMarketplace.js
│   │   │   └── ImpactDashboard.js
│   │   ├── App.js          # Main application
│   │   └── index.js        # Entry point
│   └── package.json        # Node dependencies
│
├── aptos-contracts/        # Aptos Move Smart Contracts
│   ├── sources/
│   │   └── carbon_credit.move
│   └── Move.toml
│
├── package.json            # Root package.json
├── netlify.toml           # Netlify deployment config
└── README.md              # This file
```

## 🌐 API Endpoints

### Projects
- `POST /api/projects` - Create new project
- `GET /api/projects/{id}` - Get project details
- `GET /api/projects` - List all projects

### Analysis
- `POST /api/analysis/site-image/{id}` - Upload & analyze image
- `POST /api/analysis/satellite/{id}` - Satellite analysis

### Verification
- `POST /api/verification/{id}` - Create verification
- `PUT /api/verification/{id}/approve` - Approve verification

### Blockchain
- `POST /api/blockchain/deploy/{id}` - Deploy smart contract
- `POST /api/blockchain/mint-geonft/{id}` - Mint GeoNFT

### Marketplace
- `POST /api/marketplace/list/{id}` - List credits
- `GET /api/marketplace/statistics` - Market statistics
- `GET /api/marketplace/live-prices` - Real-time prices

### Dashboard
- `GET /api/dashboard/{id}` - Project metrics

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL=sqlite:///./blue_carbon_registry.db
APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1
APTOS_PRIVATE_KEY=your_private_key_here
```

**Frontend (.env.local):**
```env
REACT_APP_API_URL=http://localhost:8000
```

## 🚀 Deployment

### Frontend (Netlify)
The frontend is configured for automatic deployment to Netlify:

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `frontend/build`
4. Deploy automatically on push

### Backend (Heroku/Railway)
Deploy the backend to any Python hosting service:

1. Set Python version to 3.9+
2. Install dependencies from `requirements.txt`
3. Start command: `python main.py`

## 💹 Real-Time Features

- **Live Market Data** - Updates every second from Binance API
- **Dynamic Pricing** - Carbon credits correlated to crypto markets
- **Real-Time Portfolio** - Live portfolio value calculations
- **Market Sentiment** - Bullish/Bearish indicators

## 🔒 Security Features

- Input validation with Pydantic
- SQL injection prevention
- CORS configuration
- Smart contract authorization
- Environment variable protection

## 📊 Impact Tracking

- CO₂ sequestration monitoring
- Biodiversity index calculation
- Community benefit tracking
- Water quality assessment
- Progress visualization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Aptos Foundation for blockchain infrastructure
- Binance for real-time market data API
- FastAPI for excellent Python web framework
- React team for powerful frontend library

---

**Built with ❤️ for climate action and sustainable development**
