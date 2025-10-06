import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarbonMarketplace = ({ projectData, onComplete }) => {
  const [listing, setListing] = useState(null);
  const [marketStats, setMarketStats] = useState(null);
  const [livePrice, setLivePrice] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchLivePrice, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchMarketData = async () => {
    try {
      const statsResponse = await axios.get('/api/marketplace/statistics');
      setMarketStats(statsResponse.data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const fetchLivePrice = async () => {
    try {
      const priceResponse = await axios.get('/api/marketplace/live-prices');
      if (priceResponse.data.success) {
        setLivePrice(priceResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching live prices:', error);
    }
  };

  const handleListOnMarketplace = async () => {
    setLoading(true);
    
    try {
      const response = await axios.post(`/api/marketplace/list/${projectData.projectId}`);
      setListing(response.data);
      
      onComplete({
        marketplaceListing: response.data
      });
    } catch (error) {
      console.error('Error listing on marketplace:', error);
      alert('Error listing on marketplace. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (listing) {
    return (
      <div className="card">
        <h2>🌍 Listed on Global Carbon Marketplace!</h2>
        <p>Your carbon credits are now available for purchase by companies and individuals worldwide.</p>

        <div className="marketplace-success">
          <div className="grid">
            <div className="metric-card">
              <div className="metric-value">✓</div>
              <div className="metric-label">Successfully Listed</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{marketStats?.active_listings || 0}</div>
              <div className="metric-label">Total Active Listings</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">${livePrice?.current_price || marketStats?.current_price || 45}</div>
              <div className="metric-label">Current Market Price</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{marketStats?.demand_level || 'High'}</div>
              <div className="metric-label">Market Demand</div>
            </div>
          </div>

          <div className="market-interest">
            <h3>📈 Market Interest</h3>
            <div className="interest-list">
              <div className="interest-item">
                <div className="company-info">
                  <strong>EcoTech Corp</strong>
                  <span className="company-type">Corporate Buyer</span>
                </div>
                <div className="interest-details">
                  <span className="amount">1.5 tons</span>
                  <span className="offer">$67.50/ton</span>
                </div>
              </div>
              <div className="interest-item">
                <div className="company-info">
                  <strong>Green Future Inc</strong>
                  <span className="company-type">Investment Fund</span>
                </div>
                <div className="interest-details">
                  <span className="amount">0.8 tons</span>
                  <span className="offer">$36.00/ton</span>
                </div>
              </div>
            </div>
          </div>

          <div className="environmental-impact">
            <h3>🌱 Environmental Impact</h3>
            <div className="impact-grid">
              <div className="impact-item">
                <span className="impact-icon">🌊</span>
                <div className="impact-text">
                  <strong>Biodiversity Enhancement</strong>
                  <p>Restored marine habitat supporting local wildlife</p>
                </div>
              </div>
              <div className="impact-item">
                <span className="impact-icon">🛡️</span>
                <div className="impact-text">
                  <strong>Coastal Protection</strong>
                  <p>Natural barrier against storms and erosion</p>
                </div>
              </div>
              <div className="impact-item">
                <span className="impact-icon">💧</span>
                <div className="impact-text">
                  <strong>Water Quality Improvement</strong>
                  <p>Natural filtration improving local water systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="success">
          🎉 Your project is now contributing to global climate action through the carbon marketplace!
        </div>

        <button className="btn btn-primary" onClick={() => onComplete({})}>
          View Impact Dashboard →
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>🌍 Carbon Credit Marketplace</h2>
      <p>List your tokenized carbon credits on the global marketplace for companies to purchase and retire.</p>

      {livePrice && (
        <div className="live-market-data">
          <h3>📊 Live Market Data</h3>
          <div className="price-ticker">
            <div className="price-main">
              <span className="price-label">Carbon Credit Price</span>
              <span className="price-value">${livePrice.current_price}</span>
              <span className={`price-change ${livePrice.price_change_percent >= 0 ? 'positive' : 'negative'}`}>
                {livePrice.price_change_percent >= 0 ? '+' : ''}{livePrice.price_change_percent}%
              </span>
            </div>
            <div className="price-details">
              <span>24h High: ${livePrice.high_24h}</span>
              <span>24h Low: ${livePrice.low_24h}</span>
              <span>Sentiment: {livePrice.market_sentiment}</span>
            </div>
          </div>
        </div>
      )}

      <div className="market-overview">
        <div className="grid">
          <div className="metric-card">
            <div className="metric-value">{marketStats?.total_transactions || 1247}</div>
            <div className="metric-label">Total Transactions</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">${marketStats?.volume_24h || 12450}</div>
            <div className="metric-label">24h Volume</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{marketStats?.active_listings || 23}</div>
            <div className="metric-label">Active Listings</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{marketStats?.demand_level || 'High'}</div>
            <div className="metric-label">Market Demand</div>
          </div>
        </div>
      </div>

      <div className="listing-preview">
        <h3>📋 Your Listing Preview</h3>
        <div className="listing-card">
          <div className="listing-header">
            <h4>{projectData?.projectData?.project_type || 'Mangrove Restoration'}</h4>
            <span className="location">{projectData?.projectData?.location || 'Location'}</span>
          </div>
          <div className="listing-details">
            <div className="detail-row">
              <span>Available Credits:</span>
              <strong>{projectData?.tokenization?.carbon_credit?.total_credits || 'N/A'} tons CO₂</strong>
            </div>
            <div className="detail-row">
              <span>Price per Credit:</span>
              <strong>${projectData?.tokenization?.carbon_credit?.unit_price || 45}</strong>
            </div>
            <div className="detail-row">
              <span>Total Value:</span>
              <strong>${projectData?.tokenization?.carbon_credit?.total_value || 'N/A'}</strong>
            </div>
            <div className="detail-row">
              <span>Vintage Year:</span>
              <strong>{new Date().getFullYear()}</strong>
            </div>
          </div>
          <div className="listing-badges">
            <span className="badge verified">✓ Verified</span>
            <span className="badge blockchain">⛓️ Blockchain</span>
            <span className="badge blue-carbon">🌊 Blue Carbon</span>
          </div>
        </div>
      </div>

      <div className="community-benefits">
        <h3>👥 Community Benefits</h3>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-number">156</div>
            <div className="benefit-label">Families Supported</div>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">12</div>
            <div className="benefit-label">Jobs Created</div>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">70%</div>
            <div className="benefit-label">Revenue to Community</div>
          </div>
          <div className="benefit-item">
            <div className="benefit-number">✓</div>
            <div className="benefit-label">Women Empowerment</div>
          </div>
        </div>
      </div>

      <button 
        className="btn btn-primary" 
        onClick={handleListOnMarketplace}
        disabled={loading}
      >
        {loading ? 'Listing...' : 'List on Global Marketplace'}
      </button>

      {loading && (
        <div className="loading">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '90%' }}></div>
          </div>
          <p>🌍 Publishing your carbon credits to the global marketplace...</p>
        </div>
      )}
    </div>
  );
};

export default CarbonMarketplace;
