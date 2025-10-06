import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlockchainRegistry = ({ projectData, onComplete }) => {
  const [deployment, setDeployment] = useState(null);
  const [geoNFT, setGeoNFT] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const deployToBlockchain = async () => {
    setLoading(true);
    setCurrentStep(1);
    
    try {
      // Deploy smart contract
      const deployResponse = await axios.post(`/api/blockchain/deploy/${projectData.projectId}`);
      setDeployment(deployResponse.data);
      setCurrentStep(2);

      // Mint GeoNFT
      setTimeout(async () => {
        const nftResponse = await axios.post(`/api/blockchain/mint-geonft/${projectData.projectId}`);
        setGeoNFT(nftResponse.data);
        setCurrentStep(3);
        
        onComplete({
          blockchainDeployment: deployResponse.data,
          geoNFT: nftResponse.data
        });
      }, 2000);

    } catch (error) {
      console.error('Error deploying to blockchain:', error);
      alert('Error deploying to blockchain. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (deployment && geoNFT) {
    return (
      <div className="card">
        <h2>⛓️ Blockchain Deployment Complete!</h2>
        <p>Your project has been successfully registered on the Aptos blockchain.</p>

        <div className="blockchain-details">
          <div className="grid">
            <div className="metric-card">
              <div className="metric-value">✓</div>
              <div className="metric-label">Smart Contract Deployed</div>
              <small>{deployment.contract_address}</small>
            </div>
            <div className="metric-card">
              <div className="metric-value">✓</div>
              <div className="metric-label">GeoNFT Minted</div>
              <small>{geoNFT.nft_id}</small>
            </div>
            <div className="metric-card">
              <div className="metric-value">{deployment.transaction.gas_used}</div>
              <div className="metric-label">Gas Used</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">${deployment.transaction.network_fee}</div>
              <div className="metric-label">Network Fee</div>
            </div>
          </div>

          <div className="transaction-details">
            <h3>📋 Transaction Details</h3>
            <div className="detail-row">
              <strong>Contract Address:</strong>
              <code>{deployment.contract_address}</code>
            </div>
            <div className="detail-row">
              <strong>Transaction Hash:</strong>
              <code>{deployment.transaction.transaction_hash}</code>
            </div>
            <div className="detail-row">
              <strong>Block Number:</strong>
              <code>{deployment.transaction.block_number}</code>
            </div>
            <div className="detail-row">
              <strong>GeoNFT ID:</strong>
              <code>{geoNFT.nft_id}</code>
            </div>
            <div className="detail-row">
              <strong>Network:</strong>
              <span className="status-badge status-blockchain">Aptos Testnet</span>
            </div>
          </div>
        </div>

        <div className="success">
          🎉 Your carbon project is now immutably recorded on the blockchain with location verification!
        </div>

        <button className="btn btn-primary" onClick={() => onComplete({})}>
          Proceed to Tokenization →
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>⛓️ Blockchain Registry</h2>
      <p>Deploy your verified carbon project to the Aptos blockchain for immutable record-keeping.</p>

      <div className="blockchain-info">
        <div className="grid">
          <div className="info-card">
            <h4>🔒 Immutable Records</h4>
            <p>Your project data will be permanently stored on the blockchain, ensuring transparency and preventing tampering.</p>
          </div>
          <div className="info-card">
            <h4>🌍 GeoNFT Creation</h4>
            <p>A location-bound NFT will be minted to verify the geographical authenticity of your project.</p>
          </div>
          <div className="info-card">
            <h4>⚡ Smart Contracts</h4>
            <p>Automated smart contracts will manage your carbon credits, transfers, and retirement.</p>
          </div>
          <div className="info-card">
            <h4>🔍 Full Traceability</h4>
            <p>Every transaction and change will be recorded with complete audit trail.</p>
          </div>
        </div>
      </div>

      {!loading && (
        <div className="deployment-ready">
          <h3>✅ Ready for Blockchain Deployment</h3>
          <ul>
            <li>✓ Project verified and approved</li>
            <li>✓ All compliance checks passed</li>
            <li>✓ Carbon calculations validated</li>
            <li>✓ Location coordinates confirmed</li>
          </ul>
          
          <button className="btn btn-primary" onClick={deployToBlockchain}>
            Deploy to Aptos Blockchain
          </button>
        </div>
      )}

      {loading && (
        <div className="deployment-progress">
          <div className="progress-steps">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="step-icon">1</div>
              <div className="step-text">Deploying Smart Contract</div>
            </div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-icon">2</div>
              <div className="step-text">Minting GeoNFT</div>
            </div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="step-icon">3</div>
              <div className="step-text">Finalizing Registration</div>
            </div>
          </div>

          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>

          <p className="progress-text">
            {currentStep === 1 && '🚀 Deploying smart contract to Aptos blockchain...'}
            {currentStep === 2 && '🎨 Minting location-verified GeoNFT...'}
            {currentStep === 3 && '✅ Finalizing blockchain registration...'}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlockchainRegistry;
