import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import InitialAssessment from './InitialAssessment';

// Mock axios to prevent actual API calls during tests
jest.mock('axios');

describe('InitialAssessment Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the initial assessment form', () => {
    render(<InitialAssessment onComplete={jest.fn()} />);
    expect(screen.getByText(/Initial Carbon Credit Assessment/i)).toBeInTheDocument();
    expect(screen.getByText(/Create a new blue carbon project/i)).toBeInTheDocument();
  });

  it('displays all form fields', () => {
    render(<InitialAssessment onComplete={jest.fn()} />);
    
    expect(screen.getByText(/Project Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Location/i)).toBeInTheDocument();
    expect(screen.getByText(/Area \(hectares\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByText(/End Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Project Description/i)).toBeInTheDocument();
  });

  it('allows user to fill out the form', () => {
    render(<InitialAssessment onComplete={jest.fn()} />);
    
    const locationInput = screen.getByPlaceholderText(/e.g., Sundarbans/i);
    const areaInput = screen.getByPlaceholderText(/e.g., 1.5/i);
    const descriptionInput = screen.getByPlaceholderText(/Describe your mangrove/i);

    fireEvent.change(locationInput, { target: { value: 'Sundarbans, West Bengal' } });
    fireEvent.change(areaInput, { target: { value: '100' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test project description' } });

    expect(locationInput.value).toBe('Sundarbans, West Bengal');
    expect(areaInput.value).toBe('100');
    expect(descriptionInput.value).toBe('Test project description');
  });

  it('submits form and displays analysis results', async () => {
    const mockOnComplete = jest.fn();
    const mockProjectData = { 
      id: 'proj-123',
      location: 'Test Location'
    };
    const mockAnalysisData = {
      satellite_analysis: {
        vegetation_index: 0.75,
        vegetation_health: 'Excellent'
      },
      carbon_calculation: {
        total_carbon_tons: 1500,
        biodiversity_score: 85
      }
    };

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

    // Fill required fields
    fireEvent.change(screen.getByPlaceholderText(/e.g., Sundarbans/i), {
      target: { value: 'Test Location' }
    });
    fireEvent.change(screen.getByPlaceholderText(/e.g., 1.5/i), {
      target: { value: '100' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Describe your mangrove/i), {
      target: { value: 'Test description' }
    });

    const startDateInput = screen.getByLabelText(/Start Date/i);
    const endDateInput = screen.getByLabelText(/End Date/i);
    fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2024-12-31' } });

    // Submit form
    const submitButton = screen.getByText(/Create Project & Analyze/i);
    fireEvent.click(submitButton);

    // Wait for analysis to complete
    await waitFor(() => {
      expect(screen.getByText(/Satellite Analysis Complete/i)).toBeInTheDocument();
    });

    // Check if analysis results are displayed
    expect(screen.getByText(/Vegetation Index/i)).toBeInTheDocument();
    expect(screen.getByText(/Carbon Credits/i)).toBeInTheDocument();
  });

  it('handles form submission errors gracefully', async () => {
    const mockOnComplete = jest.fn();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    axios.post.mockRejectedValue(new Error('API Error'));

    render(<InitialAssessment onComplete={mockOnComplete} />);

    // Fill and submit form
    fireEvent.change(screen.getByPlaceholderText(/e.g., Sundarbans/i), {
      target: { value: 'Test Location' }
    });
    fireEvent.change(screen.getByPlaceholderText(/e.g., 1.5/i), {
      target: { value: '100' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Describe your mangrove/i), {
      target: { value: 'Test description' }
    });

    const startDateInput = screen.getByLabelText(/Start Date/i);
    const endDateInput = screen.getByLabelText(/End Date/i);
    fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2024-12-31' } });

    const submitButton = screen.getByText(/Create Project & Analyze/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Error creating project. Please try again.');
    });

    alertMock.mockRestore();
  });
});
