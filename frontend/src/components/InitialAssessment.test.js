import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import InitialAssessment from './InitialAssessment';

// Mock axios to prevent actual API calls during tests
jest.mock('axios');

describe('InitialAssessment Component', () => {
  it('should allow user to fill out and submit the form', async () => {
    const mockOnComplete = jest.fn();
    const mockProjectData = { id: 'proj-123', name: 'Test Project' };
    const mockAnalysisData = { carbon_potential: 1500, suitability: 'High' };

    // Mock the POST requests
    axios.post.mockImplementation((url) => {
      if (url.includes('/api/projects')) {
        return Promise.resolve({ data: mockProjectData });
      }
      if (url.includes('/api/analysis/satellite')) {
        return Promise.resolve({ data: mockAnalysisData });
      }
      return Promise.resolve({ data: {} });
    });

    render(<InitialAssessment onComplete={mockOnComplete} />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/Project Location/i), {
      target: { value: 'Test Location, Indonesia' },
    });
    fireEvent.change(screen.getByLabelText(/Area \(hectares\)/i), {
      target: { value: '500' },
    });
    fireEvent.change(screen.getByLabelText(/Project Description/i), {
      target: { value: 'A test mangrove restoration project.' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /Submit for Analysis/i }));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      // Check if the onComplete callback was called with the correct data
      expect(mockOnComplete).toHaveBeenCalledWith({
        ...mockProjectData,
        analysis: mockAnalysisData,
      });
    });

    // Check if the success message is displayed
    expect(screen.getByText(/Analysis Complete!/i)).toBeInTheDocument();
  });
});
