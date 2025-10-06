import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import CarbonMarketplace from './CarbonMarketplace';

jest.mock('axios');

describe('CarbonMarketplace Component', () => {
  const mockProjectData = {
    projectId: 'proj-123',
    tokenization: {
      carbon_credit: {
        total_credits: 1000
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders marketplace component', () => {
    render(<CarbonMarketplace projectData={mockProjectData} onComplete={jest.fn()} />);
    expect(screen.getByText(/Global Carbon Credit Marketplace/i)).toBeInTheDocument();
  });

  it('fetches and displays live market prices', async () => {
    const mockPrices = {
      btc_price: 45000,
      eth_price: 3000,
      carbon_price: 25.50,
      market_sentiment: 'Bullish'
    };

    axios.get.mockResolvedValue({ data: mockPrices });

    render(<CarbonMarketplace projectData={mockProjectData} onComplete={jest.fn()} />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/marketplace/live-prices');
    });
  });

  it('displays market statistics', async () => {
    const mockStats = {
      total_volume: 1000000,
      total_trades: 500,
      average_price: 25.00
    };

    axios.get.mockImplementation((url) => {
      if (url.includes('/live-prices')) {
        return Promise.resolve({ data: { carbon_price: 25 } });
      }
      if (url.includes('/statistics')) {
        return Promise.resolve({ data: mockStats });
      }
      return Promise.resolve({ data: {} });
    });

    render(<CarbonMarketplace projectData={mockProjectData} onComplete={jest.fn()} />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/api/marketplace/statistics');
    });
  });

  it('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    render(<CarbonMarketplace projectData={mockProjectData} onComplete={jest.fn()} />);

    await waitFor(() => {
      expect(screen.getByText(/Global Carbon Credit Marketplace/i)).toBeInTheDocument();
    });
  });
});
