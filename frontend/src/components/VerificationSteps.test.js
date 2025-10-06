import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import VerificationSteps from './VerificationSteps';

jest.mock('axios');

describe('VerificationSteps Component', () => {
  const mockProjectData = {
    projectId: 'proj-123',
    location: 'Test Location'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: [] });
  });

  it('renders verification steps component', () => {
    render(<VerificationSteps projectData={mockProjectData} onComplete={jest.fn()} />);
    expect(screen.getByText(/Multi-Stage Verification Process/i)).toBeInTheDocument();
  });

  it('displays all verification types', () => {
    render(<VerificationSteps projectData={mockProjectData} onComplete={jest.fn()} />);
    
    expect(screen.getByText(/Internal Verification/i)).toBeInTheDocument();
    expect(screen.getByText(/Third-Party Audit/i)).toBeInTheDocument();
    expect(screen.getByText(/Legal Compliance/i)).toBeInTheDocument();
  });

  it('allows submitting verification', async () => {
    const mockOnComplete = jest.fn();
    axios.post.mockResolvedValue({
      data: {
        id: 'ver-123',
        type: 'internal',
        status: 'approved'
      }
    });

    render(<VerificationSteps projectData={mockProjectData} onComplete={mockOnComplete} />);

    const submitButton = screen.getByText(/Submit for Internal Verification/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        '/api/verification/proj-123',
        expect.objectContaining({ type: 'internal' })
      );
    });
  });

  it('handles verification errors', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    axios.post.mockRejectedValue(new Error('Verification failed'));

    render(<VerificationSteps projectData={mockProjectData} onComplete={jest.fn()} />);

    const submitButton = screen.getByText(/Submit for Internal Verification/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
    });

    alertMock.mockRestore();
  });
});
