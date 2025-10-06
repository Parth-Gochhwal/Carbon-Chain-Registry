import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerificationSteps = ({ projectData, onComplete }) => {
  const [currentVerification, setCurrentVerification] = useState('internal');
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const verificationTypes = [
    {
      type: 'internal',
      title: 'Internal Verification',
      description: 'Initial data quality and authenticity check',
      checklist: [
        'Photo validation & authenticity',
        'GPS coordinates accuracy',
        'AI analysis review',
        'Overall data quality'
      ]
    },
    {
      type: 'third_party',
      title: 'Third-Party Verification',
      description: 'Regulatory compliance and environmental standards',
      checklist: [
        'Document authenticity verification',
        'Environmental compliance standards',
        'Regulatory framework adherence',
        'Complete audit trail validation'
      ]
    },
    {
      type: 'legal',
      title: 'Legal Compliance',
      description: 'Statutory verification and legal compliance',
      checklist: [
        'Forest Conservation Act, 1980 compliance',
        'Environment Impact Assessment, 2006',
        'National Action Plan on Climate Change',
        'IS 14064-2:2019 - GHG quantification'
      ]
    }
  ];

  useEffect(() => {
    if (projectData?.projectId) {
      fetchVerifications();
    }
  }, [projectData]);

  const fetchVerifications = async () => {
    try {
      const response = await axios.get(`/api/verification/project/${projectData.projectId}`);
      setVerifications(response.data);
    } catch (error) {
      console.error('Error fetching verifications:', error);
    }
  };

  const handleVerificationSubmit = async (verificationType) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('verification_type', verificationType);
      formData.append('verifier_name', getVerifierName(verificationType));
      formData.append('notes', `${verificationType} verification completed successfully`);

      const response = await axios.post(`/api/verification/${projectData.projectId}`, formData);
      
      // Auto-approve for demo
      await axios.put(`/api/verification/${response.data.id}/approve`);
      
      await fetchVerifications();
      
      // Move to next verification type
      const currentIndex = verificationTypes.findIndex(v => v.type === verificationType);
      if (currentIndex < verificationTypes.length - 1) {
        setCurrentVerification(verificationTypes[currentIndex + 1].type);
      } else {
        // All verifications complete
        onComplete({ verificationsComplete: true });
      }
    } catch (error) {
      console.error('Error creating verification:', error);
      alert('Error processing verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getVerifierName = (type) => {
    const names = {
      internal: 'CarbonChain Internal Team',
      third_party: 'Green Compliance Authority India',
      legal: 'Environmental Legal Associates'
    };
    return names[type] || 'Unknown Verifier';
  };

  const isVerificationComplete = (type) => {
    return verifications.some(v => v.verification_type === type && v.status === 'approved');
  };

  const allVerificationsComplete = verificationTypes.every(v => isVerificationComplete(v.type));

  if (allVerificationsComplete) {
    return (
      <div className="card">
        <h2>✅ All Verifications Complete!</h2>
        <p>Your project has successfully passed all verification stages and is ready for blockchain deployment.</p>
        
        <div className="grid">
          {verificationTypes.map(verification => (
            <div key={verification.type} className="metric-card">
              <div className="metric-value">✓</div>
              <div className="metric-label">{verification.title}</div>
              <div className="status-badge status-verified">Approved</div>
            </div>
          ))}
        </div>

        <div className="success">
          🎉 Congratulations! Your project meets all regulatory and environmental standards.
        </div>

        <button className="btn btn-primary" onClick={() => onComplete({})}>
          Proceed to Blockchain Registry →
        </button>
      </div>
    );
  }

  const currentVerificationData = verificationTypes.find(v => v.type === currentVerification);

  return (
    <div className="card">
      <h2>🔍 Multi-Stage Verification Process</h2>
      <p>Your project must pass through multiple verification stages to ensure compliance and quality.</p>

      <div className="verification-progress">
        <div className="steps">
          {verificationTypes.map((verification, index) => (
            <div
              key={verification.type}
              className={`step ${
                isVerificationComplete(verification.type) ? 'completed' :
                currentVerification === verification.type ? 'active' : ''
              }`}
            >
              <div className="step-number">
                {isVerificationComplete(verification.type) ? '✓' : index + 1}
              </div>
              <div className="step-name">{verification.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="verification-details">
        <h3>{currentVerificationData.title}</h3>
        <p>{currentVerificationData.description}</p>

        <div className="checklist">
          <h4>Verification Checklist:</h4>
          <ul>
            {currentVerificationData.checklist.map((item, index) => (
              <li key={index}>✓ {item}</li>
            ))}
          </ul>
        </div>

        {currentVerification === 'legal' && (
          <div className="risk-assessment">
            <h4>Risk Assessment:</h4>
            <div className="grid">
              <div className="metric-card">
                <div className="metric-value">Low</div>
                <div className="metric-label">Environmental Impact</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">Medium</div>
                <div className="metric-label">Regulatory Compliance</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">Low</div>
                <div className="metric-label">Data Quality</div>
              </div>
            </div>
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={() => handleVerificationSubmit(currentVerification)}
          disabled={loading}
        >
          {loading ? 'Processing...' : `Complete ${currentVerificationData.title}`}
        </button>
      </div>

      {loading && (
        <div className="loading">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '75%' }}></div>
          </div>
          <p>🔍 Processing verification with {getVerifierName(currentVerification)}...</p>
        </div>
      )}
    </div>
  );
};

export default VerificationSteps;
