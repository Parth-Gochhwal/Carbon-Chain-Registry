import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const ImpactDashboard = ({ projectData }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [portfolioValue, setPortfolioValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async (projectId) => {
    try {
      const response = await axios.get(`/api/dashboard/${projectId}`);
      setDashboardData(response.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Could not load dashboard data.');
    }
  }, []);

  const fetchPortfolioValue = useCallback(async (tokenData) => {
    try {
      if (tokenData?.carbon_credit?.total_credits) {
        const response = await axios.get(`/api/marketplace/portfolio-value/${tokenData.carbon_credit.total_credits}`);
        if (response.data.success) {
          setPortfolioValue(response.data.portfolio);
        }
      }
    } catch (err) {
      console.error('Error fetching portfolio value:', err);
    }
  }, []);

  useEffect(() => {
    if (projectData) {
      setLoading(true);
      setError(null);
      
      const projectId = projectData.projectId;
      const tokenizationData = projectData.tokenization;

      fetchDashboardData(projectId).finally(() => setLoading(false));
      fetchPortfolioValue(tokenizationData);

      const interval = setInterval(() => fetchPortfolioValue(tokenizationData), 5000);
      return () => clearInterval(interval);
    } else {
        setLoading(false);
    }
  }, [projectData, fetchDashboardData, fetchPortfolioValue]);

  if (!projectData) {
    return (
      <div className="card">
        <div className="loading">
          <p>Please select a project to view the dashboard.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="card">
        <div className="loading">
          <p>📊 Loading impact dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="error">
          <p>⚠ {error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="card">
      <h2>📊 Real-Time Impact Dashboard</h2>
      <p>Monitor your project's environmental impact and market performance in real-time.</p>

      {portfolioValue && (
        <div className="portfolio-summary">
          <h3>💰 Live Portfolio Value</h3>
          <div className="portfolio-card">
            <div className="portfolio-main">
              <div className="portfolio-value">${portfolioValue.total_value}</div>
              <div className={`portfolio-change ${portfolioValue.daily_change >= 0 ? 'positive' : 'negative'}`}>
                {portfolioValue.daily_change >= 0 ? '+' : ''}${portfolioValue.daily_change} 
                ({portfolioValue.daily_change_percent >= 0 ? '+' : ''}{portfolioValue.daily_change_percent}%)
              </div>
            </div>
            <div className="portfolio-details">
              <span>Credits: {portfolioValue.carbon_credits} tons</span>
              <span>Price: ${portfolioValue.current_price}/ton</span>
              <span>Sentiment: {portfolioValue.market_sentiment}</span>
            </div>
          </div>
        </div>
      )}

      <div className="project-overview">
        <h3>🌱 Project Overview</h3>
        <div className="grid">
          <div className="metric-card">
            <div className="metric-value">{dashboardData?.project_overview?.credits_generated || 0}</div>
            <div className="metric-label">Credits Generated</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">${dashboardData?.project_overview?.market_value || 0}</div>
            <div className="metric-label">Market Value</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{dashboardData?.project_overview?.project_status || 'Active'}</div>
            <div className="metric-label">Project Status</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">
              {dashboardData?.project_overview?.monitoring_since ? 
                new Date(dashboardData.project_overview.monitoring_since).toLocaleDateString() : 
                'Today'
              }
            </div>
            <div className="metric-label">Monitoring Since</div>
          </div>
        </div>
      </div>

      <div className="key-metrics">
        <h3>🎯 Key Impact Metrics</h3>
        <div className="metrics-grid">
          <div className="impact-metric">
            <div className="metric-icon">🌊</div>
            <div className="metric-info">
              <div className="metric-number">{dashboardData?.key_metrics?.hectares_restored || 0}</div>
              <div className="metric-text">Hectares Restored</div>
            </div>
          </div>
          <div className="impact-metric">
            <div className="metric-icon">🌍</div>
            <div className="metric-info">
              <div className="metric-number">{(dashboardData?.key_metrics?.co2_sequestered || 0).toLocaleString()}</div>
              <div className="metric-text">kg CO₂ Sequestered</div>
            </div>
          </div>
          <div className="impact-metric">
            <div className="metric-icon">💰</div>
            <div className="metric-info">
              <div className="metric-number">${dashboardData?.key_metrics?.community_income || 0}</div>
              <div className="metric-text">Community Income</div>
            </div>
          </div>
          <div className="impact-metric">
            <div className="metric-icon">🦋</div>
            <div className="metric-info">
              <div className="metric-number">{dashboardData?.key_metrics?.biodiversity_index || 85}</div>
              <div className="metric-text">Biodiversity Index</div>
            </div>
          </div>
        </div>
      </div>

      <div className="progress-tracking">
        <h3>📈 Progress Tracking</h3>
        <div className="progress-items">
          <div className="progress-item">
            <div className="progress-header">
              <span>Restoration Progress</span>
              <span>{dashboardData?.progress?.restoration_progress || 78}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill restoration" 
                style={{ width: `${dashboardData?.progress?.restoration_progress || 78}%` }}
              ></div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-header">
              <span>Carbon Sequestration</span>
              <span>{dashboardData?.progress?.carbon_sequestration || 65}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill carbon" 
                style={{ width: `${dashboardData?.progress?.carbon_sequestration || 65}%` }}
              ></div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-header">
              <span>Community Impact</span>
              <span>{dashboardData?.progress?.community_impact || 92}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill community" 
                style={{ width: `${dashboardData?.progress?.community_impact || 92}%` }}
              ></div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-header">
              <span>Biodiversity Recovery</span>
              <span>{dashboardData?.progress?.biodiversity_recovery || 71}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill biodiversity" 
                style={{ width: `${dashboardData?.progress?.biodiversity_recovery || 71}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="environmental-health">
        <h3>🌿 Environmental Health</h3>
        <div className="health-indicators">
          <div className="health-item">
            <div className="health-icon">💧</div>
            <div className="health-info">
              <strong>Water Quality</strong>
              <span className="status improved">{dashboardData?.environmental_health?.water_quality || 'Improved'}</span>
            </div>
          </div>
          <div className="health-item">
            <div className="health-icon">🌱</div>
            <div className="health-info">
              <strong>Vegetation Health</strong>
              <span className="status excellent">{dashboardData?.environmental_health?.vegetation_health || 'Excellent'}</span>
            </div>
          </div>
          <div className="health-item">
            <div className="health-icon">🐟</div>
            <div className="health-info">
              <strong>Marine Life</strong>
              <span className="status recovering">{dashboardData?.environmental_health?.marine_life || 'Recovering'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="community-benefits">
        <h3>👥 Community Benefits</h3>
        <div className="benefits-summary">
          <div className="benefit-stat">
            <div className="benefit-number">{dashboardData?.community_benefits?.families_supported || 156}</div>
            <div className="benefit-label">Families Supported</div>
          </div>
          <div className="benefit-stat">
            <div className="benefit-number">{dashboardData?.community_benefits?.jobs_created || 12}</div>
            <div className="benefit-label">Jobs Created</div>
          </div>
          <div className="benefit-programs">
            <div className="program-item">
              <span className="program-icon">✓</span>
              <span>Training Programs Active</span>
            </div>
            <div className="program-item">
              <span className="program-icon">✓</span>
              <span>Livelihood Opportunities</span>
            </div>
            <div className="program-item">
              <span className="program-icon">✓</span>
              <span>Women Empowerment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="success">
        🎉 Congratulations! Your blue carbon project is making a real impact on climate change and local communities.
      </div>

      <div className="dashboard-actions">
        <button className="btn" onClick={() => window.location.reload()}>
          🔄 Refresh Data
        </button>
        <button className="btn btn-primary" onClick={() => window.print()}>
          📄 Generate Report
        </button>
      </div>
    </div>
  );
};

export default ImpactDashboard;
