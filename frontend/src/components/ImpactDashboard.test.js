import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ImpactDashboard from './ImpactDashboard';

jest.mock('axios');

describe('ImpactDashboard Component', () => {
  const mockProjectData = {
    projectId: 'proj-123',
    tokenization: {
      carbon_credit: {
        total_credits: 1000
      }
    }
  };

  const mockDashboardData = {
    project_overview: {
      credits_generated: 1000,
      market_value: 25000,
      project_status: 'Active',
      monitoring_since: '2024-01-01'
    },
    key_metrics: {
      hectares_restored: 100,
      co2_sequestered: 50000,
      community_income: 15000,
      biodiversity_index: 85
    },
    progress: {
      restoration_progress: 78,
      carbon_sequestration: 65,
      community_impact: 92,
      biodiversity_recovery: 71
    },
    environmental_health: {
      water_quality: 'Improved',
      vegetation_health: 'Excellent',
      marine_life: 'Recovering'
    },
    community_benefits: {
      families_supported: 156,
      jobs_created: 12
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    axios.get.mockImplementation(() => new Promise(() => {}));
    render(<ImpactDashboard projectData={mockProjectData} />);
    expect(screen.getByText(/Loading impact dashboard/i)).toBeInTheDocument();
  });

  it('renders dashboard with project data', async () => {
    axios.get.mockResolvedValue({ data: mockDashboardData });

    render(<ImpactDashboard projectData={mockProjectData} />);

    await waitFor(() => {
      expect(screen.getByText(/Real-Time Impact Dashboard/i)).toBeInTheDocument();
    });
  });

  it('displays key metrics correctly', async () => {
    axios.get.mockResolvedValue({ data: mockDashboardData });

    render(<ImpactDashboard projectData={mockProjectData} />);

    await waitFor(() => {
      expect(screen.getByText(/Hectares Restored/i)).toBeInTheDocument();
      expect(screen.getByText(/CO₂ Sequestered/i)).toBeInTheDocument();
      expect(screen.getByText(/Community Income/i)).toBeInTheDocument();
      expect(screen.getByText(/Biodiversity Index/i)).toBeInTheDocument();
    });
  });

  it('shows message when no project data provided', () => {
    render(<ImpactDashboard projectData={null} />);
    expect(screen.getByText(/Please select a project/i)).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    render(<ImpactDashboard projectData={mockProjectData} />);

    await waitFor(() => {
      expect(screen.getByText(/Could not load dashboard data/i)).toBeInTheDocument();
    });
  });

  it('fetches portfolio value periodically', async () => {
    jest.useFakeTimers();
    
    const mockPortfolio = {
      success: true,
      portfolio: {
        total_value: 25000,
        carbon_credits: 1000,
        current_price: 25,
        daily_change: 500,
        daily_change_percent: 2.0,
        market_sentiment: 'Bullish'
      }
    };

    axios.get.mockImplementation((url) => {
      if (url.includes('/dashboard/')) {
        return Promise.resolve({ data: mockDashboardData });
      }
      if (url.includes('/portfolio-value/')) {
        return Promise.resolve({ data: mockPortfolio });
      }
      return Promise.resolve({ data: {} });
    });

    render(<ImpactDashboard projectData={mockProjectData} />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/dashboard/proj-123');
    });

    // Fast-forward time by 5 seconds
    jest.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/marketplace/portfolio-value/1000');
    });

    jest.useRealTimers();
  });
});
