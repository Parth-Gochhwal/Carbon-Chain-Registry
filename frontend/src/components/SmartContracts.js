import React, { useState } from 'react';
import axios from 'axios';

const SmartContracts = ({ projectData, onComplete }) => {
  const [tokenization, setTokenization] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unitPrice, setUnitPrice] = useState(45.0);

  const handleTokenization = async () => {
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('unit_price', unitPrice);

      const response = await axios.post(`/api/tokenization/create/${projectData.projectId}`, formData);
      setTokenization(response.data);
      
      onComplete({
        tokenization: response.data
      });
    } catch (error) {
      console.error('Error creating tokens:', error);
      alert('Error creating carbon tokens. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (tokenization) {
    return (
      <div className="card">
        <h2>🪙 Carbon Credits Tokenized!</h2>
        <p>Your carbon credits have been successfully converted to ERC-20 compatible tokens.</p>

        <div className="tokenization-summary">
          <div className="grid">
            <div className="metric-card">
              <div className="metric-value">{tokenization.carbon_credit.total_credits}</div>
              <div className="metric-label">Total Credits</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">${tokenization.carbon_credit.unit_price}</div>
              <div className="metric-label">Price per Credit</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">${tokenization.carbon_credit.total_value}</div>
              <div className="metric-label">Total Value</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{tokenization.carbon_credit.token_standard}</div>
              <div className="metric-label">Token Standard</div>
            </div>
          </div>

          <div className="revenue-distribution">
            <h3>💰 Revenue Distribution</h3>
            <div className="distribution-chart">
              <div className="distribution-item">
                <div className="distribution-bar community" style={{width: '70%'}}></div>
                <div className="distribution-label">
                  <strong>Community Benefit (70%)</strong>
                  <span>${tokenization.revenue_distribution.community_benefit}</span>
                </div>
              </div>
              <div className="distribution-item">
                <div className="distribution-bar verification" style={{width: '10%'}}></div>
                <div className="distribution-label">
                  <strong>Verification Cost (10%)</strong>
                  <span>${tokenization.revenue_distribution.verification_cost}</span>
                </div>
              </div>
              <div className="distribution-item">
                <div className="distribution-bar platform" style={{width: '5%'}}></div>
                <div className="distribution-label">
                  <strong>Platform Fee (5%)</strong>
                  <span>${tokenization.revenue_distribution.platform_fee}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="token-details">
            <h3>📋 Token Details</h3>
            <div className="detail-row">
              <strong>Transaction Hash:</strong>
              <code>{tokenization.transaction.transaction_hash}</code>
            </div>
            <div className="detail-row">
              <strong>Block Number:</strong>
              <code>{tokenization.transaction.block_number}</code>
            </div>
            <div className="detail-row">
              <strong>Gas Used:</strong>
              <code>{tokenization.transaction.gas_used}</code>
            </div>
            <div className="detail-row">
              <strong>Network Fee:</strong>
              <code>${tokenization.transaction.network_fee}</code>
            </div>
          </div>
        </div>

        <div className="success">
          🎉 Your carbon credits are now tradeable tokens ready for the marketplace!
        </div>

        <button className="btn btn-primary" onClick={() => onComplete({})}>
          List on Carbon Marketplace →
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>🪙 Smart Contract Tokenization</h2>
      <p>Convert your verified carbon credits into tradeable ERC-20 tokens.</p>

      <div className="tokenization-info">
        <div className="grid">
          <div className="info-card">
            <h4>🔄 ERC-20 Tokens</h4>
            <p>Industry-standard fungible tokens that can be easily traded, transferred, and retired.</p>
          </div>
          <div className="info-card">
            <h4>💎 Fractional Ownership</h4>
            <p>Tokens can be divided and sold in smaller quantities, increasing market liquidity.</p>
          </div>
          <div className="info-card">
            <h4>🔒 Automated Compliance</h4>
            <p>Smart contracts automatically enforce retirement rules and prevent double-spending.</p>
          </div>
          <div className="info-card">
            <h4>📊 Real-time Tracking</h4>
            <p>All token movements are tracked on-chain with complete transparency.</p>
          </div>
        </div>
      </div>

      <div className="tokenization-setup">
        <h3>⚙️ Tokenization Configuration</h3>
        
        <div className="project-summary">
          <div className="grid">
            <div className="summary-item">
              <strong>Estimated Carbon Credits:</strong>
              <span>{projectData?.analysis?.carbon_calculation?.total_carbon_tons || 'N/A'} tons CO₂</span>
            </div>
            <div className="summary-item">
              <strong>Project Type:</strong>
              <span>{projectData?.projectData?.project_type || 'N/A'}</span>
            </div>
            <div className="summary-item">
              <strong>Vintage Year:</strong>
              <span>{new Date().getFullYear()}</span>
            </div>
            <div className="summary-item">
              <strong>Registry:</strong>
              <span>Blue Carbon Network</span>
            </div>
          </div>
        </div>

        <div className="pricing-setup">
          <div className="form-group">
            <label>Unit Price (USD per ton CO₂)</label>
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
              min="1"
              step="0.01"
              className="price-input"
            />
            <small>Market average: $45-65 per ton for blue carbon credits</small>
          </div>

          <div className="pricing-preview">
            <h4>💰 Revenue Preview</h4>
            <div className="preview-calculations">
              <div className="calc-row">
                <span>Total Credits:</span>
                <strong>{projectData?.analysis?.carbon_calculation?.total_carbon_tons || 0} tons</strong>
              </div>
              <div className="calc-row">
                <span>Unit Price:</span>
                <strong>${unitPrice}</strong>
              </div>
              <div className="calc-row total">
                <span>Total Value:</span>
                <strong>${((projectData?.analysis?.carbon_calculation?.total_carbon_tons || 0) * unitPrice).toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleTokenization}
          disabled={loading}
        >
          {loading ? 'Creating Tokens...' : 'Create Carbon Credit Tokens'}
        </button>
      </div>

      {loading && (
        <div className="loading">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '80%' }}></div>
          </div>
          <p>🪙 Creating ERC-20 tokens and setting up smart contract automation...</p>
        </div>
      )}
    </div>
  );
};

export default SmartContracts;
